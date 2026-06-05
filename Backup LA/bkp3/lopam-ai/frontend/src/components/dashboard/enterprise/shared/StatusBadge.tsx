'use client'

import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react'

type StatusType = 'active' | 'inactive' | 'warning' | 'critical' | 'pending' | 'healthy' | 'unhealthy' | 'info' | 'high' | 'medium' | 'low'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig = {
  active: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
    icon: CheckCircle,
  },
  inactive: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
    icon: XCircle,
  },
  warning: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    icon: AlertCircle,
  },
  critical: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
    icon: XCircle,
  },
  pending: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: Clock,
  },
  healthy: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
    icon: CheckCircle,
  },
  unhealthy: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
    icon: XCircle,
  },
  info: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: Clock,
  },
  high: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    icon: AlertCircle,
  },
  medium: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    icon: AlertCircle,
  },
  low: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    icon: Clock,
  },
}

const sizeConfig = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
}

export function StatusBadge({
  status,
  label,
  size = 'md',
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border ${config.bg} ${config.border} ${sizeConfig[size]}`}
    >
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`font-semibold ${config.text}`}>
        {label || status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  )
}
