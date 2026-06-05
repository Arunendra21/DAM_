'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { encryptionKeysData } from '@/lib/dashboard/dam-pages-data'

function EncryptionManagementPageContent() {
  const [keys] = useState(encryptionKeysData)

  const columns = [
    { key: 'name' as const, label: 'Key Name', sortable: true },
    { key: 'algorithm' as const, label: 'Algorithm', sortable: true },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: unknown) => {
        const stringValue = String(value)
        const statusMap: Record<string, 'active' | 'inactive' | 'warning'> = {
          Active: 'active',
          Expired: 'warning',
          Inactive: 'inactive',
        }
        return <StatusBadge status={statusMap[stringValue] || 'inactive'} label={stringValue} size="sm" />
      },
    },
    { key: 'createdDate' as const, label: 'Created' },
    { key: 'expiryDate' as const, label: 'Expiry' },
    { key: 'rotationDue' as const, label: 'Rotation Due' },
    { key: 'lastRotated' as const, label: 'Last Rotated' },
  ]

  const activeKeys = keys.filter(k => k.status === 'Active').length
  const expiredKeys = keys.filter(k => k.status === 'Expired').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Encryption Management' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Encryption Management</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            New Key
          </motion.button>
        </div>
        <p className="text-gray-400">Manage encryption keys and key rotation policies</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Keys</p>
          <p className="text-2xl font-bold text-white mt-1">{keys.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Active Keys</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{activeKeys}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Expired Keys</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{expiredKeys}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Pending Rotation</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">2</p>
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
          data={keys}
          searchPlaceholder="Search keys..."
          title="Encryption Keys"
        />
      </motion.div>
    </div>
  )
}

export default function EncryptionManagementPagePage() {
  return (
    <DashboardLayout>
      <EncryptionManagementPageContent />
    </DashboardLayout>
  )
}
