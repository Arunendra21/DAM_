'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { solutions } from '@/data/solutions'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

export function SolutionsPreview() {
  const featured = solutions.slice(0, 3)

  return (
    <section className="section-container bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Industry-Specific Solutions</h2>
          <p className="section-subtitle">
            Tailored security platforms for your industry&apos;s unique compliance requirements
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {featured.map((solution) => (
            <motion.div key={solution.id} variants={staggerItem}>
              <Link href={`/solutions/${solution.id}`}>
                <Card className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{solution.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                      {solution.name}
                    </h3>
                  </div>

                  <p className="text-slate-700 dark:text-gray-200 font-medium mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                      Compliance Requirements:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.complianceRequirements.slice(0, 3).map((req, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 dark:bg-primary/20 rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-primary font-bold group-hover:translate-x-2 transition-transform duration-300">
                    Learn More →
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-slate-200 dark:border-slate-700"
        >
          <p className="text-slate-700 dark:text-gray-200 font-medium mb-6">
            Plus solutions for Telecom and SaaS industries
          </p>
          <Link href="/solutions">
            <button className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Explore All Solutions
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
