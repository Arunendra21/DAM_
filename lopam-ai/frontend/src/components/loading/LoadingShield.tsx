'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingShieldProps {
  progress: number
}

export function LoadingShield({ progress }: LoadingShieldProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([])

  useEffect(() => {
    // Generate particle positions
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      x: Math.cos((i / 12) * Math.PI * 2) * 40,
      y: Math.sin((i / 12) * Math.PI * 2) * 40,
      angle: (i / 12) * Math.PI * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.div
      className="relative w-full h-full"
      animate={{
        scale: progress > 95 ? [1, 1.1, 1.05] : 1,
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Outer rotating ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="1"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(22,224,181,0.8)" />
            <stop offset="100%" stopColor="rgba(0,255,195,0.4)" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Main Shield Shape */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Shield background */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(22,224,181,0.2)" />
            <stop offset="100%" stopColor="rgba(0,255,195,0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield outline */}
        <path
          d="M 50 10 L 85 30 L 85 55 Q 50 85 50 85 Q 15 85 15 55 L 15 30 Z"
          fill="url(#shieldGradient)"
          stroke="url(#shieldGradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Lock icon inside shield */}
        <motion.g
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="40" y="35" width="20" height="20" rx="4" fill="none" stroke="rgba(22,224,181,0.8)" strokeWidth="1.5" />
          <path d="M 45 35 L 45 30 Q 45 25 50 25 Q 55 25 55 30 L 55 35" fill="none" stroke="rgba(22,224,181,0.8)" strokeWidth="1.5" />
          <circle cx="50" cy="48" r="2" fill="rgba(22,224,181,0.8)" />
        </motion.g>
      </motion.svg>

      {/* Particles around shield */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-emerald-400"
          animate={{
            x: Math.cos(particle.angle) * 60 + (progress / 100) * 10,
            y: Math.sin(particle.angle) * 60 + (progress / 100) * 10,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.id * 0.1,
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Scanning rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute inset-0 rounded-full border border-emerald-500/30"
          animate={{
            scale: [0.5, 2],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Progress glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, rgba(22,224,181,0.3) 0deg, rgba(22,224,181,0.1) ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
        }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          boxShadow: [
            '0 0 20px rgba(22,224,181,0.3)',
            '0 0 40px rgba(22,224,181,0.5)',
            '0 0 20px rgba(22,224,181,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}
