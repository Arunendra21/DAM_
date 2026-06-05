'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Insight {
  label: string
  value: string
  change: string
  trend: string
}

interface PerformanceInsightsProps {
  data: Insight[]
}

export default function PerformanceInsights({ data }: PerformanceInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Performance Insights</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-400">{insight.label}</p>
              {insight.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
              {insight.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-400" />}
              {insight.trend === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
            </div>

            <p className="text-2xl font-bold text-white mb-2">{insight.value}</p>

            <p
              className={`text-xs font-medium ${
                insight.trend === 'up' && !insight.change.includes('-') ? 'text-green-400' : insight.trend === 'down' || insight.change.includes('-') ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {insight.change}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
