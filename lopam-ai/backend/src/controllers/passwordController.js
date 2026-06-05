import { PrismaClient } from '@prisma/client'
import otpService from '../services/otpService.js'
import { hashPassword } from '../utils/password.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { NotFoundError, ValidationError } from '../utils/errors.js'

const prisma = new PrismaClient()

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.validated

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Don't reveal if email exists (security best practice)
    return res.json({
      message: 'If an account exists with that email, an OTP has been sent',
    })
  }

  // Generate and save OTP
  const { otp } = await otpService.createOtp(email, 'password_reset')

  // TODO: Send OTP via email
  console.log(`[DEV] OTP for ${email}: ${otp}`)

  res.json({
    message: 'OTP sent to your email',
    // In production, don't return OTP. This is for development only.
    ...(process.env.NODE_ENV === 'development' && { otp }),
  })
})

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.validated

  try {
    await otpService.verifyOtp(email, otp)

    // Generate password reset token
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundError('User')
    }

    const { token } = await otpService.createPasswordResetToken(user.id)

    res.json({
      message: 'OTP verified successfully',
      resetToken: token,
    })
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      await otpService.recordOtpAttempt(req.validated.otp)
      return res.status(error.statusCode || 400).json({ error: error.message })
    }
    throw error
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.validated

  // Verify the reset token
  const resetRecord = await otpService.verifyPasswordResetToken(token)

  // Hash the new password
  const passwordHash = await hashPassword(password)

  // Update user password
  await prisma.user.update({
    where: { id: resetRecord.userId },
    data: { passwordHash },
  })

  // Mark token as used
  await otpService.markResetTokenAsUsed(token)

  // Log audit event
  await prisma.auditLog.create({
    data: {
      userId: resetRecord.userId,
      eventType: 'PASSWORD_CHANGED',
      action: 'Password reset via forgot password flow',
      description: 'User successfully reset their password',
    },
  })

  res.json({
    message: 'Password reset successfully. Please login with your new password.',
  })
})

export const validateResetToken = asyncHandler(async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ error: 'Reset token is required' })
  }

  try {
    await otpService.verifyPasswordResetToken(token)
    res.json({ valid: true, message: 'Reset token is valid' })
  } catch (error) {
    res.status(400).json({ valid: false, error: error.message })
  }
})
