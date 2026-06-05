'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { pricingPlans } from '@/data/pricing'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

export function PricingSection() {
  return (
    <section className="section-container bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that fits your enterprise needs. All plans include 24/7 support.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={plan.id} variants={staggerItem}>
              <Card
                className={`h-full flex flex-col transition-all duration-300 ${
                  plan.featured
                    ? 'border-primary/50 shadow-2xl dark:shadow-primary/20 scale-105'
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.featured && (
                  <div className="px-4 py-2 text-sm font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-t-lg mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-4 font-medium">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.price === 'Custom' ? (
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      Custom
                    </p>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${plan.price}/mo
                      </p>
                      {plan.billingInfo && (
                        <p className="text-xs text-slate-600 dark:text-gray-300 mt-1">
                          {plan.billingInfo}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold mb-6 transition-colors duration-300 ${
                    plan.featured
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'border border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                      <span className="text-slate-700 dark:text-gray-200 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-12 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20 dark:border-primary/10"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            All Plans Include
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              '24/7 Priority Support',
              'Real-time Monitoring',
              'Compliance Reports',
              'API Access',
              'Session Recording',
              'Alert System',
              'SIEM Integration',
              'Custom Dashboards',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-primary font-bold text-lg">✓</span>
                <span className="text-slate-700 dark:text-gray-200 font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
