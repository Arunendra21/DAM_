import authService from '../services/authService.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const register = asyncHandler(async (req, res) => {
  const { email, username, password, firstName, lastName, phone } =
    req.validated

  const user = await authService.register(
    email,
    username,
    password,
    firstName,
    lastName,
    phone
  )

  res.status(201).json({
    message: 'User registered successfully',
    user,
  })
})

export const login = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.validated

  const result = await authService.login(emailOrUsername, password)

  res.json(result)
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.validated

  const tokens = await authService.refreshAccessToken(refreshToken)

  res.json(tokens)
})

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (refreshToken) {
    await authService.logout(req.user.id, refreshToken)
  }

  res.json({ message: 'Logged out successfully' })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.validated

  await authService.changePassword(req.user.id, currentPassword, newPassword)

  res.json({ message: 'Password changed successfully' })
})

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      phone: req.user.phone,
      roles: req.user.userRoles.map(ur => ur.role.name),
      mfaEnabled: req.user.mfaEnabled,
      status: req.user.status,
      createdAt: req.user.createdAt,
    },
  })
})
