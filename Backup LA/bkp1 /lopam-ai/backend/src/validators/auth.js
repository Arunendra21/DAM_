import { z } from 'zod'

export const loginSchema = z.object({
  emailOrUsername: z.union([
    z.string().email('Invalid email address'),
    z.string().min(3, 'Invalid username'),
  ]),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

export const validateInput = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body)
    req.validated = validated
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }
    next(error)
  }
}
