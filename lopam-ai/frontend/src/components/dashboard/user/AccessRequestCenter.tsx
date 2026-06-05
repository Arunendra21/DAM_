'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, XCircle, X, Send } from 'lucide-react'

interface AccessRequest {
  id: string
  database: string
  requestedAccess: string
  requestDate: string
  duration: string
  status: string
  approver: string
}

interface AccessRequestCenterProps {
  requests: AccessRequest[]
  onNewRequest: () => void
  showModal: boolean
  setShowModal: (show: boolean) => void
}

export default function AccessRequestCenter({
  requests,
  onNewRequest,
  showModal,
  setShowModal,
}: AccessRequestCenterProps) {
  const [formData, setFormData] = useState({
    database: '',
    accessLevel: '',
    justification: '',
    duration: '',
    project: '',
    manager: '',
  })

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

  const handleSubmit = () => {
    console.log('New request:', formData)
    setFormData({ database: '', accessLevel: '', justification: '', duration: '', project: '', manager: '' })
    setShowModal(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Requests List */}
      <div className="grid gap-4">
        {requests.map((request, idx) => {
          const StatusIcon =
            statusIcons[request.status as keyof typeof statusIcons] || Clock

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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Requested Access</p>
                  <p className="text-white font-medium">{request.requestedAccess}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Request Date</p>
                  <p className="text-white font-medium">{request.requestDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Duration</p>
                  <p className="text-white font-medium">{request.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Approver</p>
                  <p className="text-white font-medium">{request.approver}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

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
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-slate-800/50 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Database
                  </label>
                  <select
                    value={formData.database}
                    onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="">Select database...</option>
                    <option value="BillingDB">BillingDB</option>
                    <option value="ReportsDB">ReportsDB</option>
                    <option value="ArchiveDB">ArchiveDB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Access Level
                  </label>
                  <select
                    value={formData.accessLevel}
                    onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="">Select access level...</option>
                    <option value="Read Only">Read Only</option>
                    <option value="Read/Write">Read/Write</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Justification
                  </label>
                  <textarea
                    value={formData.justification}
                    onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                    placeholder="Explain why you need this access..."
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration Needed
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="">Select...</option>
                      <option value="30 days">30 days</option>
                      <option value="60 days">60 days</option>
                      <option value="90 days">90 days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      placeholder="Project name..."
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Manager Approval Reference
                  </label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Manager name or approval ID..."
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
    </motion.div>
  )
}
