'use client'

import { motion } from 'framer-motion'
import { LogIn, FileText, Clock, CheckCircle, Download, Settings, Database } from 'lucide-react'

interface Activity {
  time: string
  action: string
  icon: string
  type: string
}

interface RecentActivityTimelineProps {
  activities: Activity[]
}

export default function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  const iconMap = {
    login: LogIn,
    report: FileText,
    request: Clock,
    approval: CheckCircle,
    export: Download,
    settings: Settings,
    database: Database,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-8">Recent Activity Timeline</h3>

      <div className="space-y-6">
        {activities.map((activity, idx) => {
          const Icon = iconMap[activity.icon as keyof typeof iconMap] || Database

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-4"
            >
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                </motion.div>
                {idx < activities.length - 1 && (
                  <div className="w-px h-12 bg-gradient-to-b from-cyan-500/20 to-transparent my-2" />
                )}
              </div>

              {/* Activity content */}
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
