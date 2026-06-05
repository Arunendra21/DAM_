import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'
import { AuthenticationError } from './errors.js'

export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    issuer: 'lopam-dam',
  })

  const refreshToken = jwt.sign({ userId, type: 'refresh' }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
    issuer: 'lopam-dam',
  })

  return { accessToken, refreshToken }
}

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthenticationError('Access token expired')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid access token')
    }
    throw error
  }
}

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthenticationError('Refresh token expired')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid refresh token')
    }
    throw error
  }
}

export const decodeToken = (token) => {
  return jwt.decode(token)
}
