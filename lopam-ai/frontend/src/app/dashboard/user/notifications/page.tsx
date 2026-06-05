'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Trash2, Archive } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All')
  const notifications = userPortalData.notifications

  const filtered = notifications.filter((notif) =>
    filter === 'All' ||
    (filter === 'Unread' && !notif.read) ||
    (filter === 'Read' && notif.read) ||
    (filter === 'Critical' && notif.priority === 'high') ||
    notif.priority === filter.toLowerCase()
  )

  const priorityColors = {
    high: 'bg-red-500/10 border-red-500/20 text-red-300',
    medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    normal: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Notifications</h1>
          </div>
          <p className="text-gray-400">Manage all your notifications in one place</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 flex-wrap">
          {['All', 'Unread', 'Read', 'Critical', 'High', 'Normal'].map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg transition ${
                filter === f
                  ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50'
                  : 'bg-slate-800/50 text-gray-400 hover:text-gray-300 border border-slate-700/50'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          {filtered.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-lg border transition ${
                notif.read
                  ? 'bg-slate-900/20 border-slate-700/30'
                  : 'bg-slate-900/40 border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{notif.title}</h3>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </div>
                  <p className="text-sm text-gray-400">{notif.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span>{notif.timestamp}</span>
                    <span className={`px-2 py-1 rounded border ${priorityColors[notif.priority as keyof typeof priorityColors]}`}>
                      {notif.priority.charAt(0).toUpperCase() + notif.priority.slice(1)} Priority
                    </span>
                    <span className="text-gray-600">{notif.category}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-slate-800/50 rounded transition">
                    <Archive className="w-4 h-4 text-gray-400 hover:text-gray-300" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-red-500/10 rounded transition">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </UserDashboardLayout>
  )
}
