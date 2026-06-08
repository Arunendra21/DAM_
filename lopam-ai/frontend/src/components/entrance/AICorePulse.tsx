'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AICorePulseProps {
  progress: number
  isRevealing: boolean
}

export function AICorePulse({ isRevealing }: AICorePulseProps) {
  const [dataStreams, setDataStreams] = useState<Array<{ id: number; angle: number }>>([])

  useEffect(() => {
    // Generate data streams orbiting the core
    const streams = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
    }))
    setDataStreams(streams)
  }, [])

  return (
    <motion.div
      className="relative w-64 h-64 lg:w-80 lg:h-80 mb-16"
      animate={{
        scale: isRevealing ? [1, 1.5, 0.1] : 1,
        opacity: isRevealing ? [1, 1, 0] : 1,
      }}
      transition={{
        duration: isRevealing ? 1.2 : 0.6,
        ease: 'easeInOut',
      }}
    >
      {/* Outer rotating rings */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={`ring-${ring}`}
          className="absolute inset-0 rounded-full border border-blue-400/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + ring * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            scale: 1 - ring * 0.15,
          }}
        />
      ))}

      {/* Data streams orbiting */}
      {dataStreams.map((stream) => (
        <motion.div
          key={`stream-${stream.id}`}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          animate={{
            x: Math.cos(stream.angle) * 120,
            y: Math.sin(stream.angle) * 120,
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: stream.id * 0.15,
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Inner pulsing core */}
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bright core center */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-blue-200 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 30px rgba(96, 165, 250, 0.5), inset 0 0 30px rgba(96, 165, 250, 0.3)',
            '0 0 60px rgba(96, 165, 250, 0.8), inset 0 0 40px rgba(96, 165, 250, 0.5)',
            '0 0 30px rgba(96, 165, 250, 0.5), inset 0 0 30px rgba(96, 165, 250, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Inner rotating elements */}
        <motion.div
          className="absolute w-32 h-32 lg:w-40 lg:h-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* AI symbol - interconnected nodes */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2
            const x = Math.round(Math.cos(angle) * 50 * 1000) / 1000
            const y = Math.round(Math.sin(angle) * 50 * 1000) / 1000
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute w-3 h-3 rounded-full bg-white"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            )
          })}
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Energy emission rays */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        // Round to a fixed precision so the server- and client-rendered SVG
        // coordinates are byte-identical (avoids float hydration mismatches).
        const x2 = Math.round(Math.cos(angle) * 140 * 1000) / 1000
        const y2 = Math.round(Math.sin(angle) * 140 * 1000) / 1000

        return (
          <svg
            key={`ray-${i}`}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 256 256"
            style={{ opacity: 0.6 }}
          >
            <motion.line
              x1="128"
              y1="128"
              x2={128 + x2}
              y2={128 + y2}
              stroke="url(#grad-ray)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            <defs>
              <linearGradient id="grad-ray" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 1)" />
                <stop offset="100%" stopColor="rgba(34, 197, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>
        )
      })}
    </motion.div>
  )
}
