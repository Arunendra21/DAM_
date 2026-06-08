'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DashboardFrameProps {
  children: ReactNode
}

export function DashboardFrame({ children }: DashboardFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-6xl rounded-2xl overflow-hidden border border-border dark:border-surface-border shadow-2xl bg-white dark:bg-surface-card"
    >
      {/* Browser Header */}
      <div className="bg-gray-100 dark:bg-surface-border/50 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs text-slate-700 dark:text-gray-300 font-medium">Lopam DAM Security Dashboard</div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-surface-card dark:to-black/20">{children}</div>
    </motion.div>
  )
}
