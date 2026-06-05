import { motion } from 'framer-motion'

interface DatabaseItem {
  name: string
  type: string
  environment: string
  owner: string
  storage: string
  activeUsers: number
  health: 'Healthy' | 'Warning' | 'Critical'
}

interface DatabaseInventoryTableProps {
  data: DatabaseItem[]
}

const healthColors = {
  Healthy: 'bg-green-500/20 text-green-300 border-green-500/30',
  Warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Critical: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export function DatabaseInventoryTable({ data }: DatabaseInventoryTableProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Database Inventory</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-500/30">
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Database Name</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Type</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Environment</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Owner</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Storage</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Users</th>
              <th className="px-4 py-3 text-left text-gray-300 font-semibold text-sm">Health</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <motion.tr
                key={idx}
                className="border-b border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="px-4 py-4 text-white font-medium">{item.name}</td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-300 text-sm">{item.environment}</td>
                <td className="px-4 py-4 text-gray-300 text-sm">{item.owner}</td>
                <td className="px-4 py-4 text-white font-medium">{item.storage}</td>
                <td className="px-4 py-4 text-white">{item.activeUsers}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded text-sm font-semibold border ${
                      healthColors[item.health]
                    }`}
                  >
                    {item.health}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Total Databases</p>
          <p className="text-white font-bold">{data.length}</p>
        </div>
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Healthy</p>
          <p className="text-green-400 font-bold">
            {data.filter(d => d.health === 'Healthy').length}
          </p>
        </div>
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Warning</p>
          <p className="text-yellow-400 font-bold">
            {data.filter(d => d.health === 'Warning').length}
          </p>
        </div>
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-gray-400 text-xs">Critical</p>
          <p className="text-red-400 font-bold">
            {data.filter(d => d.health === 'Critical').length}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
