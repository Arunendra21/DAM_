'use client'

import { motion } from 'framer-motion'
import { Activity, Cpu, HardDrive, Wifi, Zap, Clock } from 'lucide-react'

interface SystemHealthData {
  cpu: number
  memory: number
  disk: number
  network: number
  apiLatency: number
  queryResponse: number
}

interface SystemHealthPanelProps {
  data: SystemHealthData
}

export function SystemHealthPanel({ data }: SystemHealthPanelProps) {
  const metrics = [
    { icon: Cpu, label: 'CPU Usage', value: data.cpu, unit: '%', color: 'blue' },
    { icon: Activity, label: 'Memory', value: data.memory, unit: '%', color: 'green' },
    { icon: HardDrive, label: 'Disk', value: data.disk, unit: '%', color: 'orange' },
    { icon: Wifi, label: 'Network', value: data.network, unit: '%', color: 'purple' },
    { icon: Zap, label: 'API Latency', value: data.apiLatency, unit: 'ms', color: 'blue' },
    { icon: Clock, label: 'Query Response', value: data.queryResponse, unit: 'ms', color: 'green' },
  ]

  const getHealthColor = (value: number, isLatency: boolean = false) => {
    if (isLatency) {
      if (value < 100) return 'text-green-400'
      if (value < 300) return 'text-yellow-400'
      return 'text-red-400'
    }
    if (value < 60) return 'text-green-400'
    if (value < 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          const isLatency = ['apiLatency', 'queryResponse'].includes(metric.label.replace(/\s/g, ''))
          const healthColor = getHealthColor(metric.value, metric.label.includes('Latency') || metric.label.includes('Response'))

          return (
            <motion.div
              key={idx}
              className="p-3 bg-slate-900/50 rounded border border-slate-700/50 hover:border-blue-500/30 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + idx * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400">{metric.label}</span>
              </div>
              <p className={`text-2xl font-bold ${healthColor}`}>
                {metric.value}
                <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
