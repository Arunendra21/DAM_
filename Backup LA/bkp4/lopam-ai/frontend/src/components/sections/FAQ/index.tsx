'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { GlassCard } from '@/components/ui/Card'

const faqs = [
  {
    question: 'What databases does Lopam AI support?',
    answer:
      'Lopam AI supports all major database systems including PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Cassandra, Snowflake, BigQuery, and more. We continuously expand our database support.',
  },
  {
    question: 'How is data encrypted and stored?',
    answer:
      'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We comply with all major security standards including FIPS 140-2, SOC 2, and ISO 27001.',
  },
  {
    question: 'What is the typical implementation timeline?',
    answer:
      'Most implementations take 1-2 weeks depending on your environment. We provide white-glove onboarding for Enterprise customers with a dedicated implementation specialist.',
  },
  {
    question: 'Do you offer on-premises deployment?',
    answer:
      'Yes, Enterprise customers can deploy Lopam AI on-premises or in their private cloud. We also support hybrid deployments combining cloud and on-premises components.',
  },
  {
    question: 'How does Lopam AI handle false positives?',
    answer:
      'Our AI model is trained on millions of database transactions to minimize false positives. You can customize threat rules and establish baselines for your environment to further reduce false alerts.',
  },
  {
    question: 'What support options are available?',
    answer:
      'We offer 24/7/365 support for all customers. Starter plans get email support, Professional plans get priority support, and Enterprise customers get a dedicated support team and SLA.',
  },
]

interface FAQItemProps {
  item: { question: string; answer: string }
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ item, isOpen, onClick }: FAQItemProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <GlassCard>
        <div className="flex items-center justify-between">
          <h3 className="font-bold pr-4 text-slate-900 dark:text-white">{item.question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <Plus size={20} className="text-primary" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-slate-300 dark:border-surface-border"
            >
              <p className="text-slate-700 dark:text-gray-200 font-semibold leading-relaxed">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-container">
      <div className="max-w-3xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about Lopam AI</p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
