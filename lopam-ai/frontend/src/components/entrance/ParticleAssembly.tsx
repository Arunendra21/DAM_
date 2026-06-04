'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  initialX: number
  initialY: number
  finalX: number
  finalY: number
  size: number
  delay: number
}

interface ParticleAssemblyProps {
  progress: number
}

const PARTICLE_COUNT = 60

export function ParticleAssembly({ progress }: ParticleAssemblyProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.random() * Math.PI * 2)
      const distance = Math.random() * 300 + 100

      newParticles.push({
        id: i,
        initialX: Math.cos(angle) * distance,
        initialY: Math.sin(angle) * distance,
        finalX: Math.cos(angle) * (60 + Math.random() * 80),
        finalY: Math.sin(angle) * (60 + Math.random() * 80),
        size: Math.random() * 3 + 1,
        delay: (i / PARTICLE_COUNT) * 1.5,
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            background: 'rgba(96, 165, 250, 0.8)',
            boxShadow: '0 0 10px rgba(96, 165, 250, 0.6)',
          }}
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            opacity: 0,
          }}
          animate={{
            x: particle.finalX,
            y: particle.finalY,
            opacity: progress > 20 ? [0, 1, 1] : 0,
            scale: progress > 20 ? 1 : 0,
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Connecting lines between particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
        <defs>
          <linearGradient id="particle-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 197, 238, 0.2)" />
          </linearGradient>
        </defs>
        {particles.slice(0, Math.floor(PARTICLE_COUNT * (progress / 100))).map((particle, idx) => {
          if (idx === 0) return null
          const nextParticle = particles[idx - 1]
          return (
            <motion.line
              key={`line-${particle.id}`}
              x1={nextParticle.finalX}
              y1={nextParticle.finalY}
              x2={particle.finalX}
              y2={particle.finalY}
              stroke="url(#particle-line)"
              strokeWidth="0.5"
              style={{ opacity: progress > 30 ? 0.4 : 0 }}
            />
          )
        })}
      </svg>
    </>
  )
}
