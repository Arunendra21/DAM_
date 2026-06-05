'use client'

import { motion } from 'framer-motion'
import {
  LogIn,
  CheckCircle,
  Save,
  AlertTriangle,
  Database,
  Check,
  XCircle,
} from 'lucide-react'

interface Activity {
  id: string
  type: string
  user: string
  description: string
  timestamp: string
  icon: string
}

interface RecentActivitiesProps {
  data: Activity[]
}

const iconMap = {
  'log-in': LogIn,
  'check-circle': CheckCircle,
  save: Save,
  'alert-triangle': AlertTriangle,
  database: Database,
  check: Check,
  'x-circle': XCircle,
}

export function RecentActivities({ data }: RecentActivitiesProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.map((activity, idx) => {
          const Icon = iconMap[activity.icon as keyof typeof iconMap] || AlertTriangle

          return (
            <motion.div
              key={activity.id}
              className="p-3 bg-slate-900/50 rounded border border-slate-700/50 hover:border-blue-500/30 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + idx * 0.05 }}
            >
              <div className="flex gap-3">
                <Icon size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    by {activity.user} • {activity.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
        View All Activities →
      </button>
    </motion.div>
  )
}
