'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface CursorState {
  x: number
  y: number
  targetX: number
  targetY: number
  clickPulse: number
}

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    clickPulse: 0,
  })

  const animationFrameRef = useRef<number | null>(null)

  // Check if cursor should be disabled
  const shouldDisableCursor = () => {
    if (typeof window === 'undefined') return true
    if (window.matchMedia('(pointer:coarse)').matches) return true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    return false
  }

  // Perform animation loop with requestAnimationFrame
  const updateCursor = () => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const state = stateRef.current

    if (!cursor || !follower) {
      animationFrameRef.current = requestAnimationFrame(updateCursor)
      return
    }

    // Smooth easing for follower
    const easeX = (state.targetX - state.x) * 0.15
    const easeY = (state.targetY - state.y) * 0.15

    state.x += easeX
    state.y += easeY

    // Update main cursor with GPU-accelerated transform
    cursor.style.transform = `translate3d(${state.targetX - 12}px, ${state.targetY - 12}px, 0)`

    // Update follower with eased position
    follower.style.transform = `translate3d(${state.x - 20}px, ${state.y - 20}px, 0)`

    // Update click pulse
    if (state.clickPulse > 0) {
      state.clickPulse -= 0.08
      const pulseScale = 1 + state.clickPulse * 0.3
      cursor.style.setProperty('--pulse-scale', pulseScale.toString())
    }

    animationFrameRef.current = requestAnimationFrame(updateCursor)
  }

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    stateRef.current.targetX = e.clientX
    stateRef.current.targetY = e.clientY
    if (!isActive) setIsActive(true)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsActive(false)
  }

  // Handle hover on interactive elements
  const handleElementHover = (e: Event) => {
    const mouseEvent = e as PointerEvent
    const target = mouseEvent.target as HTMLElement

    // Safely check if target is an Element before using closest
    if (!target || typeof target.closest !== 'function') {
      return
    }

    const isInteractive =
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('[role="link"]') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select') ||
      target.closest('[data-interactive]')

    if (isInteractive && mouseEvent.type === 'pointerenter') {
      setIsHovering(true)
    } else if (mouseEvent.type === 'pointerleave') {
      setIsHovering(false)
    }
  }

  // Handle click animation
  const handleClick = () => {
    stateRef.current.clickPulse = 1
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Check if cursor should be enabled
    const disabled = shouldDisableCursor()
    setIsEnabled(!disabled)

    if (disabled) {
      return
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateCursor)

    // Add event listeners with passive flags for performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('pointerenter', handleElementHover as EventListener, {
      passive: true,
      capture: true,
    })
    document.addEventListener('pointerleave', handleElementHover as EventListener, {
      passive: true,
      capture: true,
    })
    document.addEventListener('click', handleClick, { passive: true })

    // Hide system cursor
    document.documentElement.style.cursor = 'none'

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('pointerenter', handleElementHover as EventListener, true)
      document.removeEventListener('pointerleave', handleElementHover as EventListener, true)
      document.removeEventListener('click', handleClick)
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  if (!isEnabled || !isMounted) {
    return null
  }

  const cursorContent = (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[999999] transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'brightness-150' : 'brightness-100'}`}
        style={{
          width: '24px',
          height: '24px',
          willChange: 'transform',
          '--pulse-scale': '1',
        } as React.CSSProperties & Record<string, string>}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.8))',
            transform: 'scale(var(--pulse-scale))',
            transformOrigin: 'center',
          }}
        >
          {/* Outer Ring */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#00FF88"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Middle Ring */}
          <circle
            cx="12"
            cy="12"
            r="7"
            stroke="#00FFDD"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Inner Ring */}
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="#00FF88"
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* Center Dot */}
          <circle cx="12" cy="12" r="2" fill="#00FF88" />

          {/* Targeting Crosshairs */}
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="4"
            stroke="#00FF88"
            strokeWidth="1"
            opacity="0.9"
          />
          <line
            x1="12"
            y1="20"
            x2="12"
            y2="23"
            stroke="#00FF88"
            strokeWidth="1"
            opacity="0.9"
          />
          <line
            x1="1"
            y1="12"
            x2="4"
            y2="12"
            stroke="#00FF88"
            strokeWidth="1"
            opacity="0.9"
          />
          <line
            x1="20"
            y1="12"
            x2="23"
            y2="12"
            stroke="#00FF88"
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Security Shield Indicator - subtle */}
          <path
            d="M12 4L8 6V11C8 14.5 12 17 12 17C12 17 16 14.5 16 11V6L12 4Z"
            stroke="#00FFDD"
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
          />

          {/* Accent dots */}
          <circle cx="12" cy="3" r="0.5" fill="#00FF88" opacity="0.7" />
          <circle cx="12" cy="21" r="0.5" fill="#00FF88" opacity="0.7" />
          <circle cx="3" cy="12" r="0.5" fill="#00FF88" opacity="0.7" />
          <circle cx="21" cy="12" r="0.5" fill="#00FF88" opacity="0.7" />
        </svg>
      </div>

      {/* Follower Ring - Larger Outer Ring */}
      <div
        ref={followerRef}
        className={`pointer-events-none fixed top-0 left-0 z-[999998] transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'brightness-200' : 'brightness-100'}`}
        style={{
          width: '40px',
          height: '40px',
          willChange: 'transform',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(0, 255, 221, 0.5))',
            animation: 'spin-slow 6s linear infinite',
          }}
        >
          {/* Outer Radar Ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#00FFDD"
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Radar Sweep Lines */}
          <line
            x1="20"
            y1="2"
            x2="20"
            y2="8"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="34.64"
            y1="5.36"
            x2="31.21"
            y2="8.79"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="38"
            y1="20"
            x2="32"
            y2="20"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="34.64"
            y1="34.64"
            x2="31.21"
            y2="31.21"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="20"
            y1="38"
            x2="20"
            y2="32"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="5.36"
            y1="34.64"
            x2="8.79"
            y2="31.21"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="2"
            y1="20"
            x2="8"
            y2="20"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <line
            x1="5.36"
            y1="5.36"
            x2="8.79"
            y2="8.79"
            stroke="#00FF88"
            strokeWidth="0.6"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Styles */}
      <style jsx global>{`
        /* Hide system cursor */
        html.cursor-hidden {
          cursor: none !important;
        }

        html.cursor-hidden * {
          cursor: none !important;
        }

        /* Animations */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes radar-pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        /* Smooth cursor transitions */
        @media (prefers-reduced-motion: no-preference) {
          [data-cursor] {
            transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </>
  )

  return createPortal(cursorContent, document.body)
}
