'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Download } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('All')
  const logs = userPortalData.auditLogs

  const filtered = logs.filter(
    (log) =>
      (log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.database.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterAction === 'All' || log.action === filterAction)
  )

  const resultColors = {
    Success: 'bg-green-500/10 border-green-500/20 text-green-300',
    Pending: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    Failed: 'bg-red-500/10 border-red-500/20 text-red-300',
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Audit Logs</h1>
          </div>
          <p className="text-gray-400">View your complete audit history</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option>All</option>
            <option>Login</option>
            <option>Data Export</option>
            <option>Query Execution</option>
            <option>Access Request</option>
            <option>Profile Update</option>
          </select>

          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 transition font-medium">
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="overflow-x-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
          <table className="w-full">
            <thead className="bg-slate-900/80 border-b border-slate-700/50">
              <tr>
                {['Timestamp', 'Action', 'Database', 'Result', 'IP Address', 'Device'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((log, idx) => (
                <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.database}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                        resultColors[log.result as keyof typeof resultColors] || resultColors.Success
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.device}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-sm text-gray-400">Showing {filtered.length} of {logs.length} logs</p>
      </div>
    </UserDashboardLayout>
  )
}
