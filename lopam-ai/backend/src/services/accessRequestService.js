import { PrismaClient } from '@prisma/client'
import { NotFoundError, AuthorizationError, ValidationError } from '../utils/errors.js'

const prisma = new PrismaClient()

export class AccessRequestService {
  async createAccessRequest(userId, databaseId, accessLevel, reason, temporaryAccess, startDate, endDate) {
    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundError('User')

    // Verify database exists
    const database = await prisma.database.findUnique({ where: { id: databaseId } })
    if (!database) throw new NotFoundError('Database')

    // Validate dates for temporary access
    if (temporaryAccess && (!startDate || !endDate)) {
      throw new ValidationError('Start and end dates required for temporary access')
    }

    if (temporaryAccess && new Date(startDate) >= new Date(endDate)) {
      throw new ValidationError('End date must be after start date')
    }

    // Calculate expiry
    let expiresAt = null
    if (temporaryAccess) {
      expiresAt = new Date(endDate)
    }

    const request = await prisma.accessRequest.create({
      data: {
        userId,
        databaseId,
        accessLevel,
        reason,
        temporaryAccess,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        expiresAt,
        status: 'PENDING',
      },
      include: { user: true, database: true },
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'ACCESS_APPROVED', // Event type for request creation
      `Access request created for ${database.name}`,
      databaseId
    )

    // Create notification for security admin
    await this.notifySecurityAdmin(request)

    return this.formatAccessRequest(request)
  }

  async getAccessRequest(requestId) {
    const request = await prisma.accessRequest.findUnique({
      where: { id: requestId },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        database: true,
        approvals: {
          include: { approver: { select: { id: true, email: true, firstName: true, lastName: true } } },
        },
      },
    })

    if (!request) throw new NotFoundError('Access request')

    return this.formatAccessRequest(request)
  }

  async listAccessRequests(filters = {}) {
    const where = {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.databaseId && { databaseId: filters.databaseId }),
      ...(filters.status && { status: filters.status }),
    }

    const requests = await prisma.accessRequest.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        database: true,
        approvals: { select: { action: true, approvedAt: true } },
      },
      skip: filters.skip || 0,
      take: filters.take || 10,
      orderBy: filters.orderBy || { createdAt: 'desc' },
    })

    const total = await prisma.accessRequest.count({ where })

    return {
      requests: requests.map(r => this.formatAccessRequest(r)),
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
    }
  }

  async approveAccessRequest(requestId, approverId, comments) {
    const request = await prisma.accessRequest.findUnique({
      where: { id: requestId },
    })

    if (!request) throw new NotFoundError('Access request')
    if (request.status !== 'PENDING') {
      throw new ValidationError('Only pending requests can be approved')
    }

    // Create approval record
    await prisma.approval.create({
      data: {
        requestId,
        approverId,
        action: 'approved',
        comments,
        approvedAt: new Date(),
      },
    })

    // Update request status
    const updated = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
      include: { user: true, database: true },
    })

    // Log audit event
    await this.createAuditLog(
      approverId,
      'PERMISSION_GRANTED',
      `Access approved for ${updated.user.email} to ${updated.database.name}`,
      updated.databaseId
    )

    // Notify user
    await this.notifyUser(
      updated.userId,
      'ACCESS_APPROVED',
      `Your access request for ${updated.database.name} has been approved`
    )

    return this.formatAccessRequest(updated)
  }

  async rejectAccessRequest(requestId, approverId, comments) {
    const request = await prisma.accessRequest.findUnique({
      where: { id: requestId },
      include: { user: true, database: true },
    })

    if (!request) throw new NotFoundError('Access request')
    if (request.status !== 'PENDING') {
      throw new ValidationError('Only pending requests can be rejected')
    }

    // Create approval record
    await prisma.approval.create({
      data: {
        requestId,
        approverId,
        action: 'rejected',
        comments,
      },
    })

    // Update request status
    const updated = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
      },
    })

    // Log audit event
    await this.createAuditLog(
      approverId,
      'PERMISSION_REVOKED',
      `Access rejected for ${request.user.email} to ${request.database.name}`,
      request.databaseId
    )

    // Notify user
    await this.notifyUser(
      request.userId,
      'ACCESS_REJECTED',
      `Your access request for ${request.database.name} has been rejected`
    )

    return this.formatAccessRequest(updated)
  }

  async revokeAccessRequest(requestId, userId) {
    const request = await prisma.accessRequest.findUnique({
      where: { id: requestId },
      include: { user: true, database: true },
    })

    if (!request) throw new NotFoundError('Access request')

    const updated = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status: 'REVOKED',
      },
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'ACCESS_REVOKED',
      `Access revoked for ${request.user.email} to ${request.database.name}`,
      request.databaseId
    )

    return this.formatAccessRequest(updated)
  }

  async createAuditLog(userId, eventType, action, databaseId) {
    try {
      await prisma.auditLog.create({
        data: { userId, eventType, action, databaseId },
      })
    } catch (error) {
      console.error('Failed to create audit log:', error)
    }
  }

  async notifySecurityAdmin(request) {
    try {
      const securityAdmins = await prisma.user.findMany({
        where: {
          userRoles: {
            some: { role: { name: 'SECURITY_ADMIN' } },
          },
        },
      })

      for (const admin of securityAdmins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            type: 'NEW_REQUEST',
            title: 'New Access Request',
            message: `${request.user.email} has requested access to ${request.database.name}`,
            channel: 'BOTH',
            relatedEntityId: request.id,
          },
        })
      }
    } catch (error) {
      console.error('Failed to notify security admin:', error)
    }
  }

  async notifyUser(userId, type, message) {
    try {
      await prisma.notification.create({
        data: {
          userId,
          type,
          title: type === 'ACCESS_APPROVED' ? 'Access Approved' : 'Access Rejected',
          message,
          channel: 'BOTH',
        },
      })
    } catch (error) {
      console.error('Failed to create notification:', error)
    }
  }

  formatAccessRequest(request) {
    return {
      ...request,
      startDate: request.startDate?.toISOString() || null,
      endDate: request.endDate?.toISOString() || null,
      requestedAt: request.requestedAt.toISOString(),
      approvedAt: request.approvedAt?.toISOString() || null,
      rejectedAt: request.rejectedAt?.toISOString() || null,
      expiresAt: request.expiresAt?.toISOString() || null,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    }
  }
}

export default new AccessRequestService()
