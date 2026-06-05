'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react'

type AlertLevel = 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success'

interface AlertCardProps {
  title: string
  description: string
  level: AlertLevel
  timestamp?: string
  actionLabel?: string
  onAction?: () => void
}

const levelConfig = {
  critical: {
    bgGradient: 'from-red-500/10 to-red-600/10',
    borderColor: 'border-red-500/30',
    icon: AlertTriangle,
    color: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300',
  },
  high: {
    bgGradient: 'from-orange-500/10 to-orange-600/10',
    borderColor: 'border-orange-500/30',
    icon: AlertCircle,
    color: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-300',
  },
  medium: {
    bgGradient: 'from-yellow-500/10 to-yellow-600/10',
    borderColor: 'border-yellow-500/30',
    icon: AlertCircle,
    color: 'text-yellow-400',
    badge: 'bg-yellow-500/20 text-yellow-300',
  },
  low: {
    bgGradient: 'from-blue-500/10 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    icon: Info,
    color: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  info: {
    bgGradient: 'from-blue-500/10 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    icon: Info,
    color: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  success: {
    bgGradient: 'from-green-500/10 to-green-600/10',
    borderColor: 'border-green-500/30',
    icon: CheckCircle,
    color: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300',
  },
}

export function AlertCard({
  title,
  description,
  level,
  timestamp,
  actionLabel,
  onAction,
}: AlertCardProps) {
  const config = levelConfig[level]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-lg p-4 backdrop-blur-sm`}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-white text-sm">{title}</p>
              <p className="text-gray-400 text-xs mt-1">{description}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${config.badge} whitespace-nowrap`}>
              {level.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            {timestamp && <span className="text-xs text-gray-500">{timestamp}</span>}
            {actionLabel && (
              <button
                onClick={onAction}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
              >
                {actionLabel} →
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
