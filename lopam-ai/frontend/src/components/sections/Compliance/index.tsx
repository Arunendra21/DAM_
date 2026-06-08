'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/Card'
import { CheckCircle } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

const frameworks = [
  {
    name: 'SOX',
    description: 'Sarbanes-Oxley Act',
    compliance: 96,
    controls: ['Access Control', 'Audit Logging', 'Data Retention'],
  },
  {
    name: 'GDPR',
    description: 'General Data Protection',
    compliance: 94,
    controls: ['Data Processing', 'Privacy Rights', 'Breach Notification'],
  },
  {
    name: 'HIPAA',
    description: 'Health Insurance Portability',
    compliance: 98,
    controls: ['PHI Protection', 'Access Logs', 'Encryption'],
  },
  {
    name: 'PCI-DSS',
    description: 'Payment Card Industry',
    compliance: 97,
    controls: ['Card Data Security', 'Network Segmentation', 'Monitoring'],
  },
  {
    name: 'DPDP',
    description: 'Digital Personal Data Protection',
    compliance: 95,
    controls: ['Consent Management', 'Data Principal Rights', 'Breach Reporting'],
  },
]

export function Compliance() {
  return (
    <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Compliance & Audit</h2>
          <p className="section-subtitle">Meet regulatory requirements with automated compliance reporting</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {frameworks.map((framework) => (
            <motion.div key={framework.name} variants={staggerItem}>
              <GlassCard className="h-full flex flex-col bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{framework.name}</h3>
                <p className="text-sm text-slate-700 dark:text-gray-200 mb-4 font-medium">{framework.description}</p>

                {/* Compliance Ring */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-300 dark:text-surface-border" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${(framework.compliance / 100) * 283} 283`}
                      className="text-primary"
                      initial={{ strokeDasharray: '0 283' }}
                      whileInView={{ strokeDasharray: `${(framework.compliance / 100) * 283} 283` }}
                      transition={{ duration: 1.5 }}
                      style={{ transformOrigin: '50px 50px', transform: 'rotate(-90deg)' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{framework.compliance}%</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-2 flex-1">
                  {framework.controls.map((control) => (
                    <div key={control} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      <span className="text-slate-700 dark:text-gray-200 font-medium">{control}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
