'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface DistributionData {
  name: string
  value: number
  percentage: number
  fill: string
}

interface DatabaseDistributionWidgetProps {
  data: DistributionData[]
}

export function DatabaseDistributionWidget({ data }: DatabaseDistributionWidgetProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Database Distribution</h3>
        <p className="text-sm text-gray-400">Across all platforms</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
            formatter={(value: number, name) => {
              const percentage = ((value / total) * 100).toFixed(1)
              return [`${value} (${percentage}%)`, 'Count']
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="p-2 bg-slate-900/50 rounded">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-xs text-gray-400">{item.name}</span>
            </div>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
