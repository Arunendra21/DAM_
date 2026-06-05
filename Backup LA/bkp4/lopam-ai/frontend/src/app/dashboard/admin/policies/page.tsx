'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { policiesData } from '@/lib/dashboard/dam-pages-data'

function PoliciesPageContent() {
  const [policies] = useState(policiesData)

  const columns = [
    { key: 'name' as const, label: 'Policy Name', sortable: true },
    { key: 'type' as const, label: 'Type', sortable: true },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => (
        <StatusBadge
          status={value === 'Active' ? 'active' : 'warning'}
          label={value}
          size="sm"
        />
      ),
    },
    { key: 'lastUpdated' as const, label: 'Last Updated' },
    { key: 'appliedTo' as const, label: 'Applied To' },
    { key: 'approver' as const, label: 'Approver' },
  ]

  const activeCount = policies.filter(p => p.status === 'Active').length
  const draftCount = policies.filter(p => p.status === 'Draft').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Policies' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Policies</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Create Policy
          </motion.button>
        </div>
        <p className="text-gray-400">Manage security, access, and compliance policies</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Policies</p>
          <p className="text-2xl font-bold text-white mt-1">{policies.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{activeCount}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Draft</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{draftCount}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Policy Types</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">4</p>
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
          data={policies}
          searchPlaceholder="Search policies..."
          title="Policy List"
        />
      </motion.div>
    </div>
  )
}

export default function PoliciesPagePage() {
  return (
    <DashboardLayout>
      <PoliciesPageContent />
    </DashboardLayout>
  )
}
