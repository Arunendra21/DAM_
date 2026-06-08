import { PrismaClient } from '@prisma/client'
import { NotFoundError, AuthorizationError } from '../utils/errors.js'
import { hashPassword } from '../utils/password.js'

const prisma = new PrismaClient()

export class DatabaseService {
  async createDatabase(userId, data) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundError('User')
    }

    const database = await prisma.database.create({
      data: {
        ...data,
        createdById: userId,
        passwordHash: data.password ? await hashPassword(data.password) : null,
      },
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'DATABASE_ADDED',
      `Database "${database.name}" created`,
      database.id
    )

    return this.formatDatabase(database)
  }

  async updateDatabase(userId, databaseId, data) {
    const database = await prisma.database.findUnique({
      where: { id: databaseId },
    })

    if (!database) {
      throw new NotFoundError('Database')
    }

    // Check authorization
    if (database.createdById !== userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { userRoles: { include: { role: true } } },
      })

      const roles = user.userRoles.map(ur => ur.role.name)
      if (!roles.some(r => ['SUPER_ADMIN', 'DBA'].includes(r))) {
        throw new AuthorizationError()
      }
    }

    const updateData = { ...data }
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password)
      delete updateData.password
    }

    const updated = await prisma.database.update({
      where: { id: databaseId },
      data: updateData,
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'DATABASE_MODIFIED',
      `Database "${updated.name}" modified`,
      databaseId
    )

    return this.formatDatabase(updated)
  }

  async deleteDatabase(userId, databaseId) {
    const database = await prisma.database.findUnique({
      where: { id: databaseId },
    })

    if (!database) {
      throw new NotFoundError('Database')
    }

    // Check authorization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userRoles: { include: { role: true } } },
    })

    const roles = user.userRoles.map(ur => ur.role.name)
    if (!roles.some(r => ['SUPER_ADMIN', 'DBA'].includes(r)) && database.createdById !== userId) {
      throw new AuthorizationError()
    }

    const deleted = await prisma.database.update({
      where: { id: databaseId },
      data: { deletedAt: new Date() },
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'DATABASE_DELETED',
      `Database "${deleted.name}" deleted`,
      databaseId
    )

    return this.formatDatabase(deleted)
  }

  async getDatabase(databaseId) {
    const database = await prisma.database.findUnique({
      where: { id: databaseId, deletedAt: null },
      include: {
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
        accessRequests: { select: { id: true, status: true } },
      },
    })

    if (!database) {
      throw new NotFoundError('Database')
    }

    return this.formatDatabase(database)
  }

  async listDatabases(filters = {}) {
    const where = {
      deletedAt: null,
      ...(filters.type && { type: filters.type }),
      ...(filters.environment && { environment: filters.environment }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    }

    const databases = await prisma.database.findMany({
      where,
      include: {
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
      skip: filters.skip || 0,
      take: filters.take || 10,
      orderBy: filters.orderBy || { createdAt: 'desc' },
    })

    const total = await prisma.database.count({ where })

    return {
      databases: databases.map(db => this.formatDatabase(db)),
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
    }
  }

  async searchDatabases(searchTerm) {
    const databases = await prisma.database.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { host: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
    })

    return databases.map(db => this.formatDatabase(db))
  }

  async createAuditLog(userId, eventType, action, databaseId) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          eventType,
          action,
          databaseId,
        },
      })
    } catch (error) {
      console.error('Failed to create audit log:', error)
    }
  }

  formatDatabase(database) {
    const { passwordHash, ...rest } = database
    return rest
  }
}

export default new DatabaseService()
