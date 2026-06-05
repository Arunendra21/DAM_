'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { databaseInventoryData } from '@/lib/dashboard/dam-pages-data'

function DatabaseInventoryContent() {
  const [databases] = useState(databaseInventoryData)

  const columns = [
    { key: 'name' as const, label: 'Database Name', sortable: true },
    { key: 'type' as const, label: 'Type', sortable: true },
    { key: 'owner' as const, label: 'Owner' },
    { key: 'environment' as const, label: 'Environment', sortable: true },
    { key: 'size' as const, label: 'Size' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: unknown) => {
        const stringValue = String(value)
        const statusMap: Record<string, 'healthy' | 'warning' | 'critical'> = {
          Healthy: 'healthy',
          Warning: 'warning',
          Critical: 'critical',
        }
        return <StatusBadge status={statusMap[stringValue] || 'healthy'} label={stringValue} />
      },
    },
    { key: 'lastBackup' as const, label: 'Last Backup' },
  ]

  const stats = [
    { label: 'Total Databases', value: databases.length, color: 'teal' },
    { label: 'Healthy', value: databases.filter(d => d.status === 'Healthy').length, color: 'green' },
    { label: 'Warning', value: databases.filter(d => d.status === 'Warning').length, color: 'yellow' },
    { label: 'Critical', value: databases.filter(d => d.status === 'Critical').length, color: 'red' },
  ]

  return (
    <>
      <Breadcrumb items={[{ label: 'Database Inventory' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8" style={{ color: '#16E0B5' }} />
            <h1 className="text-4xl font-bold text-white">Database Inventory</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold"
            style={{
              background: 'linear-gradient(135deg, #16E0B5 0%, #00FFC3 100%)',
              color: '#020617',
            }}
          >
            <Plus className="w-4 h-4" />
            Add Database
          </motion.button>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)' }}>
          Manage and monitor all connected databases across your infrastructure
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="rounded-lg p-4 border"
            style={{
              background: 'linear-gradient(135deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.85) 100%)',
              border: '1px solid rgba(22,224,181,0.15)',
              boxShadow: '0 0 20px rgba(22,224,181,0.08)',
              backdropFilter: 'blur(16px)',
            }}
            whileHover={{
              boxShadow: '0 0 35px rgba(22,224,181,0.2)',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.65)' }} className="text-sm font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={databases}
          searchPlaceholder="Search databases..."
          title="Database List"
        />
      </motion.div>
    </>
  )
}

export default function DatabaseInventoryPage() {
  return (
    <DashboardLayout>
      <DatabaseInventoryContent />
    </DashboardLayout>
  )
}
