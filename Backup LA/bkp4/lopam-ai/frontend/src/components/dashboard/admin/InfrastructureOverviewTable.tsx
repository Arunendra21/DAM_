import { motion } from 'framer-motion'
import { Database } from 'lucide-react'

interface InfrastructureItem {
  platform: string
  databases: number
  storage: string
  connections: number
}

interface InfrastructureOverviewTableProps {
  data: InfrastructureItem[]
}

export function InfrastructureOverviewTable({ data }: InfrastructureOverviewTableProps) {
  const totalDatabases = data.reduce((sum, item) => sum + item.databases, 0)
  const totalConnections = data.reduce((sum, item) => sum + item.connections, 0)

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Database Infrastructure Overview</h3>
      </div>

      {/* Info Text */}
      <p className="text-gray-400 text-sm mb-6">
        Complete view of your database infrastructure across all platforms. Quickly identify where databases
        are hosted, storage consumption, and active workload distribution.
      </p>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-500/30">
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Platform</th>
              <th className="px-4 py-3 text-right text-gray-300 font-semibold text-sm">Databases</th>
              <th className="px-4 py-3 text-right text-gray-300 font-semibold text-sm">Total Storage</th>
              <th className="px-4 py-3 text-right text-gray-300 font-semibold text-sm">Active Connections</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <motion.tr
                key={idx}
                className="border-b border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400 opacity-60" />
                    <span className="text-white font-medium">{item.platform}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-white">{item.databases}</td>
                <td className="px-4 py-4 text-right text-white">{item.storage}</td>
                <td className="px-4 py-4 text-right text-white">{item.connections}</td>
              </motion.tr>
            ))}
            {/* Total Row */}
            <tr className="border-t-2 border-blue-400">
              <td className="px-4 py-4 text-white font-bold">Total</td>
              <td className="px-4 py-4 text-right text-blue-400 font-bold">{totalDatabases}</td>
              <td className="px-4 py-4 text-right text-blue-400 font-bold">
                {data.reduce((sum, item) => {
                  const val = parseFloat(item.storage)
                  const unit = item.storage.match(/TB|GB/)?.[0] || ''
                  return sum + (unit === 'TB' ? val : val / 1024)
                }, 0).toFixed(1)} TB
              </td>
              <td className="px-4 py-4 text-right text-blue-400 font-bold">{totalConnections}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-400 text-sm mb-1">Most Databases</p>
          <p className="text-white font-bold">
            {data.reduce((prev, current) => (prev.databases > current.databases ? prev : current)).platform}
          </p>
        </motion.div>

        <motion.div
          className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          <p className="text-gray-400 text-sm mb-1">Highest Storage</p>
          <p className="text-white font-bold">
            {data.reduce((prev, current) => {
              const prevVal = parseFloat(prev.storage)
              const currVal = parseFloat(current.storage)
              return prevVal > currVal ? prev : current
            }).platform}
          </p>
        </motion.div>

        <motion.div
          className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-gray-400 text-sm mb-1">Most Active</p>
          <p className="text-white font-bold">
            {data.reduce((prev, current) =>
              prev.connections > current.connections ? prev : current
            ).platform}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
