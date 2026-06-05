'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface SecurityData {
  score: number
  checks: Array<{ name: string; status: boolean }>
  warnings: Array<{ message: string; severity: string }>
}

interface SecurityCenterProps {
  data: SecurityData
  expanded?: boolean
}

export default function SecurityCenter({ data, expanded = false }: SecurityCenterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 ${expanded ? '' : ''}`}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Security Center</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(data.score / 100) * 282.7} 282.7`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.3s ease' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{data.score}%</span>
              <span className="text-sm text-gray-400">Security Score</span>
            </div>
          </div>
        </div>

        {/* Security Checks */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400 font-medium mb-4">Security Status</p>
          {data.checks.map((check, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30"
            >
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              )}
              <span className={check.status ? 'text-white' : 'text-gray-300'}>{check.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {data.warnings.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
          <p className="text-sm text-gray-400 font-medium">Warnings</p>
          {data.warnings.map((warning, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {warning.message}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
