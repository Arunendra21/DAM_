'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/Card'
import { Database, AlertTriangle, CheckCircle, Search, Activity, Zap } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

const features = [
  {
    icon: Database,
    title: 'Database Activity Monitoring',
    description: 'Real-time monitoring of all database queries, transactions, and operations',
  },
  {
    icon: AlertTriangle,
    title: 'Real-Time Threat Detection',
    description: 'AI-powered anomaly detection catches suspicious patterns instantly',
  },
  {
    icon: CheckCircle,
    title: 'Compliance Automation',
    description: 'Automated compliance with SOX, GDPR, HIPAA, PCI-DSS, and ISO 27001',
  },
  {
    icon: Search,
    title: 'Data Discovery',
    description: 'Comprehensive data classification and discovery across all databases',
  },
  {
    icon: Activity,
    title: 'User Activity Monitoring',
    description: 'Track and audit all user actions with detailed forensic capabilities',
  },
  {
    icon: Zap,
    title: 'AI-Powered Alerts',
    description: 'Intelligent alerting system with context-aware threat assessment',
  },
]

export function CoreFeatures() {
  return (
    <section id="features" className="section-container">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Enterprise-Grade Security Features</h2>
          <p className="section-subtitle">Comprehensive database protection designed for Fortune 500 enterprises</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-slate-700 dark:text-gray-200 font-semibold">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
