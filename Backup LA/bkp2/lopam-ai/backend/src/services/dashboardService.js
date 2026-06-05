import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class DashboardService {
  async getDashboardStats() {
    // Get counts
    const totalDatabases = await prisma.database.count({
      where: { deletedAt: null },
    })

    const activeUsers = await prisma.user.count({
      where: { status: 'active' },
    })

    const pendingRequests = await prisma.accessRequest.count({
      where: { status: 'PENDING' },
    })

    const approvedRequests = await prisma.accessRequest.count({
      where: { status: 'APPROVED' },
    })

    const rejectedRequests = await prisma.accessRequest.count({
      where: { status: 'REJECTED' },
    })

    const privilegedAccounts = await prisma.user.count({
      where: {
        roles: {
          some: {
            role: {
              name: { in: ['SUPER_ADMIN', 'SECURITY_ADMIN', 'DBA'] },
            },
          },
        },
      },
    })

    const securityAlerts = await prisma.securityEvent.count({
      where: { status: 'ACTIVE' },
    })

    const failedLogins = await prisma.auditLog.count({
      where: {
        eventType: 'LOGIN',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    return {
      totalDatabases,
      activeUsers,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      privilegedAccounts,
      securityAlerts,
      failedLogins,
    }
  }

  async getRecentActivities(limit = 10) {
    const activities = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    })

    return activities.map(activity => ({
      id: activity.id,
      user: activity.user,
      eventType: activity.eventType,
      action: activity.action,
      timestamp: activity.createdAt,
    }))
  }

  async getRecentSecurityAlerts(limit = 10) {
    const alerts = await prisma.securityEvent.findMany({
      orderBy: { detectedAt: 'desc' },
      take: limit,
      include: {
        user: { select: { id: true, email: true } },
        database: { select: { id: true, name: true } },
      },
    })

    return alerts.map(alert => ({
      id: alert.id,
      eventType: alert.eventType,
      description: alert.description,
      severity: alert.severity,
      status: alert.status,
      riskScore: alert.riskScore,
      timestamp: alert.detectedAt,
      user: alert.user,
      database: alert.database,
    }))
  }

  async getAccessRequestStats() {
    const byStatus = await prisma.accessRequest.groupBy({
      by: ['status'],
      _count: true,
    })

    const byAccessLevel = await prisma.accessRequest.groupBy({
      by: ['accessLevel'],
      _count: true,
    })

    return {
      byStatus: Object.fromEntries(
        byStatus.map(item => [item.status, item._count])
      ),
      byAccessLevel: Object.fromEntries(
        byAccessLevel.map(item => [item.accessLevel, item._count])
      ),
    }
  }

  async getComplianceStatus() {
    const totalPolicies = await prisma.compliancePolicy.count()
    const activePolicies = await prisma.compliancePolicy.count({
      where: { isActive: true },
    })

    const compliantDatabases = await prisma.database.count({
      where: {
        deletedAt: null,
        encryptedConnection: true,
      },
    })

    const totalDatabases = await prisma.database.count({
      where: { deletedAt: null },
    })

    return {
      totalPolicies,
      activePolicies,
      compliancePercentage:
        totalDatabases > 0
          ? Math.round((compliantDatabases / totalDatabases) * 100)
          : 0,
      complianceScore: Math.min(
        100,
        Math.round(((activePolicies / Math.max(totalPolicies, 1)) * 100 * 0.5 +
          ((compliantDatabases / Math.max(totalDatabases, 1)) * 100 * 0.5)))
      ),
    }
  }

  async getUserStats() {
    const totalUsers = await prisma.user.count()
    const activeUsers = await prisma.user.count({
      where: { status: 'active' },
    })
    const suspendedUsers = await prisma.user.count({
      where: { status: 'suspended' },
    })

    const mfaEnabled = await prisma.user.count({
      where: { mfaEnabled: true },
    })

    return {
      total: totalUsers,
      active: activeUsers,
      suspended: suspendedUsers,
      mfaEnabled,
      mfaEnablementRate:
        totalUsers > 0 ? Math.round((mfaEnabled / totalUsers) * 100) : 0,
    }
  }

  async getDatabaseStats() {
    const byType = await prisma.database.groupBy({
      by: ['type'],
      _count: true,
      where: { deletedAt: null },
    })

    const byEnvironment = await prisma.database.groupBy({
      by: ['environment'],
      _count: true,
      where: { deletedAt: null },
    })

    const active = await prisma.database.count({
      where: { deletedAt: null, isActive: true },
    })

    const inactive = await prisma.database.count({
      where: { deletedAt: null, isActive: false },
    })

    return {
      byType: Object.fromEntries(byType.map(item => [item.type, item._count])),
      byEnvironment: Object.fromEntries(
        byEnvironment.map(item => [item.environment, item._count])
      ),
      active,
      inactive,
    }
  }

  async getMonthlyStats() {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    const loginStats = await prisma.auditLog.groupBy({
      by: ['createdAt'],
      where: {
        eventType: 'LOGIN',
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: { createdAt: 'asc' },
    })

    const accessRequestStats = await prisma.accessRequest.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: { createdAt: 'asc' },
    })

    return {
      logins: loginStats.map(stat => ({
        date: stat.createdAt,
        count: stat._count,
      })),
      accessRequests: accessRequestStats.map(stat => ({
        date: stat.createdAt,
        count: stat._count,
      })),
    }
  }
}

export default new DashboardService()
