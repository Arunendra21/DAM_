'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  type: string
}

interface NotificationCenterProps {
  notifications: Notification[]
}

export default function NotificationCenter({ notifications }: NotificationCenterProps) {
  const typeIcons = {
    success: CheckCircle,
    warning: AlertCircle,
    info: Info,
  }

  const typeColors = {
    success: 'bg-green-500/10 border-green-500/20 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 h-fit"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        {unreadCount > 0 && (
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.slice(0, 5).map((notif, idx) => {
          const Icon = typeIcons[notif.type as keyof typeof typeIcons] || Info

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3 rounded-lg border ${typeColors[notif.type as keyof typeof typeColors]} ${!notif.read ? 'ring-1 ring-offset-2 ring-offset-slate-950' : 'opacity-75'}`}
            >
              <div className="flex gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notif.title}</p>
                  <p className="text-xs opacity-80 mt-1 line-clamp-2">{notif.message}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {notifications.length > 5 && (
        <button className="w-full mt-4 px-3 py-2 text-sm text-cyan-400 hover:text-cyan-300 transition">
          View all notifications →
        </button>
      )}
    </motion.div>
  )
}
