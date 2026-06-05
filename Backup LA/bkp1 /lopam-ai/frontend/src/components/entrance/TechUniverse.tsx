'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function TechUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let time = 0

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['rgba(96, 165, 250, ', 'rgba(34, 197, 238, ', 'rgba(59, 130, 246, '][
          Math.floor(Math.random() * 3)
        ],
      })
    }

    const animate = () => {
      time += 0.005

      // Clear with semi-transparent background for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw neural network nodes
      ctx.fillStyle = 'rgba(96, 165, 250, 0.15)'
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1)
        const y = (canvas.height / 4) * (1 + Math.sin(time * 0.5 + i) * 0.2)
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connecting lines between nodes
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1

      for (let i = 0; i < 7; i++) {
        const x1 = (canvas.width / 9) * (i + 1)
        const y1 = (canvas.height / 4) * (1 + Math.sin(time * 0.5 + i) * 0.2)
        const x2 = (canvas.width / 9) * (i + 2)
        const y2 = (canvas.height / 4) * (1 + Math.sin(time * 0.5 + i + 1) * 0.2)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Draw flowing data paths
      ctx.strokeStyle = 'rgba(34, 197, 238, 0.2)'
      ctx.lineWidth = 2

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let j = 0; j < 50; j++) {
          const x = (canvas.width / 50) * j
          const y = (canvas.height / 3) * (i + 1) + Math.sin(time * 0.8 + j * 0.1 + i) * 30
          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = `${particle.color}${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw holographic grid
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.05)'
      ctx.lineWidth = 1

      const gridSize = 100
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i + Math.sin(time * 0.3) * 10, 0)
        ctx.lineTo(i + Math.sin(time * 0.3) * 10, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, i + Math.cos(time * 0.3) * 10)
        ctx.lineTo(canvas.width, i + Math.cos(time * 0.3) * 10)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Floating holographic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-48 rounded-full border-2 border-blue-400/10"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + (i % 2) * 50}%`,
              background: `radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: 360,
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-slate-900/20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    </>
  )
}
