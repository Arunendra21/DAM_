'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Database, Activity, Shield, Clock, HardDrive } from 'lucide-react'

interface LoadingMetricsProps {
  progress: number
}

interface MetricItem {
  icon: React.ReactNode
  label: string
  value: number
  maxValue: number
  unit: string
  color: string
}

export function LoadingMetrics({ progress }: LoadingMetricsProps) {
  const [metrics, setMetrics] = useState<MetricItem[]>([
    { icon: <Database size={16} />, label: 'Protected Databases', value: 0, maxValue: 847, unit: '', color: 'emerald' },
    { icon: <Activity size={16} />, label: 'Active Connections', value: 0, maxValue: 12453, unit: '', color: 'cyan' },
    { icon: <Shield size={16} />, label: 'Threats Blocked', value: 0, maxValue: 2847, unit: '', color: 'red' },
    { icon: <Clock size={16} />, label: 'Access Requests', value: 0, maxValue: 542, unit: '', color: 'amber' },
    { icon: <HardDrive size={16} />, label: 'Data Volume', value: 0, maxValue: 8.9, unit: 'TB', color: 'violet' },
  ])

  useEffect(() => {
    setMetrics((prev) =>
      prev.map((metric) => ({
        ...metric,
        value: Math.floor((progress / 100) * metric.maxValue),
      }))
    )
  }, [progress])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { icon: string; text: string; bg: string; border: string }> = {
      emerald: {
        icon: 'text-emerald-400',
        text: 'text-emerald-300',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
      },
      cyan: {
        icon: 'text-cyan-400',
        text: 'text-cyan-300',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
      },
      red: {
        icon: 'text-red-400',
        text: 'text-red-300',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
      },
      amber: {
        icon: 'text-amber-400',
        text: 'text-amber-300',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
      },
      violet: {
        icon: 'text-violet-400',
        text: 'text-violet-300',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
      },
    }
    return colors[color] || colors.emerald
  }

  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h3
        className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3"
        variants={itemVariants}
      >
        Live Metrics
      </motion.h3>

      {metrics.map((metric) => {
        const colorClasses = getColorClasses(metric.color)
        const percentage = Math.round((metric.value / metric.maxValue) * 100)

        return (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            className={`p-3 rounded-lg border backdrop-blur-sm ${colorClasses.bg} ${colorClasses.border}`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className={colorClasses.icon}>{metric.icon}</div>
              <span className="text-xs font-medium text-gray-300">{metric.label}</span>
            </div>

            {/* Value */}
            <motion.div className={`text-lg font-bold ${colorClasses.text} mb-2 flex items-baseline gap-1`}>
              <span>
                {metric.value.toLocaleString()}
              </span>
              {metric.unit && <span className="text-xs font-normal">{metric.unit}</span>}
            </motion.div>

            {/* Progress Bar */}
            <div className="relative h-1 rounded-full bg-slate-700/50 overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  metric.color === 'emerald'
                    ? 'bg-emerald-500'
                    : metric.color === 'cyan'
                      ? 'bg-cyan-500'
                      : metric.color === 'red'
                        ? 'bg-red-500'
                        : metric.color === 'amber'
                          ? 'bg-amber-500'
                          : 'bg-violet-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Percentage */}
            <div className="text-xs text-gray-400 mt-2 text-right font-mono">
              {percentage}%
            </div>
          </motion.div>
        )
      })}

      {/* Status Footer */}
      <motion.div
        variants={itemVariants}
        className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-center"
      >
        <motion.p
          className="text-xs text-emerald-300 font-semibold"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SYSTEM ONLINE
        </motion.p>
        <p className="text-xs text-gray-400 mt-1">All systems operational</p>
      </motion.div>
    </motion.div>
  )
}
