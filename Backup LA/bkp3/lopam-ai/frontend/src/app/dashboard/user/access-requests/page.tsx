'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, XCircle, Plus, Search, X, Send } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function AccessRequestsPage() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [formData, setFormData] = useState({
    database: '',
    requestedRole: '',
    businessJustification: '',
    requestedDuration: '',
    projectName: '',
    managerApproval: '',
  })

  const data = userPortalData.accessRequests

  const statusIcons = {
    Pending: Clock,
    Approved: CheckCircle,
    Rejected: XCircle,
  }

  const statusColors = {
    Pending: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    Approved: 'bg-green-500/10 border-green-500/20 text-green-300',
    Rejected: 'bg-red-500/10 border-red-500/20 text-red-300',
  }

  const filtered = data.requests.filter((req) =>
    req.database.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || req.status === filterStatus)
  )

  const handleSubmit = () => {
    console.log('New request:', formData)
    setFormData({ database: '', requestedRole: '', businessJustification: '', requestedDuration: '', projectName: '', managerApproval: '' })
    setShowModal(false)
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Access Requests</h1>
            <p className="text-gray-400">Manage your database access requests</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition"
          >
            <Plus className="w-4 h-4" />
            New Request
          </motion.button>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Requests', value: data.stats.total, color: 'from-blue-500/30 to-blue-500/10' },
            { label: 'Pending', value: data.stats.pending, color: 'from-yellow-500/30 to-yellow-500/10' },
            { label: 'Approved', value: data.stats.approved, color: 'from-green-500/30 to-green-500/10' },
            { label: 'Rejected', value: data.stats.rejected, color: 'from-red-500/30 to-red-500/10' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border border-slate-700/50 bg-gradient-to-br ${stat.color}`}
            >
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </motion.div>

        {/* Requests List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          {filtered.map((request, idx) => {
            const StatusIcon = statusIcons[request.status as keyof typeof statusIcons] || Clock

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-lg border border-slate-700/50 bg-gradient-to-r from-slate-900/40 to-slate-950/40 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{request.database}</h3>
                    <p className="text-sm text-gray-400">Request ID: {request.id}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border flex items-center gap-2 ${
                      statusColors[request.status as keyof typeof statusColors]
                    }`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {request.status}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-3">{request.businessJustification}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Requested Role</p>
                    <p className="text-white font-medium">{request.requestedRole}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Duration</p>
                    <p className="text-white font-medium">{request.requestedDuration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Submitted</p>
                    <p className="text-white font-medium">{request.submissionDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Approver</p>
                    <p className="text-white font-medium">{request.approvedBy}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Request Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 rounded-xl max-w-lg w-full p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Request Database Access</h2>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-slate-800/50 rounded-lg transition">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Database</label>
                    <select
                      value={formData.database}
                      onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="">Select database...</option>
                      <option value="CustomerDB">CustomerDB</option>
                      <option value="BillingDB">BillingDB</option>
                      <option value="AnalyticsDB">AnalyticsDB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Requested Role</label>
                    <select
                      value={formData.requestedRole}
                      onChange={(e) => setFormData({ ...formData, requestedRole: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="">Select role...</option>
                      <option value="Read Only">Read Only</option>
                      <option value="Read/Write">Read/Write</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Justification</label>
                    <textarea
                      value={formData.businessJustification}
                      onChange={(e) => setFormData({ ...formData, businessJustification: e.target.value })}
                      placeholder="Explain why you need this access..."
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                      <select
                        value={formData.requestedDuration}
                        onChange={(e) => setFormData({ ...formData, requestedDuration: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="">Select...</option>
                        <option value="30 days">30 days</option>
                        <option value="60 days">60 days</option>
                        <option value="90 days">90 days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        placeholder="Project name..."
                        className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Manager Approval</label>
                    <input
                      type="text"
                      value={formData.managerApproval}
                      onChange={(e) => setFormData({ ...formData, managerApproval: e.target.value })}
                      placeholder="Manager name..."
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UserDashboardLayout>
  )
}
