'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  subtext?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'yellow'
  bgGradient?: string
}

const colorMap = {
  blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
  green: 'from-green-500/10 to-green-600/10 border-green-500/20',
  red: 'from-red-500/10 to-red-600/10 border-red-500/20',
  purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
  orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20',
  yellow: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20',
}

const iconColorMap = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  red: 'text-red-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
}

export function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  color = 'blue',
  bgGradient,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }}
      className={`rounded-xl border backdrop-blur-md p-6 ${
        bgGradient || `bg-gradient-to-br ${colorMap[color]}`
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <Icon className={`w-8 h-8 ${iconColorMap[color]}`} />
      </div>

      {trend && (
        <div
          className={`text-xs font-semibold ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% this month
        </div>
      )}
    </motion.div>
  )
}
