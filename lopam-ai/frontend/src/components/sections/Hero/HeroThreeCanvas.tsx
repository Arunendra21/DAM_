'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function HeroThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 12
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Particles
    const particleCount = 3000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 30
      positions[i + 2] = (Math.random() - 0.5) * 30

      velocities[i] = (Math.random() - 0.5) * 0.05
      velocities[i + 1] = Math.random() * 0.02 + 0.01
      velocities[i + 2] = (Math.random() - 0.5) * 0.05
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const material = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x10b981, 1)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Update particles
      const positions = geometry.attributes.position.array as Float32Array
      const velocities = geometry.attributes.velocity.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Wrap around
        if (positions[i] > 15) {
          positions[i] = -15
          positions[i + 1] = (Math.random() - 0.5) * 30
        }
        if (positions[i] < -15) {
          positions[i] = 15
          positions[i + 1] = (Math.random() - 0.5) * 30
        }
        if (positions[i + 1] > 15) positions[i + 1] = -15
        if (positions[i + 2] > 15) positions[i + 2] = -15
        if (positions[i + 2] < -15) positions[i + 2] = 15
      }

      geometry.attributes.position.needsUpdate = true

      // Rotate particles
      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [mounted])

  return <div ref={containerRef} className="fixed inset-0 -z-10 top-20" />
}
