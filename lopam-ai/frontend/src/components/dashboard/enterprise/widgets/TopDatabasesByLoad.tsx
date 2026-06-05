'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface LoadData {
  name: string
  cpu: number
  queries: number
  connections: number
}

interface TopDatabasesByLoadProps {
  data: LoadData[]
}

export function TopDatabasesByLoad({ data }: TopDatabasesByLoadProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Top Databases by Load</h3>
        <p className="text-sm text-gray-400">CPU usage ranking</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis dataKey="name" type="category" width={120} stroke="#9ca3af" style={{ fontSize: '11px' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          />
          <Bar dataKey="cpu" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((db, idx) => (
          <div key={idx} className="p-2 bg-slate-900/50 rounded flex justify-between items-center">
            <span className="text-sm text-gray-300">{db.name}</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-24">
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                    style={{ width: `${db.cpu}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">{db.cpu}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
