import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
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

// Behind a reverse proxy (Render/Vercel/NGINX): trust the first proxy so that
// rate limiting, secure cookies and req.ip use the real client IP from
// X-Forwarded-For instead of the proxy address.
app.set('trust proxy', 1)

// Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, etc.)
// This is a pure JSON API, so a strict CSP that blocks all rendering is safe.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    hsts: config.isProd
      ? { maxAge: 15552000, includeSubDomains: true, preload: true }
      : false,
  })
)

// Logging
app.use(morgan(config.isProd ? 'combined' : 'dev'))

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
  // Production: only allow explicitly configured origin(s).
  // CORS_ORIGIN may be a single URL or a comma-separated list (e.g. prod + preview).
  const allowedOrigins = config.corsOrigin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)

  corsOptions.origin = function (origin, callback) {
    // Allow same-origin / server-to-server requests with no Origin header.
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  }
}

app.use(cors(corsOptions))

// Body parsing with explicit size limits to mitigate large-payload DoS.
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))

// ============================================
// RATE LIMITING
// ============================================

// Global limiter: protects every endpoint from abuse / brute force.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

// Stricter limiter for authentication endpoints (login/register/refresh/password).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only failed attempts count toward the limit
  message: { error: 'Too many authentication attempts, please try again later.' },
})

app.use(globalLimiter)

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/password', authLimiter, passwordRoutes)
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
