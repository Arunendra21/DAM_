'use client'

import { motion } from 'framer-motion'
import {
  Database,
  Users,
  Server,
  Shield,
  Zap,
  AlertTriangle,
  Inbox,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

interface KPI {
  id: string
  title: string
  value: number
  unit?: string
  subtitle: string
  icon: string
  color: string
  trend: number
}

const iconMap = {
  database: Database,
  users: Users,
  server: Server,
  shield: Shield,
  zap: Zap,
  'alert-triangle': AlertTriangle,
  inbox: Inbox,
  'check-circle': CheckCircle,
}

const colorClasses = {
  blue: 'from-blue-600 to-blue-700',
  green: 'from-green-600 to-green-700',
  purple: 'from-purple-600 to-purple-700',
  orange: 'from-orange-600 to-orange-700',
  red: 'from-red-600 to-red-700',
  yellow: 'from-yellow-600 to-yellow-700',
  cyan: 'from-cyan-600 to-cyan-700',
}

const borderClasses = {
  blue: 'border-blue-500/30',
  green: 'border-green-500/30',
  purple: 'border-purple-500/30',
  orange: 'border-orange-500/30',
  red: 'border-red-500/30',
  yellow: 'border-yellow-500/30',
  cyan: 'border-cyan-500/30',
}

interface KPICardsProps {
  data: KPI[]
}

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {data.map((kpi, idx) => {
        const Icon = iconMap[kpi.icon as keyof typeof iconMap] || Database
        const isTrendUp = kpi.trend >= 0

        return (
          <motion.div
            key={kpi.id}
            className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 border ${borderClasses[kpi.color as keyof typeof borderClasses]} rounded-lg p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Background Gradient */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${colorClasses[kpi.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl`} />

            <div className="relative z-10">
              {/* Icon and Title */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{kpi.title}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[kpi.color as keyof typeof colorClasses]} bg-opacity-20`}>
                  <Icon size={20} className={`text-${kpi.color as keyof typeof borderClasses}-400`} />
                </div>
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">
                  {kpi.value.toLocaleString()}
                </span>
                {kpi.unit && <span className="text-gray-400 text-sm">{kpi.unit}</span>}
              </div>

              {/* Subtitle and Trend */}
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">{kpi.subtitle}</p>
                {kpi.trend !== 0 && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                      isTrendUp
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isTrendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(kpi.trend)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
