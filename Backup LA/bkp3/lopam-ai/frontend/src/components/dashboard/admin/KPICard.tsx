import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  icon: LucideIcon
  label: string
  value: number
  trend: number
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'yellow'
}

const colorClasses = {
  blue: {
    bg: 'from-blue-900/40 to-blue-800/20',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    trend: 'bg-blue-500/20 text-blue-300',
  },
  green: {
    bg: 'from-green-900/40 to-green-800/20',
    border: 'border-green-500/30',
    icon: 'text-green-400',
    trend: 'bg-green-500/20 text-green-300',
  },
  orange: {
    bg: 'from-orange-900/40 to-orange-800/20',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
    trend: 'bg-orange-500/20 text-orange-300',
  },
  red: {
    bg: 'from-red-900/40 to-red-800/20',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    trend: 'bg-red-500/20 text-red-300',
  },
  purple: {
    bg: 'from-purple-900/40 to-purple-800/20',
    border: 'border-purple-500/30',
    icon: 'text-purple-400',
    trend: 'bg-purple-500/20 text-purple-300',
  },
  yellow: {
    bg: 'from-yellow-900/40 to-yellow-800/20',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-400',
    trend: 'bg-yellow-500/20 text-yellow-300',
  },
}

export function KPICard({ icon: Icon, label, value, trend, color }: KPICardProps) {
  const styles = colorClasses[color]
  const trendUp = trend >= 0

  return (
    <motion.div
      className={`bg-gradient-to-br ${styles.bg} border ${styles.border} rounded-lg p-6 backdrop-blur-xl overflow-hidden relative group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.bg} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">{label}</h3>
          <Icon className={`w-5 h-5 ${styles.icon} opacity-60`} />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-bold text-white">{value.toLocaleString()}</p>
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${styles.trend}`}>
            {trendUp ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
