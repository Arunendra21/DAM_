'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Users, Sparkles } from 'lucide-react'
import { CustomCursor } from '@/components/cursors/CustomCursor'

export default function AuthPortalSelection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #031028 50%, #020617 100%)',
      }}
    >
      <CustomCursor />

      {/* Animated background with particles and grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#16E0B5' : i % 3 === 1 ? '#00FFC3' : '#36E4DA',
              opacity: 0.15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.25, 0.05],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Glowing squares */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute w-32 h-32 border"
            style={{
              borderColor: 'rgba(22,224,181,0.1)',
              left: `${(i % 4) * 25 + Math.random() * 10}%`,
              top: `${Math.floor(i / 4) * 50 + Math.random() * 10}%`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Radial gradient overlays */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(22,224,181,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,195,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(22,224,181,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Header with Gradient Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-8 h-8" style={{ color: '#16E0B5' }} />
            <span
              className="text-sm font-bold tracking-wider"
              style={{ color: '#16E0B5' }}
            >
              ENTERPRISE PLATFORM
            </span>
          </motion.div>

          <h1
            className="text-6xl sm:text-7xl font-black mb-4 leading-tight"
            style={{
              background: 'linear-gradient(90deg, #FFFFFF 0%, #16E0B5 50%, #00FFC3 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(22,224,181,0.3)',
            }}
          >
            Database Access<br />Management
          </h1>

          <p
            className="text-lg sm:text-xl font-medium mt-6"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Secure, Enterprise-Grade Access Control
          </p>

          <p
            className="text-sm mt-2"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Choose your portal to access the DAM platform
          </p>
        </motion.div>

        {/* Portal Selection Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Admin Portal Card */}
          <Link href="/auth/admin/login">
            <motion.div
              className="group relative overflow-hidden rounded-3xl p-8 sm:p-12 cursor-pointer h-full border transition-all duration-300"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 0 40px rgba(22,224,181,0.25)',
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.85) 100%)',
                border: '1px solid rgba(22,224,181,0.15)',
                boxShadow: '0 0 25px rgba(22,224,181,0.08), inset 0 0 20px rgba(22,224,181,0.02)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(22,224,181,0.15) 0%, transparent 70%)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Icon */}
                <motion.div
                  className="mb-6 p-4 rounded-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(22,224,181,0.2) 0%, rgba(0,217,255,0.1) 100%)',
                    border: '1px solid rgba(22,224,181,0.2)',
                    boxShadow: '0 0 20px rgba(22,224,181,0.15)',
                  }}
                >
                  <Shield className="w-12 h-12" style={{ color: '#16E0B5' }} />
                </motion.div>

                {/* Text */}
                <h2 className="text-3xl font-bold text-white mb-3 text-center">Admin Portal</h2>
                <p
                  className="text-center text-sm mb-8 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  For administrators and security teams. Manage databases, users, and security policies with enterprise-grade controls.
                </p>

                {/* Badge */}
                <motion.div
                  className="px-4 py-2 rounded-full text-xs font-bold mb-6"
                  style={{
                    background: 'rgba(22,224,181,0.1)',
                    color: '#16E0B5',
                    border: '1px solid rgba(22,224,181,0.2)',
                  }}
                >
                  SUPER ADMIN • SECURITY ADMIN • DBA • AUDITOR
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="pt-6 border-t w-full"
                  style={{ borderColor: 'rgba(22,224,181,0.15)' }}
                >
                  <div
                    className="text-center font-semibold group-hover:translate-x-1 transition-transform"
                    style={{ color: '#16E0B5' }}
                  >
                    Get Started →
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* User Portal Card */}
          <Link href="/auth/user/login">
            <motion.div
              className="group relative overflow-hidden rounded-3xl p-8 sm:p-12 cursor-pointer h-full border transition-all duration-300"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 0 40px rgba(0,255,195,0.25)',
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.85) 100%)',
                border: '1px solid rgba(0,255,195,0.15)',
                boxShadow: '0 0 25px rgba(0,255,195,0.08), inset 0 0 20px rgba(0,255,195,0.02)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,255,195,0.15) 0%, transparent 70%)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Icon */}
                <motion.div
                  className="mb-6 p-4 rounded-2xl"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,255,195,0.2) 0%, rgba(54,228,218,0.1) 100%)',
                    border: '1px solid rgba(0,255,195,0.2)',
                    boxShadow: '0 0 20px rgba(0,255,195,0.15)',
                  }}
                >
                  <Users className="w-12 h-12" style={{ color: '#00FFC3' }} />
                </motion.div>

                {/* Text */}
                <h2 className="text-3xl font-bold text-white mb-3 text-center">User Portal</h2>
                <p
                  className="text-center text-sm mb-8 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  For regular users. Request database access, view approvals, and manage your secure database connections.
                </p>

                {/* Badge */}
                <motion.div
                  className="px-4 py-2 rounded-full text-xs font-bold mb-6"
                  style={{
                    background: 'rgba(0,255,195,0.1)',
                    color: '#00FFC3',
                    border: '1px solid rgba(0,255,195,0.2)',
                  }}
                >
                  USER • OPERATOR • VIEWER
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="pt-6 border-t w-full"
                  style={{ borderColor: 'rgba(0,255,195,0.15)' }}
                >
                  <div
                    className="text-center font-semibold group-hover:translate-x-1 transition-transform"
                    style={{ color: '#00FFC3' }}
                  >
                    Get Started →
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="text-sm font-medium transition-all duration-300 flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#16E0B5')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            ← Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
