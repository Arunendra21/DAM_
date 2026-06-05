'use client'

import { motion } from 'framer-motion'

const clients = ['Fortune 500 Bank', 'Tech Giant', 'Healthcare Leader', 'Financial Corp', 'Retail Chain']

export function TrustedBy() {
  return (
    <section className="py-16 border-t border-slate-300 dark:border-surface-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-slate-700 dark:text-gray-200 mb-8 font-medium">Trusted by leading enterprises worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-sm font-bold text-slate-700 dark:text-gray-200 whitespace-nowrap"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
