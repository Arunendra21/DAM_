'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { accessRequestsData } from '@/lib/dashboard/dam-pages-data'

function AccessRequestsContent() {
  const [requests] = useState(accessRequestsData)

  const columns = [
    { key: 'id' as const, label: 'Request ID', sortable: true },
    { key: 'user' as const, label: 'User', sortable: true },
    { key: 'database' as const, label: 'Database', sortable: true },
    { key: 'requestedAccess' as const, label: 'Requested Access' },
    { key: 'duration' as const, label: 'Duration' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: unknown) => {
        const stringValue = String(value)
        const statusMap: Record<string, 'pending' | 'active' | 'warning'> = {
          Pending: 'pending',
          Approved: 'active',
          Rejected: 'warning',
        }
        return <StatusBadge status={statusMap[stringValue] || 'pending'} label={stringValue} />
      },
    },
    { key: 'requestedDate' as const, label: 'Requested Date' },
  ]

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Access Requests' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Access Requests</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            New Request
          </motion.button>
        </div>
        <p className="text-gray-400">Review and manage database access requests</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Requests</p>
          <p className="text-2xl font-bold text-white mt-1">{requests.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{requests.filter(r => r.status === 'Pending').length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{requests.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{requests.filter(r => r.status === 'Rejected').length}</p>
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
          data={requests}
          searchPlaceholder="Search requests..."
          title="Access Requests"
        />
      </motion.div>
    </div>
  )
}

export default function AccessRequestsPage() {
  return (
    <DashboardLayout>
      <AccessRequestsContent />
    </DashboardLayout>
  )
}
