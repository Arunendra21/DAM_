'use client'

import { motion } from 'framer-motion'

interface LoadingSequenceProps {
  currentStep: number
  steps: string[]
}

export function LoadingSequence({ currentStep, steps }: LoadingSequenceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="space-y-2 w-full max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <motion.div
            key={step}
            variants={itemVariants}
            className="flex items-center gap-3 px-3 py-2 rounded-lg group"
          >
            {/* Status Indicator */}
            <motion.div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm"
              animate={{
                backgroundColor: isCompleted
                  ? 'rgba(22, 224, 181, 1)'
                  : isCurrent
                    ? ['rgba(22, 224, 181, 0.5)', 'rgba(22, 224, 181, 1)']
                    : 'rgba(71, 85, 105, 0.3)',
                color: isCompleted || isCurrent ? 'white' : 'rgba(148, 163, 184, 1)',
              }}
              transition={{
                duration: isCurrent ? 1 : 0.3,
                repeat: isCurrent ? Infinity : 0,
              }}
            >
              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  ✓
                </motion.span>
              ) : isCurrent ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ○
                </motion.span>
              ) : (
                <span>○</span>
              )}
            </motion.div>

            {/* Step Label */}
            <span
              className={`text-sm font-medium transition-colors ${
                isCompleted
                  ? 'text-emerald-400'
                  : isCurrent
                    ? 'text-white'
                    : 'text-gray-500'
              }`}
            >
              {step}
            </span>

            {/* Current Step Glow */}
            {isCurrent && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-emerald-500/10 -z-10"
                animate={{
                  boxShadow: [
                    'inset 0 0 10px rgba(22, 224, 181, 0.2)',
                    'inset 0 0 20px rgba(22, 224, 181, 0.4)',
                    'inset 0 0 10px rgba(22, 224, 181, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
