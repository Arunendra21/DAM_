import express from 'express'
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
  validateResetToken,
} from '../controllers/passwordController.js'
import {
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  validatePasswordInput,
} from '../validators/password.js'

const router = express.Router()

// Forgot password - Step 1
router.post('/forgot-password', validatePasswordInput(forgotPasswordSchema), forgotPassword)

// Verify OTP - Step 2
router.post('/verify-otp', validatePasswordInput(verifyOtpSchema), verifyOtp)

// Reset password - Step 3
router.post('/reset-password', validatePasswordInput(resetPasswordSchema), resetPassword)

// Validate reset token
router.get('/validate-token', validateResetToken)

export default router
