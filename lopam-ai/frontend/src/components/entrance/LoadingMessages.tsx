'use client'

import { motion } from 'framer-motion'

interface LoadingMessagesProps {
  progress: number
}

const MESSAGES = [
  'Initializing AI Engine...',
  'Building Data Infrastructure...',
  'Connecting Cloud Services...',
  'Synchronizing Network Layers...',
  'Loading Analytics Engine...',
  'Rendering Experience...',
  'Preparing Platform...',
  'Launching Interface...',
]

export function LoadingMessages({ progress }: LoadingMessagesProps) {
  const messageIndex = Math.floor((progress / 100) * MESSAGES.length)
  const currentMessage = messageIndex < MESSAGES.length ? MESSAGES[messageIndex] : MESSAGES[MESSAGES.length - 1]

  return (
    <motion.div
      className="absolute top-1/3 left-0 right-0 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 5 ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        key={currentMessage}
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <motion.p
          className="text-lg lg:text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 tracking-wide"
          animate={{
            textShadow: [
              '0 0 20px rgba(96, 165, 250, 0.3)',
              '0 0 40px rgba(96, 165, 250, 0.6)',
              '0 0 20px rgba(96, 165, 250, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentMessage}
        </motion.p>

        {/* Typing indicator */}
        <motion.div className="flex justify-center gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
