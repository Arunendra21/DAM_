import * as THREE from 'three'

export class ParticleSystem {
  particles: THREE.BufferGeometry
  material: THREE.PointsMaterial
  mesh: THREE.Points
  velocities: Float32Array

  constructor(count: number = 5000) {
    const positions = new Float32Array(count * 3)
    this.velocities = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      this.velocities[i] = (Math.random() - 0.5) * 0.05
      this.velocities[i + 1] = Math.random() * 0.02 + 0.01
      this.velocities[i + 2] = (Math.random() - 0.5) * 0.05
    }

    this.particles = new THREE.BufferGeometry()
    this.particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    this.material = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    this.mesh = new THREE.Points(this.particles, this.material)
  }

  update() {
    const positions = this.particles.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += this.velocities[i]
      positions[i + 1] += this.velocities[i + 1]
      positions[i + 2] += this.velocities[i + 2]

      // Wrap around
      if (positions[i] > 10) positions[i] = -10
      if (positions[i] < -10) positions[i] = 10
      if (positions[i + 1] > 10) positions[i + 1] = -10
      if (positions[i + 2] > 10) positions[i + 2] = -10
      if (positions[i + 2] < -10) positions[i + 2] = 10
    }

    this.particles.attributes.position.needsUpdate = true
  }
}
