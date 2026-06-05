import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StorageData {
  name: string
  value: number
}

interface StorageChartProps {
  data: StorageData[]
}

export function StorageChart({ data }: StorageChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Storage Consumption</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" label={{ value: 'Storage (TB)', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
            formatter={(value: number) => `${value.toFixed(1)} TB`}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Total Storage:</span>
          <span className="text-white font-bold">
            {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)} TB
          </span>
        </div>
      </div>
    </motion.div>
  )
}
