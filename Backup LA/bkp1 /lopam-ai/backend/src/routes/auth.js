import express from 'express'
import {
  register,
  login,
  refreshToken,
  logout,
  changePassword,
  getMe,
} from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  changePasswordSchema,
  validateInput,
} from '../validators/auth.js'

const router = express.Router()

// Public routes
router.post('/register', validateInput(registerSchema), register)
router.post('/login', validateInput(loginSchema), login)
router.post('/refresh', validateInput(refreshTokenSchema), refreshToken)

// Protected routes
router.post('/logout', authenticate, logout)
router.post('/change-password', authenticate, validateInput(changePasswordSchema), changePassword)
router.get('/me', authenticate, getMe)

export default router
