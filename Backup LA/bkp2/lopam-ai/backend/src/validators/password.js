import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const validatePasswordInput = (schema) => (req, res, next) => {
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
