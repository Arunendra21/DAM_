import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface LoginData {
  date: string
  attempts: number
}

interface FailedLoginsChartProps {
  data: LoginData[]
}

export function FailedLoginsChart({ data }: FailedLoginsChartProps) {
  const maxAttempts = Math.max(...data.map(d => d.attempts))
  const avgAttempts = data.reduce((sum, item) => sum + item.attempts, 0) / data.length

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Failed Login Attempts</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
            formatter={(value: unknown) => `${value} attempts`}
            labelFormatter={(label) => `${label}`}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Line
            type="monotone"
            dataKey="attempts"
            stroke="#ef4444"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload } = props
              const isMax = payload.attempts === maxAttempts
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isMax ? 8 : 6}
                  fill={isMax ? '#ef4444' : '#ef4444'}
                  opacity={isMax ? 1 : 0.8}
                />
              )
            }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
            name="Failed Attempts"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Security Alert Box */}
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
          <div>
            <p className="text-red-400 text-sm font-semibold">Security Alert</p>
            <p className="text-gray-300 text-sm">
              Peak: {maxAttempts} attempts | Average: {avgAttempts.toFixed(1)} attempts/day
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
