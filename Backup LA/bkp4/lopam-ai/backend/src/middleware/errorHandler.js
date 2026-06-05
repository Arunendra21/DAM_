import { logger } from '../utils/logger.js'
import { AppError } from '../utils/errors.js'
import { ZodError } from 'zod'

export const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred', { message: err.message, stack: err.stack })

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
    })
  }

  // Application error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Resource already exists' })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Resource not found' })
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { message: err.message }),
  })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
