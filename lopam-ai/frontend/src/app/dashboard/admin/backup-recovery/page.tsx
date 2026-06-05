'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HardDrive, Plus, RotateCcw, Download } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { backupDataData } from '@/lib/dashboard/dam-pages-data'

function BackupRecoveryPageContent() {
  const [backups] = useState(backupDataData)

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Backup & Recovery' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Backup & Recovery</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Create Backup
          </motion.button>
        </div>
        <p className="text-gray-400">Manage database backups and recovery points</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Backups</p>
          <p className="text-2xl font-bold text-white mt-1">{backups.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{backups.filter(b => b.status === 'Completed').length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{backups.filter(b => b.status === 'In Progress').length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Failed</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{backups.filter(b => b.status === 'Failed').length}</p>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 rounded-xl backdrop-blur-md p-6">
          <h2 className="text-xl font-bold text-white mb-4">Backup History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/30">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Database</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Backup Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((backup, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-700/20 hover:bg-slate-800/30 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-300">{backup.database}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{backup.backupTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{backup.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{backup.duration}</td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge
                        status={backup.status === 'Completed' ? 'healthy' : backup.status === 'In Progress' ? 'warning' : 'critical'}
                        label={backup.status}
                        size="sm"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-blue-500/20 rounded transition">
                          <Download className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-1 hover:bg-green-500/20 rounded transition">
                          <RotateCcw className="w-4 h-4 text-green-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function BackupRecoveryPagePage() {
  return (
    <DashboardLayout>
      <BackupRecoveryPageContent />
    </DashboardLayout>
  )
}
