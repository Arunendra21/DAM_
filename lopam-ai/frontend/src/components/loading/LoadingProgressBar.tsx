'use client'

import { motion } from 'framer-motion'

interface LoadingProgressBarProps {
  progress: number
}

export function LoadingProgressBar({ progress }: LoadingProgressBarProps) {
  return (
    <motion.div className="w-full max-w-sm space-y-3">
      {/* Progress Bar Container */}
      <div className="relative h-1.5 rounded-full bg-slate-800/50 border border-emerald-500/20 overflow-hidden backdrop-blur-sm">
        {/* Progress Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-400/50 blur-sm"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex items-center justify-between px-1">
        <motion.div
          className="text-xs font-semibold text-emerald-400"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INITIALIZING SYSTEM
        </motion.div>
        <motion.div className="flex items-center gap-1">
          <motion.span
            className="text-lg font-bold text-emerald-400 tabular-nums"
            key={Math.floor(progress)}
          >
            {Math.floor(progress)}
          </motion.span>
          <span className="text-xs text-gray-400">%</span>
        </motion.div>
      </div>

      {/* Status Message */}
      <motion.div
        className="text-center text-xs text-gray-400 h-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {progress < 25 && 'Scanning databases...'}
        {progress >= 25 && progress < 50 && 'Validating policies...'}
        {progress >= 50 && progress < 75 && 'Configuring security...'}
        {progress >= 75 && progress < 100 && 'Finalizing session...'}
        {progress >= 100 && 'System Ready!'}
      </motion.div>
    </motion.div>
  )
}
