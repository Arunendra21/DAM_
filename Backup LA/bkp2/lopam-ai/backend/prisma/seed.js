import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/utils/password.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create roles
  const roles = [
    { name: 'SUPER_ADMIN', description: 'Full system access' },
    { name: 'SECURITY_ADMIN', description: 'Security and access management' },
    { name: 'DBA', description: 'Database administration' },
    { name: 'AUDITOR', description: 'Audit and compliance' },
    { name: 'USER', description: 'Regular user' },
  ]

  for (const roleData of roles) {
    try {
      await prisma.role.create({
        data: roleData,
      })
      console.log(`✓ Role created: ${roleData.name}`)
    } catch (e) {
      if (e.code !== 'P2002') {
        throw e
      }
      console.log(`✓ Role already exists: ${roleData.name}`)
    }
  }

  // Create default permissions
  const permissions = [
    // Database permissions
    { name: 'database_create', resource: 'database', action: 'create' },
    { name: 'database_read', resource: 'database', action: 'read' },
    { name: 'database_update', resource: 'database', action: 'update' },
    { name: 'database_delete', resource: 'database', action: 'delete' },

    // User permissions
    { name: 'user_create', resource: 'user', action: 'create' },
    { name: 'user_read', resource: 'user', action: 'read' },
    { name: 'user_update', resource: 'user', action: 'update' },
    { name: 'user_delete', resource: 'user', action: 'delete' },

    // Access request permissions
    { name: 'access_request_create', resource: 'access_request', action: 'create' },
    { name: 'access_request_approve', resource: 'access_request', action: 'approve' },
    { name: 'access_request_reject', resource: 'access_request', action: 'reject' },
    { name: 'access_request_revoke', resource: 'access_request', action: 'revoke' },

    // Audit log permissions
    { name: 'audit_log_read', resource: 'audit_log', action: 'read' },

    // Report permissions
    { name: 'report_create', resource: 'report', action: 'create' },
    { name: 'report_read', resource: 'report', action: 'read' },
    { name: 'report_export', resource: 'report', action: 'export' },
  ]

  for (const perm of permissions) {
    try {
      await prisma.permission.create({
        data: perm,
      })
      console.log(`✓ Permission created: ${perm.name}`)
    } catch (e) {
      if (e.code !== 'P2002') {
        throw e
      }
      console.log(`✓ Permission already exists: ${perm.name}`)
    }
  }

  // Create default super admin user
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@lopam.ai' },
  })

  if (!adminExists) {
    const passwordHash = await hashPassword('Admin@123456')

    const admin = await prisma.user.create({
      data: {
        email: 'admin@lopam.ai',
        username: 'admin',
        passwordHash,
        firstName: 'System',
        lastName: 'Administrator',
        status: 'active',
      },
    })

    // Assign SUPER_ADMIN role
    const superAdminRole = await prisma.role.findUnique({
      where: { name: 'SUPER_ADMIN' },
    })

    await prisma.userRole.create({
      data: {
        userId: admin.id,
        roleId: superAdminRole.id,
      },
    })

    console.log(`✓ Default admin created: admin@lopam.ai (password: Admin@123456)`)
  }

  console.log('✓ Seeding completed!')
}

main()
  .catch(e => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
