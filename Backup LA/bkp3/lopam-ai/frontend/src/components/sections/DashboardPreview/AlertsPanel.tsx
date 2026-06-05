'use client'

import { SecurityAlert } from '@/types/dashboard'
import { Badge } from '@/components/ui/Badge'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface AlertsPanelProps {
  alerts: SecurityAlert[]
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'danger'
      case 'HIGH':
        return 'warning'
      case 'MEDIUM':
        return 'warning'
      default:
        return 'success'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border dark:border-surface-border">
        <AlertTriangle size={18} className="text-red-500" />
        <h3 className="font-semibold text-sm">Security Alerts</h3>
        <span className="ml-auto text-xs bg-red-500/20 text-red-600 px-2 py-1 rounded">{alerts.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence>
          {alerts.slice(0, 5).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="p-3 rounded-lg bg-black/40 dark:bg-black/60 border border-border dark:border-surface-border/50 hover:border-primary/30 transition-colors cursor-pointer text-xs"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    <span className="text-slate-700 dark:text-gray-300 font-medium text-xs">{alert.database}</span>
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 font-medium truncate">{alert.user}</p>
                  <p className="text-slate-700 dark:text-gray-300 font-medium text-xs mt-1">{alert.ipAddress}</p>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${alert.riskScore > 80 ? 'text-red-500' : 'text-yellow-500'}`}>
                    {alert.riskScore}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
