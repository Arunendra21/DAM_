import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

interface AuditActivity {
  time: string
  action: string
  user: string
  resource: string
  type: 'request' | 'success' | 'warning' | 'error' | 'info'
}

interface AuditTimelineSectionProps {
  activities: AuditActivity[]
}

const typeConfig = {
  request: {
    icon: Clock,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
  },
  error: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
  },
  info: {
    icon: Info,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
  },
}

export function AuditTimelineSection({ activities }: AuditTimelineSectionProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Recent Audit Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const config = typeConfig[activity.type]
          const Icon = config.icon

          return (
            <motion.div
              key={idx}
              className={`flex gap-4 p-4 rounded-lg border ${config.bg} ${config.border}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + idx * 0.05 }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <Icon className={`w-5 h-5 ${config.color} mt-1`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{activity.action}</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      by <span className="text-gray-300 font-medium">{activity.user}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-2">{activity.resource}</p>
                  </div>
                  <span className="text-gray-400 text-sm flex-shrink-0 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* View More */}
      <div className="mt-6 pt-6 border-t border-blue-500/20 text-center">
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
          View All Activities →
        </button>
      </div>
    </motion.div>
  )
}
