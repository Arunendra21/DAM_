import { motion } from 'framer-motion'

interface HealthItem {
  name: string
  cpu: number
  memory: number
  disk: number
  status: 'Healthy' | 'Warning' | 'Critical'
}

interface HealthMonitoringCardsProps {
  data: HealthItem[]
}

const statusColors = {
  Healthy: {
    badge: 'bg-green-500/20 text-green-300 border-green-500/30',
    bar: 'bg-green-500',
  },
  Warning: {
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    bar: 'bg-yellow-500',
  },
  Critical: {
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
    bar: 'bg-red-500',
  },
}

function HealthBar({ percentage, label }: { percentage: number; label: string }) {
  let color = 'bg-green-500'
  if (percentage >= 80) color = 'bg-red-500'
  else if (percentage >= 70) color = 'bg-yellow-500'

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-white font-semibold text-sm">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function HealthMonitoringCards({ data }: HealthMonitoringCardsProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Cluster Health Monitoring</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => {
          const colors = statusColors[item.status]
          return (
            <motion.div
              key={idx}
              className="p-4 bg-slate-900/40 border border-slate-700/30 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${colors.badge}`}>
                  {item.status}
                </span>
              </div>

              {/* Metrics */}
              <HealthBar percentage={item.cpu} label="CPU" />
              <HealthBar percentage={item.memory} label="Memory" />
              <HealthBar percentage={item.disk} label="Disk" />

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-slate-700/30">
                <p className="text-gray-400 text-xs text-center">
                  Avg: {Math.round((item.cpu + item.memory + item.disk) / 3)}%
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
