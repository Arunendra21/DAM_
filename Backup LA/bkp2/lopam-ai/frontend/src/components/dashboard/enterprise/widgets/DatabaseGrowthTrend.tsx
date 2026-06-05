'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface GrowthData {
  date: string
  storage: number
  databases: number
  users: number
}

interface DatabaseGrowthTrendProps {
  data: GrowthData[]
}

export function DatabaseGrowthTrend({ data }: DatabaseGrowthTrendProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Growth Trend</h3>
        <p className="text-sm text-gray-400">Last 30 days</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Line type="monotone" dataKey="storage" stroke="#3b82f6" strokeWidth={2} dot={false} name="Storage (TB)" />
          <Line type="monotone" dataKey="databases" stroke="#10b981" strokeWidth={2} dot={false} name="Databases" />
          <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={2} dot={false} name="Users" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
