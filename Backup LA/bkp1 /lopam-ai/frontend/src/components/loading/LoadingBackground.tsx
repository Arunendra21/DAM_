'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function LoadingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
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
    }> = []

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(22, 224, 181, 0.05)'
      ctx.lineWidth = 1

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.fillStyle = `rgba(22, 224, 181, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw animated lines between particles
      ctx.strokeStyle = 'rgba(22, 224, 181, 0.1)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i += 10) {
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw database icons in background
      ctx.fillStyle = 'rgba(22, 224, 181, 0.08)'
      ctx.font = 'bold 40px Arial'

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const x = (canvas.width / 4) * (i + 1)
          const y = (canvas.height / 4) * (j + 1) + Math.sin(time + i + j) * 10

          ctx.fillText('◆', x, y)
        }
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
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      />

      {/* Floating Holograms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border-2 border-emerald-500/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              background: `radial-gradient(circle, rgba(22,224,181,0.1) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
    </>
  )
}
