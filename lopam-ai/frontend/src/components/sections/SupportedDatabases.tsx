'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

export function SupportedDatabases() {
  const databases = [
    { name: 'PostgreSQL', icon: '🐘', popular: true },
    { name: 'MySQL', icon: '🐬', popular: true },
    { name: 'Oracle Database', icon: '🏢', popular: true },
    { name: 'SQL Server', icon: '📊', popular: true },
    { name: 'MongoDB', icon: '🍃', popular: false },
    { name: 'MariaDB', icon: '🐞', popular: false },
    { name: 'Cassandra', icon: '⚙️', popular: false },
    { name: 'DynamoDB', icon: '☁️', popular: false },
    { name: 'Snowflake', icon: '❄️', popular: false },
    { name: 'BigQuery', icon: '📈', popular: false },
    { name: 'Redis', icon: '⚡', popular: false },
    { name: 'Elasticsearch', icon: '🔍', popular: false },
  ]

  return (
    <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Support for All Major Databases</h2>
          <p className="section-subtitle">
            Monitor and secure your entire database infrastructure, regardless of platform
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {databases.map((db) => (
            <motion.div
              key={db.name}
              variants={staggerItem}
              className={`group relative p-6 rounded-lg border transition-all duration-300 flex flex-col items-center justify-center ${
                db.popular
                  ? 'border-primary/50 bg-primary/5 dark:bg-primary/10 hover:border-primary hover:shadow-lg dark:hover:shadow-primary/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary/30 dark:hover:border-primary/20'
              }`}
            >
              {db.popular && (
                <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full">
                  Popular
                </div>
              )}
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {db.icon}
              </div>
              <p className="text-center text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                {db.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Don&apos;t see your database?
          </h3>
          <p className="text-slate-700 dark:text-gray-200 font-medium mb-6 max-w-2xl">
            We support custom database integrations. Contact our team to discuss your specific database platform needs and requirements.
          </p>
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  )
}
