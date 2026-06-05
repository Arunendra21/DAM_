'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

const plans = [
  {
    name: 'Starter',
    description: 'For small teams',
    monthly: 999,
    features: [
      'Up to 5 databases',
      'Basic threat detection',
      'Email alerts',
      'Monthly reports',
      '30-day retention',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing enterprises',
    monthly: 2999,
    popular: true,
    features: [
      'Up to 50 databases',
      'Advanced AI detection',
      'Real-time alerts',
      'Custom compliance rules',
      'Monthly and quarterly reports',
      '90-day retention',
      'API access',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For Fortune 500',
    monthly: 9999,
    features: [
      'Unlimited databases',
      'Advanced AI + ML models',
      'Real-time alerts',
      'Custom compliance rules',
      'Custom reporting',
      '1-year retention',
      'API access',
      'Dedicated support',
      'On-premises option',
      'Custom SLA',
    ],
  },
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the perfect plan for your enterprise security needs</p>

          {/* Toggle */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <span className={`text-sm font-medium ${isAnnual ? 'text-primary' : 'text-slate-600 dark:text-gray-200'}`}>Monthly</span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-primary rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-primary' : 'text-slate-600 dark:text-gray-200'}`}>
              Annual
              <span className="ml-2 text-xs text-primary font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem}>
              <GlassCard
                className={`h-full flex flex-col ${
                  plan.popular ? 'relative ring-2 ring-primary md:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-slate-700 dark:text-gray-200 text-sm mb-6 font-medium">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-primary">
                      ${isAnnual ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly}
                    </span>
                    <span className="text-slate-600 dark:text-gray-200 text-sm font-medium">/month</span>
                    {isAnnual && (
                      <p className="text-xs text-primary mt-1 font-medium">Billed annually</p>
                    )}
                  </div>

                  <Button size="lg" className="w-full mb-8" variant={plan.popular ? 'primary' : 'secondary'}>
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-gray-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
