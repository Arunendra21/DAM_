import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { ValidationError, NotFoundError } from '../utils/errors.js'

const prisma = new PrismaClient()

export class OtpService {
  generateOtp(length = 6) {
    return crypto.randomInt(0, Math.pow(10, length))
      .toString()
      .padStart(length, '0')
  }

  generateResetToken() {
    return crypto.randomBytes(32).toString('hex')
  }

  async createOtp(email, type = 'password_reset') {
    // Delete any existing OTPs for this email
    await prisma.otpVerification.deleteMany({
      where: { email },
    })

    const otp = this.generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    const otpRecord = await prisma.otpVerification.create({
      data: {
        email,
        otp,
        type,
        expiresAt,
      },
    })

    return { otp, expiresAt }
  }

  async verifyOtp(email, otp) {
    const otpRecord = await prisma.otpVerification.findUnique({
      where: { otp },
    })

    if (!otpRecord) {
      throw new ValidationError('Invalid OTP')
    }

    if (otpRecord.email !== email) {
      throw new ValidationError('OTP does not match email')
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new ValidationError('OTP has expired')
    }

    if (otpRecord.attempts >= 3) {
      throw new ValidationError('Too many OTP attempts. Please request a new OTP')
    }

    // Mark as verified
    await prisma.otpVerification.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    })

    return true
  }

  async invalidateOtp(email) {
    await prisma.otpVerification.deleteMany({
      where: { email, verified: false },
    })
  }

  async createPasswordResetToken(userId) {
    // Delete any existing reset tokens
    await prisma.passwordReset.deleteMany({
      where: { userId, isUsed: false },
    })

    const token = this.generateResetToken()
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    const resetRecord = await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    })

    return { token, expiresAt }
  }

  async verifyPasswordResetToken(token) {
    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!resetRecord) {
      throw new NotFoundError('Reset token')
    }

    if (resetRecord.isUsed) {
      throw new ValidationError('This reset link has already been used')
    }

    if (new Date() > resetRecord.expiresAt) {
      throw new ValidationError('Reset link has expired')
    }

    return resetRecord
  }

  async markResetTokenAsUsed(token) {
    await prisma.passwordReset.update({
      where: { token },
      data: { isUsed: true },
    })
  }

  async recordOtpAttempt(otp) {
    await prisma.otpVerification.update({
      where: { otp },
      data: { attempts: { increment: 1 } },
    })
  }
}

export default new OtpService()
