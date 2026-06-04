'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FuturisticProgressProps {
  progress: number
}

interface EnergyNode {
  id: number
  angle: number
}

export function FuturisticProgress({ progress }: FuturisticProgressProps) {
  const [energyNodes, setEnergyNodes] = useState<EnergyNode[]>([])

  useEffect(() => {
    const nodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * Math.PI * 2,
    }))
    setEnergyNodes(nodes)
  }, [])

  return (
    <motion.div
      className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 10 ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Circular energy rings */}
      <div className="relative w-32 h-32">
        {/* Outer energy ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderRightColor: 'rgba(96, 165, 250, 0.8)',
            borderTopColor: 'rgba(96, 165, 250, 0.4)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Middle energy ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-transparent"
          style={{
            borderLeftColor: 'rgba(34, 197, 238, 0.8)',
            borderBottomColor: 'rgba(34, 197, 238, 0.4)',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner energy ring */}
        <motion.div
          className="absolute inset-4 rounded-full border border-transparent"
          style={{
            borderTopColor: 'rgba(59, 130, 246, 0.8)',
            borderRightColor: 'rgba(59, 130, 246, 0.4)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Orbiting progress nodes */}
        {energyNodes.map((node) => {
          const isActive = (node.id / 12) * 100 <= progress
          return (
            <motion.div
              key={node.id}
              className={`absolute w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-blue-400/30'}`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
              }}
              animate={{
                x: Math.cos(node.angle) * 60,
                y: Math.sin(node.angle) * 60,
                boxShadow: isActive
                  ? [
                      '0 0 10px rgba(34, 197, 238, 0.5)',
                      '0 0 20px rgba(34, 197, 238, 0.8)',
                      '0 0 10px rgba(34, 197, 238, 0.5)',
                    ]
                  : '0 0 5px rgba(96, 165, 250, 0.3)',
                scale: isActive ? [1, 1.3, 1] : 0.8,
              }}
              transition={{
                duration: isActive ? 1.5 : 0.6,
                repeat: isActive ? Infinity : 0,
              }}
            />
          )
        })}

        {/* Center percentage */}
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              animate={{
                textShadow: [
                  '0 0 10px rgba(96, 165, 250, 0.3)',
                  '0 0 20px rgba(96, 165, 250, 0.6)',
                  '0 0 10px rgba(96, 165, 250, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.floor(progress)}%
            </motion.div>
            <div className="text-xs text-gray-400 mt-1">SYNCHRONIZING</div>
          </div>
        </motion.div>
      </div>

      {/* Accumulation visualization */}
      <div className="flex gap-1">
        {[...Array(20)].map((_, i) => {
          const isAccumulated = (i / 20) * 100 <= progress
          return (
            <motion.div
              key={i}
              className={`h-1 ${isAccumulated ? 'bg-cyan-400' : 'bg-blue-400/20'} rounded-full`}
              animate={{
                width: isAccumulated ? 8 : 4,
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
