'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, MapPin } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/motion/variants'

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormState({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section id="contact" className="section-container bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10" />
            <div className="relative p-8 lg:p-12 rounded-2xl">
              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Get In Touch</h2>
              <p className="text-slate-700 dark:text-gray-200 mb-8 text-lg font-semibold">
                Have questions about Lopam AI? Our team is here to help. Reach out and we&apos;ll get back to you as soon as
                possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                    <a href="mailto:hello@lopam.ai" className="text-slate-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-semibold break-all">
                      hello@lopam.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-slate-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-semibold">
                      +1 (800) LOPAM&apos;AI
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Office</h3>
                    <p className="text-slate-700 dark:text-gray-200 font-semibold">San Francisco, CA 94105</p>
                    <p className="text-slate-700 dark:text-gray-200 font-semibold">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10" />
            <div className="relative p-8 lg:p-12 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-slate-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-slate-900 dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold mb-2 text-slate-900 dark:text-white">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-slate-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    placeholder="Tell us about your security needs..."
                  />
                </div>

                <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
