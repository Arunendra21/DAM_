'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface QueryData {
  time: string
  select: number
  insert: number
  update: number
  delete: number
  failed: number
}

interface QueryMonitoringProps {
  data: QueryData[]
}

export function QueryMonitoring({ data }: QueryMonitoringProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Query Monitoring</h3>
        <p className="text-sm text-gray-400">Real-time query analysis</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Line type="monotone" dataKey="select" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="insert" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="update" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="delete" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
