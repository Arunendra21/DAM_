'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AuthLayoutProps {
  children: ReactNode
  variant?: 'admin' | 'user'
}

export function AuthLayout({ children, variant = 'admin' }: AuthLayoutProps) {
  const accentColor = variant === 'admin' ? '#16E0B5' : '#00FFC3'
  const accentColorLight = variant === 'admin' ? 'rgba(22,224,181,0.3)' : 'rgba(0,255,195,0.3)'

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #031028 50%, #020617 100%)',
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: accentColor,
              opacity: 0.12,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Glow squares */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute w-40 h-40 border"
            style={{
              borderColor: 'rgba(22,224,181,0.08)',
              left: `${(i % 3) * 35 + Math.random() * 15}%`,
              top: `${Math.floor(i / 3) * 50 + Math.random() * 15}%`,
            }}
            animate={{
              opacity: [0.03, 0.12, 0.03],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Radial glow overlays */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentColorLight} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,195,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(22,224,181,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Glass Card Container */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 shadow-2xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.9) 100%)',
              border: '1px solid rgba(22,224,181,0.15)',
              boxShadow: '0 0 40px rgba(22,224,181,0.08), inset 0 0 30px rgba(22,224,181,0.02)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Inner glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at top, ${accentColorLight} 0%, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(135deg, rgba(22,224,181,0.05) 0%, transparent 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
          </div>

          {/* Bottom decorative element */}
          <motion.div
            className="mt-6 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
              opacity: 0.3,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  )
}
