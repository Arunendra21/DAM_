import { PrismaClient } from '@prisma/client'
import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
} from '../utils/password.js'
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js'
import {
  AuthenticationError,
  ConflictError,
  ValidationError,
} from '../utils/errors.js'
import { config } from '../config/env.js'

const prisma = new PrismaClient()

export class AuthService {
  async register(email, username, password, firstName, lastName, phone) {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      throw new ConflictError('Email or username already exists')
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      throw new ValidationError(passwordValidation.errors.join(', '))
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user with default role
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        firstName,
        lastName,
        phone,
        status: 'active',
      },
      include: { userRoles: { include: { role: true } } },
    })

    // Assign USER role by default
    const userRole = await prisma.role.findUnique({
      where: { name: 'USER' },
    }).catch(() => null)

    if (userRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id,
        },
      })
    }

    // Log audit event
    await this.createAuditLog(user.id, 'USER_CREATED', 'User registered', null)

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }

  async login(emailOrUsername, password) {
    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
      include: { userRoles: { include: { role: true } } },
    })

    if (!user) {
      throw new AuthenticationError('Invalid email/username or password')
    }

    // Check if account is suspended
    if (user.status === 'suspended') {
      throw new AuthenticationError('Account is suspended')
    }

    // Check if account is locked
    if (user.lockUntil && new Date() < user.lockUntil) {
      const minutesLeft = Math.ceil(
        (user.lockUntil - new Date()) / 1000 / 60
      )
      throw new AuthenticationError(
        `Account is locked. Try again in ${minutesLeft} minutes`
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash)

    if (!isPasswordValid) {
      // Increment login attempts
      const newLoginAttempts = user.loginAttempts + 1
      let lockUntil = null

      if (newLoginAttempts >= config.maxLoginAttempts) {
        // Lock account for 15 minutes
        lockUntil = new Date(Date.now() + 15 * 60 * 1000)
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: newLoginAttempts,
          lockUntil,
        },
      })

      throw new AuthenticationError('Invalid email/username or password')
    }

    // Reset login attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockUntil: null,
        lastLogin: new Date(),
      },
    })

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id)

    // Save refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    })

    // Log audit event
    await this.createAuditLog(user.id, 'LOGIN', 'User logged in', null)

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.userRoles.map(ur => ur.role.name),
      },
    }
  }

  async refreshAccessToken(refreshToken) {
    // Cryptographically verify the refresh token signature/expiry first, so a
    // tampered or foreign-signed token is rejected before any DB work.
    verifyRefreshToken(refreshToken)

    // Find session (the `User.roles` relation does not exist — the relation is
    // `userRoles` — and it was unused here, so no include is needed).
    const session = await prisma.session.findUnique({
      where: { refreshToken },
    })

    if (!session) {
      throw new AuthenticationError('Invalid refresh token')
    }

    if (new Date() > session.expiresAt) {
      // Clean up the expired session so it cannot be reused.
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
      throw new AuthenticationError('Refresh token expired')
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      session.userId
    )

    // Update session with new refresh token
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: newExpiresAt,
      },
    })

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }

  async logout(userId, refreshToken) {
    // Delete session
    await prisma.session.deleteMany({
      where: {
        userId,
        refreshToken,
      },
    })

    // Log audit event
    await this.createAuditLog(userId, 'LOGOUT', 'User logged out', null)
  }

  async changePassword(userId, currentPassword, newPassword) {
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AuthenticationError('User not found')
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.passwordHash
    )

    if (!isPasswordValid) {
      throw new AuthenticationError('Current password is incorrect')
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword)
    if (!passwordValidation.isValid) {
      throw new ValidationError(passwordValidation.errors.join(', '))
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    })

    // Log audit event
    await this.createAuditLog(
      userId,
      'PASSWORD_CHANGED',
      'User changed password',
      null
    )
  }

  async createAuditLog(userId, eventType, action, databaseId) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          eventType,
          action,
          databaseId,
          ipAddress: null, // Will be set by middleware
        },
      })
    } catch (error) {
      // Silently fail audit logging
      console.error('Failed to create audit log:', error)
    }
  }
}

export default new AuthService()
