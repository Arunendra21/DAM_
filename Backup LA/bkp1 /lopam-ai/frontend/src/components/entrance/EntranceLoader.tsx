'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AICorePulse } from './AICorePulse'
import { ParticleAssembly } from './ParticleAssembly'
import { TechUniverse } from './TechUniverse'
import { DynamicStatistics } from './DynamicStatistics'
import { LoadingMessages } from './LoadingMessages'
import { FuturisticProgress } from './FuturisticProgress'

interface EntranceLoaderProps {
  children: React.ReactNode
}

export function EntranceLoader({ children }: EntranceLoaderProps) {
  const [showLoader, setShowLoader] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    // Check if loader was already shown
    const loaderShown = sessionStorage.getItem('entrance-loader-shown')
    if (loaderShown) {
      setShowLoader(false)
      return
    }

    // Animate progress
    let progressInterval: NodeJS.Timeout
    let currentProgress = 0

    progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5
      if (currentProgress >= 95) {
        currentProgress = 95
        clearInterval(progressInterval)

        // Complete progress after delay
        setTimeout(() => {
          setProgress(100)
          setIsRevealing(true)

          // Hide loader after reveal animation
          setTimeout(() => {
            setShowLoader(false)
            sessionStorage.setItem('entrance-loader-shown', 'true')
          }, 2000)
        }, 800)
      } else {
        setProgress(currentProgress)
      }
    }, 300)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-50 w-full h-full bg-black dark:bg-slate-950 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Tech Universe Background */}
            <TechUniverse />

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              {/* AI Core Animation */}
              <AICorePulse progress={progress} isRevealing={isRevealing} />

              {/* Particle Assembly Around Core */}
              <ParticleAssembly progress={progress} />

              {/* Dynamic Statistics */}
              <DynamicStatistics progress={progress} />

              {/* Loading Messages */}
              <LoadingMessages progress={progress} />

              {/* Futuristic Progress Indicator */}
              <FuturisticProgress progress={progress} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content behind loader */}
      {children}
    </>
  )
}
