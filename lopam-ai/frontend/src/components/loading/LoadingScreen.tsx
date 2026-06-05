'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LoadingBackground } from './LoadingBackground'
import { LoadingShield } from './LoadingShield'
import { LoadingProgressBar } from './LoadingProgressBar'
import { LoadingSequence } from './LoadingSequence'
import { LoadingMetrics } from './LoadingMetrics'
import { useRouter } from 'next/navigation'

const LOADING_STEPS = [
  'Initializing Secure Environment',
  'Scanning Connected Databases',
  'Validating Access Policies',
  'Checking User Permissions',
  'Monitoring Database Activity',
  'Applying Security Controls',
  'Establishing Secure Session',
  'Loading Dashboard',
]

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        const increment = Math.random() * 8 + 2
        return Math.min(prev + increment, 100)
      })
    }, 400)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    // Update current step based on progress
    const step = Math.floor((progress / 100) * LOADING_STEPS.length)
    setCurrentStep(Math.min(step, LOADING_STEPS.length - 1))

    // When progress reaches 100%, immediately trigger exit and redirect
    if (progress >= 100 && !isExiting) {
      setIsExiting(true)
      // Brief delay for final animation frame, then redirect immediately
      setTimeout(() => {
        router.push('/dashboard')
      }, 600)
    }
  }, [progress, router, isExiting])

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden bg-black dark:bg-slate-950"
      animate={{
        opacity: isExiting ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Animated Background */}
      <LoadingBackground />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 dark:from-black/60 dark:via-black/70 dark:to-black/80" />

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-screen">
            {/* Left Panel - Security Events */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[
                  { label: 'Database Discovery', status: 'active' },
                  { label: 'Policy Validation', status: 'active' },
                  { label: 'Threat Scanning', status: 'active' },
                  { label: 'Encryption Check', status: 'pending' },
                  { label: 'Access Audit', status: 'pending' },
                ].map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-3 rounded-lg border backdrop-blur-sm ${
                      event.status === 'active'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {event.status === 'active' && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-400"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <span className="text-sm font-medium">{event.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center - Main Loading Animation */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo/Branding */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
                  DAM Security Platform
                </h1>
                <p className="text-gray-300 text-sm lg:text-base">
                  Enterprise Database Access Management & Monitoring
                </p>
                <p className="text-emerald-400 text-xs lg:text-sm mt-2 font-semibold">
                  Securing Data. Monitoring Access. Enforcing Trust.
                </p>
              </motion.div>

              {/* Shield Animation */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <LoadingShield progress={progress} />
              </div>

              {/* Loading Sequence */}
              <LoadingSequence currentStep={currentStep} steps={LOADING_STEPS} />

              {/* Progress Bar */}
              <LoadingProgressBar progress={progress} />
            </motion.div>

            {/* Right Panel - Live Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block"
            >
              <LoadingMetrics progress={progress} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
