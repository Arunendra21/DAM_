import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
  name: string
  value: number
  fill: string
}

interface DatabaseDistributionChartProps {
  data: ChartData[]
}

export function DatabaseDistributionChart({ data }: DatabaseDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Database Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} opacity={0.8} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
            formatter={(value: unknown) => {
              if (typeof value === 'number') {
                const percentage = ((value / total) * 100).toFixed(1)
                return `${value} (${percentage}%)`
              }
              return String(value)
            } as unknown as (value: unknown, name: unknown, entry: unknown, index: number, payload: unknown) => React.ReactNode}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <div>
              <p className="text-gray-400 text-xs">{item.name}</p>
              <p className="text-white font-semibold">
                {item.value} ({((item.value / total) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
