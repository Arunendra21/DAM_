'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StorageData {
  database: string
  used: number
  capacity: number
}

interface StorageConsumptionProps {
  data: StorageData[]
}

export function StorageConsumption({ data }: StorageConsumptionProps) {
  const totalUsed = data.reduce((sum, item) => sum + item.used, 0)
  const totalCapacity = data.reduce((sum, item) => sum + item.capacity, 0)
  const usage = Math.round((totalUsed / totalCapacity) * 100)

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Storage Consumption</h3>
        <p className="text-sm text-gray-400">Per database type</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="database" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} label={{ value: 'TB', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
            formatter={(value: unknown) => typeof value === 'number' ? `${value.toFixed(1)} TB` : String(value)}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Bar dataKey="used" stackId="a" fill="#3b82f6" name="Used" radius={[8, 8, 0, 0]} />
          <Bar dataKey="capacity" stackId="a" fill="rgba(59, 130, 246, 0.2)" name="Capacity" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-slate-900/50 rounded">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Total Usage</span>
          <span className="text-lg font-bold text-white">{totalUsed.toFixed(1)} TB / {totalCapacity.toFixed(1)} TB</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
            style={{ width: `${Math.min(usage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{usage}% utilized</p>
      </div>
    </motion.div>
  )
}
