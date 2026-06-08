'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

const testimonials = [
  {
    quote:
      'Lopam DAM has been a game-changer for our security posture. The real-time threat detection caught a breach attempt within minutes.',
    author: 'Sarah Chen',
    role: 'Chief Security Officer',
    company: 'Fortune 500 Bank',
    rating: 5,
  },
  {
    quote:
      'The compliance automation alone has saved us countless hours. GDPR and SOX compliance is now seamless and automated.',
    author: 'Michael Rodriguez',
    role: 'Compliance Manager',
    company: 'Healthcare Corp',
    rating: 5,
  },
  {
    quote:
      "The dashboard is intuitive and the support team is incredibly responsive. Lopam DAM is enterprise-grade security done right.",
    author: 'Jennifer Park',
    role: 'VP of Engineering',
    company: 'Tech Giant',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Trusted by Enterprise Leaders</h2>
          <p className="section-subtitle">See what Fortune 500 companies are saying about Lopam DAM</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={staggerItem}>
              <GlassCard>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-gray-200 mb-6 italic font-semibold">&ldquo;{testimonial.quote}&rdquo;</p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-300 dark:border-surface-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-300 font-bold">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.company}</p>
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
