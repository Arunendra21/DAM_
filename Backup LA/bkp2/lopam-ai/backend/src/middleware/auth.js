import { verifyAccessToken } from '../utils/jwt.js'
import { AuthenticationError, AuthorizationError } from '../utils/errors.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new AuthenticationError('No token provided')
    }

    const decoded = verifyAccessToken(token)
    req.user = { userId: decoded.userId }

    // Load user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { userRoles: { include: { role: true } } },
    })

    if (!user) {
      throw new AuthenticationError('User not found')
    }

    if (user.status === 'suspended') {
      throw new AuthenticationError('Account is suspended')
    }

    req.user = user

    next()
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    next(error)
  }
}

export const authorize = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new AuthenticationError('Not authenticated')
      }

      if (requiredRoles.length === 0) {
        return next()
      }

      const userRoles = req.user.userRoles.map(ur => ur.role.name)

      const hasRole = requiredRoles.some(role => userRoles.includes(role))

      if (!hasRole) {
        throw new AuthorizationError(
          `Required roles: ${requiredRoles.join(', ')}`
        )
      }

      next()
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return res.status(error.statusCode).json({ error: error.message })
      }
      next(error)
    }
  }
}

export const requireRole = (role) => {
  return authorize([role])
}

export const requireAnyRole = (roles) => {
  return authorize(roles)
}
