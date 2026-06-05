'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from './CursorContext'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const { variant } = useCursor()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  const getCursorStyle = () => {
    switch (variant) {
      case 'button':
        return {
          scale: 1.8,
          borderColor: '#10B981',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
        }
      case 'card':
        return {
          scale: 1.5,
          borderColor: '#34D399',
          boxShadow: '0 0 15px rgba(52, 211, 153, 0.4)',
        }
      case 'link':
        return {
          scale: 1.3,
          borderColor: '#0EA5E9',
          boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)',
        }
      default:
        return {
          scale: 1,
          borderColor: 'rgba(16, 185, 129, 0.5)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
        }
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute w-10 h-10 rounded-full border-2"
        animate={{
          scale: getCursorStyle().scale,
          borderColor: getCursorStyle().borderColor,
          boxShadow: getCursorStyle().boxShadow,
        }}
        transition={{ duration: 0.2 }}
        style={{
          left: '-20px',
          top: '-20px',
        }}
      />

      {/* Inner dot */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-primary" style={{ left: '-3px', top: '-3px' }} />
    </motion.div>
  )
}
