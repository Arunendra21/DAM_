'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface AccessData {
  pending: number
  approvedToday: number
  rejected: number
  escalated: number
}

interface AccessRequestOverviewProps {
  data: AccessData
}

export function AccessRequestOverview({ data }: AccessRequestOverviewProps) {
  const items = [
    { icon: Clock, label: 'Pending', value: data.pending, color: 'blue' },
    { icon: CheckCircle, label: 'Approved', value: data.approvedToday, color: 'green' },
    { icon: XCircle, label: 'Rejected', value: data.rejected, color: 'red' },
    { icon: AlertCircle, label: 'Escalated', value: data.escalated, color: 'orange' },
  ]

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Access Requests</h3>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const Icon = item.icon
          const colors = {
            blue: 'bg-blue-500/20 text-blue-400',
            green: 'bg-green-500/20 text-green-400',
            red: 'bg-red-500/20 text-red-400',
            orange: 'bg-orange-500/20 text-orange-400',
          }

          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`p-2 rounded ${colors[item.color as keyof typeof colors]}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
          )
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
        View All Requests
      </button>
    </motion.div>
  )
}
