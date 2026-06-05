'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

export function PlatformOverview() {
  const capabilities = [
    {
      title: 'Real-time Monitoring',
      description: 'Monitor every database query in real-time with millisecond precision',
      icon: '⚡',
      metrics: '10B+ events/day',
    },
    {
      title: 'AI-Powered Threats',
      description: 'Detect threats using advanced machine learning algorithms',
      icon: '🤖',
      metrics: '99.9% accuracy',
    },
    {
      title: 'Compliance Automation',
      description: 'Automated reports for PCI-DSS, HIPAA, GDPR, SOX, and more',
      icon: '✅',
      metrics: '15+ frameworks',
    },
    {
      title: 'Access Control',
      description: 'Privileged access management with zero-trust principles',
      icon: '🔐',
      metrics: '100% audit trail',
    },
    {
      title: 'Session Recording',
      description: 'Full session playback for investigation and forensics',
      icon: '📹',
      metrics: 'Unlimited storage',
    },
    {
      title: 'SIEM Integration',
      description: 'Integrate with Splunk, ELK, QRadar, and 10+ SIEM platforms',
      icon: '🔗',
      metrics: '10+ integrations',
    },
  ]

  return (
    <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Enterprise-Grade Platform</h2>
          <p className="section-subtitle">
            Complete database security solution with real-time monitoring, threat detection, and compliance automation
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((capability) => (
            <motion.div key={capability.title} variants={staggerItem}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{capability.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {capability.title}
                </h3>
                <p className="text-slate-700 dark:text-gray-200 mb-4 font-medium">
                  {capability.description}
                </p>
                <p className="text-sm font-bold text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                  {capability.metrics}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 border border-primary/20 dark:border-primary/10"
        >
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Why Choose Lopam AI?
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Deployed in 50+ enterprises',
              '99.99% uptime SLA',
              'Zero-trust architecture',
              'Multi-cloud support',
              'Instant onboarding',
              'Expert support team',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-800 dark:text-gray-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
