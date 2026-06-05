'use client'

import { motion } from 'framer-motion'
import {
  Database,
  Users,
  Server,
  HardDrive,
  Zap,
  AlertTriangle,
  Inbox,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

interface KPIData {
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: React.ReactNode
  color: string
  gradient: string
  sparklineData?: Array<{ value: number }>
}

interface KPICardsProps {
  data: KPIData[]
}

const colors = {
  teal: { from: 'from-teal-600/20 to-cyan-600/20', border: 'border-teal-500/20', accent: 'text-teal-400' },
  blue: { from: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/20', accent: 'text-blue-400' },
  purple: { from: 'from-purple-600/20 to-cyan-600/20', border: 'border-purple-500/20', accent: 'text-purple-400' },
  orange: { from: 'from-orange-600/20 to-yellow-600/20', border: 'border-orange-500/20', accent: 'text-orange-400' },
  red: { from: 'from-red-600/20 to-orange-600/20', border: 'border-red-500/20', accent: 'text-red-400' },
  green: { from: 'from-green-600/20 to-teal-600/20', border: 'border-green-500/20', accent: 'text-green-400' },
}

const sparklineData = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 45 },
  { value: 38 },
  { value: 50 },
  { value: 42 },
]

const defaultKPIs: KPIData[] = [
  {
    label: 'Total Databases',
    value: 127,
    trend: { value: 12, isPositive: true },
    icon: <Database className="w-6 h-6" />,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500',
    sparklineData,
  },
  {
    label: 'Active Users',
    value: '3,842',
    trend: { value: 243, isPositive: true },
    icon: <Users className="w-6 h-6" />,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    sparklineData,
  },
  {
    label: 'Connected Servers',
    value: 54,
    trend: { value: 2, isPositive: true },
    icon: <Server className="w-6 h-6" />,
    color: 'purple',
    gradient: 'from-purple-500 to-cyan-500',
    sparklineData,
  },
  {
    label: 'Protected Data',
    value: '12.8 TB',
    trend: { value: 1.2, isPositive: true },
    icon: <HardDrive className="w-6 h-6" />,
    color: 'orange',
    gradient: 'from-orange-500 to-yellow-500',
    sparklineData,
  },
  {
    label: 'Queries Today',
    value: '18.4M',
    trend: { value: 8, isPositive: true },
    icon: <Zap className="w-6 h-6" />,
    color: 'green',
    gradient: 'from-green-500 to-teal-500',
    sparklineData,
  },
  {
    label: 'Security Alerts',
    value: 23,
    trend: { value: 2, isPositive: false },
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'red',
    gradient: 'from-red-500 to-orange-500',
    sparklineData,
  },
  {
    label: 'Access Requests',
    value: 54,
    trend: { value: 5, isPositive: false },
    icon: <Inbox className="w-6 h-6" />,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    sparklineData,
  },
  {
    label: 'Compliance Score',
    value: '97%',
    trend: { value: 2, isPositive: true },
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'teal',
    gradient: 'from-teal-500 to-emerald-500',
    sparklineData,
  },
]

export function KPICardsNew({ data = defaultKPIs }: KPICardsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {data.map((kpi, index) => {
        const colorClass = colors[kpi.color as keyof typeof colors] || colors.teal

        return (
          <motion.div
            key={index}
            variants={item}
            className={`group rounded-xl p-6 border overflow-hidden relative backdrop-blur-xl transition-all duration-300 ${colorClass.from} ${colorClass.border}`}
            style={{
              background: `linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.8) 100%), linear-gradient(135deg, ${kpi.color === 'teal' ? 'rgba(22,224,181,0.05)' : 'rgba(100,200,255,0.05)'} 0%, transparent 100%)`,
              border: `1px solid ${kpi.color === 'teal' ? 'rgba(22,224,181,0.2)' : 'rgba(100,200,255,0.2)'}`,
              boxShadow: `0 0 20px rgba(22,224,181,0.08), inset 0 0 20px rgba(22,224,181,0.02)`,
              backdropFilter: 'blur(16px)',
            }}
            whileHover={{
              boxShadow: `0 0 35px ${kpi.color === 'teal' ? 'rgba(22,224,181,0.2)' : 'rgba(100,200,255,0.2)'}, inset 0 0 20px rgba(22,224,181,0.02)`,
              transform: 'translateY(-4px)',
            }}
          >
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at top-right, ${kpi.color === 'teal' ? 'rgba(22,224,181,0.1)' : 'rgba(100,200,255,0.1)'} 0%, transparent 80%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Header: Icon + Label */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {kpi.label}
                  </p>
                </div>
                <motion.div
                  className={`p-3 rounded-lg ${colorClass.from} border ${colorClass.border}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: `linear-gradient(135deg, ${kpi.color === 'teal' ? 'rgba(22,224,181,0.15)' : 'rgba(100,200,255,0.15)'} 0%, transparent 100%)`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className={colorClass.accent}>{kpi.icon}</div>
                </motion.div>
              </div>

              {/* Main Value */}
              <div className="mb-4">
                <motion.div
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {kpi.value}
                </motion.div>

                {/* Trend */}
                {kpi.trend && (
                  <motion.div
                    className="flex items-center gap-1 mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {kpi.trend.isPositive ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">
                          +{kpi.trend.value} {typeof kpi.trend.value === 'number' && kpi.trend.value < 100 ? '%' : ''}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-semibold text-orange-400">
                          {kpi.trend.value}
                        </span>
                      </>
                    )}
                    <span style={{ color: 'rgba(255,255,255,0.5)' }} className="text-xs ml-1">
                      this month
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Sparkline Chart */}
              {kpi.sparklineData && (
                <motion.div
                  className="h-12 -mx-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.sparklineData}>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(7,16,34,0.95)',
                          border: '1px solid rgba(22,224,181,0.2)',
                          borderRadius: '8px',
                          boxShadow: '0 0 20px rgba(22,224,181,0.2)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={kpi.color === 'teal' ? '#16E0B5' : '#00D9FF'}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
