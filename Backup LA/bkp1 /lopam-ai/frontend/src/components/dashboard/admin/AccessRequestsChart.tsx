import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AccessData {
  date: string
  approved: number
  rejected: number
  pending: number
}

interface AccessRequestsChartProps {
  data: AccessData[]
}

export function AccessRequestsChart({ data }: AccessRequestsChartProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Access Requests Trend (30 Days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Area
            type="monotone"
            dataKey="approved"
            stackId="1"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
            name="Approved"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.6}
            name="Pending"
          />
          <Area
            type="monotone"
            dataKey="rejected"
            stackId="1"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.6}
            name="Rejected"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Total Approved</p>
          <p className="text-green-400 font-bold">
            {data[data.length - 1]?.approved || 0}
          </p>
        </div>
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Pending</p>
          <p className="text-yellow-400 font-bold">
            {data[data.length - 1]?.pending || 0}
          </p>
        </div>
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Rejected</p>
          <p className="text-red-400 font-bold">
            {data[data.length - 1]?.rejected || 0}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
