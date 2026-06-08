'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

export function KeyBenefits() {
  const benefits = [
    {
      icon: '🛡️',
      title: 'Threat Detection',
      description: 'AI-powered detection catches threats before they impact your data',
    },
    {
      icon: '📋',
      title: 'Compliance Ready',
      description: 'Meet PCI-DSS, HIPAA, GDPR, SOX, FedRAMP, and FISMA requirements',
    },
    {
      icon: '⚡',
      title: 'Real-time Alerts',
      description: 'Instant notifications for suspicious activities and policy violations',
    },
    {
      icon: '🔐',
      title: 'Access Control',
      description: 'Privileged access management with zero-trust architecture',
    },
    {
      icon: '📊',
      title: 'Full Visibility',
      description: 'Complete audit trail of every database query and user action',
    },
    {
      icon: '🚀',
      title: 'Easy Deployment',
      description: 'Deploy in minutes without disrupting your database operations',
    },
  ]

  return (
    <section className="section-container bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Why Enterprises Choose Lopam DAM</h2>
          <p className="section-subtitle">
            Six key benefits that make us the leading database security platform
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={staggerItem}
              className="group relative p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* By the Numbers section — commented out
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            By the Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Enterprise Customers' },
              { number: '50K+', label: 'Databases Protected' },
              { number: '2.3M+', label: 'Daily Threats Detected' },
              { number: '99.99%', label: 'Uptime SLA' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-700 dark:text-gray-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        */}
      </div>
    </section>
  )
}
