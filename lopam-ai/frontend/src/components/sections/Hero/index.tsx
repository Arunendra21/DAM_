'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Shield } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/motion/variants'

const HeroThreeCanvas = dynamic(() => import('./HeroThreeCanvas').then((mod) => ({ default: mod.HeroThreeCanvas })), {
  ssr: false,
})

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Three.js Canvas Background */}
      <HeroThreeCanvas />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-black/30 dark:from-black/0 dark:via-transparent dark:to-black/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-glow-emerald dark:bg-glow-emerald-dark rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="primary" className="inline-flex font-bold bg-primary/30 dark:bg-primary/20 border-primary/60 dark:border-primary/30 text-primary-dark dark:text-primary shadow-lg">
              <Shield size={14} />
              Enterprise Security Platform
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-black mb-6 text-balance leading-tight text-slate-900 dark:text-white"
          >
            Lopam DAM
            <br />
            <span className="text-primary-dark dark:text-primary">
              Monitoring Made Simple
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl lg:text-2xl text-slate-800 dark:text-gray-200 mb-8 text-balance max-w-2xl mx-auto drop-shadow-md dark:drop-shadow-sm font-bold leading-relaxed"
          >
            Real-time threat detection, compliance automation, and intelligent data protection for enterprise databases.
          </motion.p>

          {/* CTA Buttons */}
          {/* <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary">
              Watch Demo
            </Button>
          </motion.div> */}

          {/* Trust Metric — commented out
          <motion.div
            variants={fadeInUp}
            className="mt-12 pt-8 border-t-2 border-slate-300 dark:border-surface-border flex flex-col sm:flex-row justify-center gap-8 text-sm"
          >
            {[
              { label: 'Protected Databases', value: '10,000+' },
              { label: 'Threats Blocked Daily', value: '1.2M+' },
              { label: 'Enterprise Clients', value: '500+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-black text-3xl text-primary dark:text-primary mb-2">{stat.value}</div>
                <div className="text-slate-700 dark:text-gray-200 font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          */}
        </motion.div>
      </div>
    </section>
  )
}
