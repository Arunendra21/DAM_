'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, BarChart3 } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { complianceReportsData } from '@/lib/dashboard/dam-pages-data'

function ComplianceReportsPageContent() {
  const [reports] = useState(complianceReportsData)

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Compliance Reports' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Compliance Reports</h1>
        </div>
        <p className="text-gray-400">Monitor compliance status for major regulatory standards</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{report.standard}</h3>
                <p className="text-gray-400 text-sm mt-1">Last Audit: {report.lastAudit}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            {/* Compliance Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Compliance Score</span>
                <span className="text-white font-bold">{report.compliance}%</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${report.compliance}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Status</p>
                <p className="text-green-400 font-semibold text-sm mt-1">{report.status}</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Violations</p>
                <p className="text-yellow-400 font-semibold text-sm mt-1">{report.violations}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg py-2 text-blue-400 transition text-sm"
              >
                <BarChart3 className="w-4 h-4" />
                View Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg py-2 text-green-400 transition text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ComplianceReportsPagePage() {
  return (
    <DashboardLayout>
      <ComplianceReportsPageContent />
    </DashboardLayout>
  )
}
