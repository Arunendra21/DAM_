import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface QueryData {
  date: string
  queries: number
}

interface QueryActivityChartProps {
  data: QueryData[]
}

export function QueryActivityChart({ data }: QueryActivityChartProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Database Query Activity (Last 7 Days)</h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis
            stroke="#9ca3af"
            label={{ value: 'Queries (Millions)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
            formatter={(value: unknown) => typeof value === 'number' ? `${value.toFixed(1)}M` : String(value)}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Line
            type="monotone"
            dataKey="queries"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
            name="Queries"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <p className="text-gray-400 text-xs">Average</p>
          <p className="text-white font-bold">
            {(data.reduce((sum, item) => sum + item.queries, 0) / data.length).toFixed(2)}M
          </p>
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <p className="text-gray-400 text-xs">Peak</p>
          <p className="text-white font-bold">
            {Math.max(...data.map(d => d.queries)).toFixed(2)}M
          </p>
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <p className="text-gray-400 text-xs">Total</p>
          <p className="text-white font-bold">
            {data.reduce((sum, item) => sum + item.queries, 0).toFixed(1)}M
          </p>
        </div>
      </div>
    </motion.div>
  )
}
