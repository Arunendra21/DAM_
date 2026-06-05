'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Stat {
  label: string
  value: number
  maxValue: number
  unit: string
}

interface DynamicStatisticsProps {
  progress: number
}

export function DynamicStatistics({ progress }: DynamicStatisticsProps) {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'AI Models Active', value: 0, maxValue: 284, unit: '' },
    { label: 'Data Streams', value: 0, maxValue: 12492, unit: '' },
    { label: 'Processing Nodes', value: 0, maxValue: 1324, unit: '' },
    { label: 'Cloud Regions', value: 0, maxValue: 42, unit: '' },
    { label: 'Network Health', value: 0, maxValue: 99.99, unit: '%' },
  ])

  useEffect(() => {
    setStats((prev) =>
      prev.map((stat) => ({
        ...stat,
        value: (progress / 100) * stat.maxValue,
      }))
    )
  }, [progress])

  return (
    <motion.div
      className="absolute bottom-32 left-0 right-0 flex justify-center gap-8 lg:gap-12 flex-wrap px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: progress > 15 ? 1 : 0, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="text-center backdrop-blur-sm bg-white/5 px-4 py-3 rounded-lg border border-blue-500/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: progress > 20 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
        >
          <motion.div className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 font-mono">
            {stat.maxValue === 99.99 ? (
              <span>{Math.round(stat.value * 100) / 100}{stat.unit}</span>
            ) : (
              <span>{Math.floor(stat.value).toLocaleString()}{stat.unit}</span>
            )}
          </motion.div>
          <div className="text-xs lg:text-sm text-gray-300 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
