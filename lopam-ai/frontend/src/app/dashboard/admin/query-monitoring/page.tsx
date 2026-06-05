'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { queryMonitoringData } from '@/lib/dashboard/dam-pages-data'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

function QueryMonitoringContent() {
  const [queries] = useState(queryMonitoringData)

  const columns = [
    { key: 'queryId' as const, label: 'Query ID', sortable: true },
    { key: 'database' as const, label: 'Database', sortable: true },
    { key: 'user' as const, label: 'User', sortable: true },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => {
        const statusMap: Record<string, 'active' | 'warning' | 'critical'> = {
          Running: 'active',
          Slow: 'warning',
          Failed: 'critical',
        }
        return <StatusBadge status={statusMap[value] || 'active'} label={value} size="sm" />
      },
    },
    { key: 'type' as const, label: 'Type' },
    { key: 'duration' as const, label: 'Duration' },
    { key: 'rows' as const, label: 'Rows' },
    { key: 'startTime' as const, label: 'Start Time' },
  ]

  const runningQueries = queries.filter(q => q.status === 'Running').length
  const slowQueries = queries.filter(q => q.status === 'Slow').length
  const failedQueries = queries.filter(q => q.status === 'Failed').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Query Monitoring' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-teal-400" />
          <h1 className="text-3xl font-bold text-white">Query Monitoring</h1>
        </div>
        <p className="text-gray-400">Real-time database query monitoring and performance analytics</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Queries</p>
          <p className="text-2xl font-bold text-white mt-1">{queries.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Running</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{runningQueries}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Slow Queries</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{slowQueries}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Failed</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{failedQueries}</p>
        </div>
      </motion.div>

      {/* Active Alerts */}
      {slowQueries > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-400">Slow Queries Detected</p>
            <p className="text-gray-400 text-sm mt-1">{slowQueries} queries are running slower than expected</p>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={queries}
          searchPlaceholder="Search queries..."
          title="Active Queries"
        />
      </motion.div>
    </div>
  )
}

export default function QueryMonitoringPage() {
  return (
    <DashboardLayout>
      <QueryMonitoringContent />
    </DashboardLayout>
  )
}
