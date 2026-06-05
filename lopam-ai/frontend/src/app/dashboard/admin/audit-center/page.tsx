'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Download } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { auditEventsData } from '@/lib/dashboard/dam-pages-data'

function AuditCenterPageContent() {
  const [events] = useState(auditEventsData)

  const columns = [
    { key: 'timestamp' as const, label: 'Timestamp', sortable: true },
    { key: 'user' as const, label: 'User', sortable: true },
    { key: 'action' as const, label: 'Action', sortable: true },
    { key: 'database' as const, label: 'Database' },
    { key: 'details' as const, label: 'Details' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: unknown) => {
        const stringValue = String(value)
        return (
          <StatusBadge
            status={stringValue === 'Success' ? 'healthy' : stringValue === 'Blocked' ? 'critical' : 'warning'}
            label={stringValue}
            size="sm"
          />
        )
      },
    },
  ]

  const successCount = events.filter(e => e.status === 'Success').length
  const blockedCount = events.filter(e => e.status === 'Blocked').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Audit Center' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileCheck className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-white">Audit Center</h1>
        </div>
        <p className="text-gray-400">Comprehensive audit trail and compliance tracking</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Events</p>
          <p className="text-2xl font-bold text-white mt-1">{events.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Successful</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{successCount}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Blocked</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{blockedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Violations</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">3</p>
        </div>
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-400 transition"
        >
          <Download className="w-4 h-4" />
          Export Audit Report
        </motion.button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={events}
          searchPlaceholder="Search audit events..."
          title="Audit Events"
        />
      </motion.div>
    </div>
  )
}

export default function AuditCenterPagePage() {
  return (
    <DashboardLayout>
      <AuditCenterPageContent />
    </DashboardLayout>
  )
}
