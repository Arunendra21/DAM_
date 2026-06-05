import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config/env.js'
import { logger } from './utils/logger.js'
import { errorHandler } from './middleware/errorHandler.js'

// Routes
import authRoutes from './routes/auth.js'
import passwordRoutes from './routes/password.js'
import databaseRoutes from './routes/databases.js'
import accessRequestRoutes from './routes/accessRequests.js'
import dashboardRoutes from './routes/dashboard.js'

const app = express()

// ============================================
// MIDDLEWARE
// ============================================

// Logging
app.use(morgan('combined'))

// CORS
const corsOptions = {
  credentials: true,
}

// In development, allow any localhost port
if (config.isDev) {
  corsOptions.origin = function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl requests)
    if (!origin) return callback(null, true)

    // Allow localhost on any port
    if (origin.startsWith('http://localhost:') || origin === 'http://localhost') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} else {
  corsOptions.origin = config.corsOrigin
}

app.use(cors(corsOptions))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/password', passwordRoutes)
app.use('/api/databases', databaseRoutes)
app.use('/api/access-requests', accessRequestRoutes)
app.use('/api/dashboard', dashboardRoutes)

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use(errorHandler)

// ============================================
// SERVER START
// ============================================

const PORT = config.port

// Create server instance
const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`)
  logger.info(`Environment: ${config.env}`)
  logger.info(`Database: ${config.databaseUrl?.split('/').pop()}`)
})

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use. Please kill the process using this port.`)
    logger.error(`Run: lsof -i :${PORT} | grep LISTEN | awk '{print $2}' | xargs kill -9`)
    process.exit(1)
  }
  logger.error('Server error:', err)
  process.exit(1)
})

// Graceful shutdown with timeout
const gracefulShutdown = (signal) => {
  logger.info(`${signal} signal received: closing HTTP server`)
  const timeout = setTimeout(() => {
    logger.error('Forced shutdown due to timeout')
    process.exit(1)
  }, 10000)

  server.close(() => {
    clearTimeout(timeout)
    logger.info('HTTP server closed gracefully')
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

export default app
