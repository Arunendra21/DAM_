'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface HealthData {
  name: string
  value: number
  fill: string
}

interface DatabaseHealthStatusProps {
  data: HealthData[]
}

export function DatabaseHealthStatus({ data }: DatabaseHealthStatusProps) {

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Database Health</h3>
        <p className="text-sm text-gray-400">Status distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
            formatter={(value: number) => [`${value}`, 'Count']}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="p-2 bg-slate-900/50 rounded text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.fill }}
            />
            <p className="text-xs text-gray-400">{item.name}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
