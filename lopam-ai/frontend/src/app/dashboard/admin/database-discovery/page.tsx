'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { discoveredDatabasesData } from '@/lib/dashboard/dam-pages-data'

function DatabaseDiscoveryPageContent() {
  const [databases] = useState(discoveredDatabasesData)

  const columns = [
    { key: 'name' as const, label: 'Database Name', sortable: true },
    { key: 'type' as const, label: 'Type', sortable: true },
    { key: 'location' as const, label: 'Location' },
    { key: 'discoveredDate' as const, label: 'Discovered', sortable: true },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => {
        const statusMap: Record<string, 'pending' | 'active' | 'warning'> = {
          New: 'pending',
          Classified: 'active',
          Review: 'warning',
        }
        return <StatusBadge status={statusMap[value] || 'pending'} label={value} size="sm" />
      },
    },
    { key: 'owner' as const, label: 'Owner' },
    {
      key: 'sensitivity' as const,
      label: 'Sensitivity',
      render: (value: string) => {
        const colorMap: Record<string, string> = {
          'Unknown': 'text-gray-400',
          'Low': 'text-green-400',
          'High': 'text-orange-400',
          'Critical': 'text-red-400',
        }
        return <span className={`font-semibold text-sm ${colorMap[value] || 'text-gray-400'}`}>{value}</span>
      },
    },
  ]

  const newDatabases = databases.filter(d => d.status === 'New').length
  const classifiedDatabases = databases.filter(d => d.status === 'Classified').length
  const reviewDatabases = databases.filter(d => d.status === 'Review').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Database Discovery' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Search className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Database Discovery</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Start Scan
          </motion.button>
        </div>
        <p className="text-gray-400">Discover and classify databases across your infrastructure</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Discovered</p>
          <p className="text-2xl font-bold text-white mt-1">{databases.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">New (Unclassified)</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{newDatabases}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Under Review</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">{reviewDatabases}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Classified</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{classifiedDatabases}</p>
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
          data={databases}
          searchPlaceholder="Search databases..."
          title="Discovered Databases"
        />
      </motion.div>
    </div>
  )
}

export default function DatabaseDiscoveryPagePage() {
  return (
    <DashboardLayout>
      <DatabaseDiscoveryPageContent />
    </DashboardLayout>
  )
}
