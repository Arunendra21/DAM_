'use client'

import { motion } from 'framer-motion'
import {
  Plus,
  Shield,
  BarChart3,
  Download,
  Lock,
  HeadphonesIcon,
  HelpCircle,
  FileText,
} from 'lucide-react'

export default function QuickActionsSection() {
  const actions = [
    {
      label: 'Request Database Access',
      icon: Plus,
      color: 'from-cyan-500/30 to-cyan-500/10',
      border: 'border-cyan-500/30',
      hover: 'hover:border-cyan-500/50',
    },
    {
      label: 'View My Permissions',
      icon: Shield,
      color: 'from-purple-500/30 to-purple-500/10',
      border: 'border-purple-500/30',
      hover: 'hover:border-purple-500/50',
    },
    {
      label: 'Generate Usage Report',
      icon: BarChart3,
      color: 'from-blue-500/30 to-blue-500/10',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-500/50',
    },
    {
      label: 'Download Audit Logs',
      icon: Download,
      color: 'from-green-500/30 to-green-500/10',
      border: 'border-green-500/30',
      hover: 'hover:border-green-500/50',
    },
    {
      label: 'Security Center',
      icon: Lock,
      color: 'from-red-500/30 to-red-500/10',
      border: 'border-red-500/30',
      hover: 'hover:border-red-500/50',
    },
    {
      label: 'Contact Administrator',
      icon: HeadphonesIcon,
      color: 'from-orange-500/30 to-orange-500/10',
      border: 'border-orange-500/30',
      hover: 'hover:border-orange-500/50',
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'from-indigo-500/30 to-indigo-500/10',
      border: 'border-indigo-500/30',
      hover: 'hover:border-indigo-500/50',
    },
    {
      label: 'Raise Support Ticket',
      icon: FileText,
      color: 'from-pink-500/30 to-pink-500/10',
      border: 'border-pink-500/30',
      hover: 'hover:border-pink-500/50',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon

          return (
            <motion.button
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl border ${action.border} ${action.hover} bg-gradient-to-br ${action.color} backdrop-blur-sm transition-all duration-300 group flex flex-col items-center gap-3 text-center`}
            >
              <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{action.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
