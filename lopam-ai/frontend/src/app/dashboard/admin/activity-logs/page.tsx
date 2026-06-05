'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { History } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { activityLogsData } from '@/lib/dashboard/dam-pages-data'

function ActivityLogsPageContent() {
  const [logs] = useState(activityLogsData)

  const columns = [
    { key: 'timestamp' as const, label: 'Timestamp', sortable: true },
    { key: 'user' as const, label: 'User', sortable: true },
    { key: 'action' as const, label: 'Action', sortable: true },
    { key: 'database' as const, label: 'Database' },
    {
      key: 'severity' as const,
      label: 'Severity',
      render: (value: string) => {
        const severityStatusMap: Record<string, 'critical' | 'high' | 'warning' | 'info'> = {
          critical: 'critical',
          warning: 'warning',
          info: 'info',
        }
        const statusValue = severityStatusMap[value] || 'info'
        return <StatusBadge status={statusValue} label={value} size="sm" />
      },
    },
    { key: 'details' as const, label: 'Details' },
  ]

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Activity Logs' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <History className="w-8 h-8 text-orange-400" />
          <h1 className="text-3xl font-bold text-white">Activity Logs</h1>
        </div>
        <p className="text-gray-400">Audit trail of all system activities and user actions</p>
      </motion.div>

      {/* Filter Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Activities</p>
          <p className="text-2xl font-bold text-white mt-1">{logs.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Critical</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{logs.filter(l => l.severity === 'critical').length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Warnings</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{logs.filter(l => l.severity === 'warning').length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Info</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{logs.filter(l => l.severity === 'info').length}</p>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={logs}
          searchPlaceholder="Search activities..."
          title="Activity Log"
        />
      </motion.div>
    </div>
  )
}

export default function ActivityLogsPage() {
  return (
    <DashboardLayout>
      <ActivityLogsPageContent />
    </DashboardLayout>
  )
}
