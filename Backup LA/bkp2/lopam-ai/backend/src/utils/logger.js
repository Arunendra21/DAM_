import { config } from '../config/env.js'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const currentLevel = levels[config.logLevel] || levels.info

const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString()
  const colorCode = colors[level] || colors.reset
  const prefix = `${colorCode}[${level.toUpperCase()}]${colors.reset} ${timestamp}`

  if (levels[level] <= currentLevel) {
    if (data) {
      console.log(`${prefix} ${message}`, data)
    } else {
      console.log(`${prefix} ${message}`)
    }
  }
}

export const logger = {
  error: (message, data) => log('error', message, data),
  warn: (message, data) => log('warn', message, data),
  info: (message, data) => log('info', message, data),
  debug: (message, data) => log('debug', message, data),
}
