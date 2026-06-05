import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',

  // Server
  port: parseInt(process.env.PORT || '8080', 10),
  apiUrl: process.env.API_URL || 'http://localhost:8080',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },

  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
  lockTime: process.env.LOCK_TIME || '15m',

  // Email
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM || 'noreply@lopam.ai',
  },

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // MFA
  mfa: {
    window: parseInt(process.env.MFA_WINDOW || '30', 10),
  },
}

// Validate required env vars
const required = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET']
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`)
    process.exit(1)
  }
}
