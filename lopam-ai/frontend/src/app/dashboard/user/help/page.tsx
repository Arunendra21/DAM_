'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Send, ChevronDown, MessageSquare, FileText, Mail } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState('faq')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'Normal',
    description: '',
  })

  const data = userPortalData.supportData

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Help & Support</h1>
          </div>
          <p className="text-gray-400">Get help and manage support requests</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 border-b border-slate-700/50 pb-4"
        >
          {['faq', 'tickets', 'contact'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition capitalize ${
                activeTab === tab
                  ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'faq' && 'FAQs'}
              {tab === 'tickets' && 'Support Tickets'}
              {tab === 'contact' && 'Contact'}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {[
                { label: 'Avg Resolution Time', value: data.stats.avgResolutionTime },
                { label: 'Open Tickets', value: data.stats.openTickets },
                { label: 'Resolved Tickets', value: data.stats.resolvedTickets },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
                >
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {data.faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-lg border border-slate-700/50 overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950/40"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                  >
                    <p className="text-white font-medium text-left">{faq.question}</p>
                    <motion.div animate={{ rotate: expandedFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === idx ? 'auto' : 0,
                      opacity: expandedFaq === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-slate-700/50"
                  >
                    <p className="p-4 text-gray-400 text-sm">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Support Tickets</h3>
            {data.tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{ticket.subject}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${ticket.status === 'Open' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300' : 'bg-green-500/10 border-green-500/20 text-green-300'}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Ticket ID: {ticket.id}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Created: {ticket.created}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Raise a Support Ticket</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue..."
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="">Select category...</option>
                    {data.supportCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none h-32"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition font-medium"
              >
                <Send className="w-4 h-4" />
                Submit Ticket
              </motion.button>
            </div>

            <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6">
              <h4 className="font-semibold text-white mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">support@company.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Live Chat</p>
                    <p className="text-white font-medium">Available Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Documentation</p>
                    <p className="text-white font-medium">View Knowledge Base</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </UserDashboardLayout>
  )
}
