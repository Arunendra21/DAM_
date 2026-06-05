'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle } from 'lucide-react'

interface Alert {
  category: string
  count: number
  severity: string
  color: string
}

interface SecurityAlertCenterProps {
  data: Alert[]
}

export function SecurityAlertCenter({ data }: SecurityAlertCenterProps) {
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  const sorted = [...data].sort(
    (a, b) => severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]
  )

  const totalAlerts = data.reduce((sum, item) => sum + item.count, 0)
  const criticalCount = data.filter(item => item.severity === 'critical').reduce((sum, item) => sum + item.count, 0)

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-red-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
          <p className="text-sm text-gray-400">{totalAlerts} Total</p>
        </div>
        {criticalCount > 0 && (
          <motion.div
            className="p-2 bg-red-500/20 border border-red-500/30 rounded"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle size={18} className="text-red-400" />
          </motion.div>
        )}
      </div>

      <div className="space-y-2">
        {sorted.map((alert, idx) => {
          const severityColors = {
            critical: 'bg-red-500/20 border-red-500/30 text-red-300',
            high: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
            medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
            low: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
          }

          return (
            <motion.div
              key={idx}
              className={`p-3 rounded border ${severityColors[alert.severity as keyof typeof severityColors]}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">{alert.category}</span>
                </div>
                <span className="font-bold">{alert.count}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-sm font-medium transition-colors">
        View All Alerts
      </button>
    </motion.div>
  )
}
