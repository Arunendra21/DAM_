'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'

interface SecurityScoreProps {
  score: number
}

export function SecurityScore({ score }: SecurityScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-500'
    if (s >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <motion.div className="text-center">
      <div className="mb-4">
        <p className="text-sm text-slate-700 dark:text-gray-300 font-medium mb-2">Overall Security Score</p>
        <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
          <CountUp start={0} end={score} duration={1} />
        </div>
        <p className="text-xs text-slate-700 dark:text-gray-300 font-medium mt-2">out of 100</p>
      </div>

      {/* Score Rings */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[
          { label: 'Database', value: score - 5 },
          { label: 'Access Control', value: score - 2 },
          { label: 'Compliance', value: score - 8 },
          { label: 'Encryption', value: score },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-2">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-border dark:text-surface-border" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(item.value / 100) * 283} 283`}
                  className="text-primary"
                  initial={{ strokeDasharray: '0 283' }}
                  whileInView={{ strokeDasharray: `${(item.value / 100) * 283} 283` }}
                  transition={{ duration: 1.5 }}
                  style={{ transformOrigin: '50px 50px', transform: 'rotate(-90deg)' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{item.value}</div>
            </div>
            <p className="text-xs text-slate-700 dark:text-gray-300 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
