'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DataTable } from '@/components/dashboard/enterprise/tables/DataTable'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { usersData } from '@/lib/dashboard/dam-pages-data'

function UserManagementContent() {
  const [users] = useState(usersData)

  const columns = [
    { key: 'name' as const, label: 'Name', sortable: true },
    { key: 'email' as const, label: 'Email', sortable: true },
    { key: 'role' as const, label: 'Role', sortable: true },
    { key: 'department' as const, label: 'Department' },
    { key: 'lastLogin' as const, label: 'Last Login' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => (
        <StatusBadge status={value === 'Active' ? 'active' : 'inactive'} label={value} />
      ),
    },
  ]

  return (
    <>
      <Breadcrumb items={[{ label: 'User Management' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" style={{ color: '#16E0B5' }} />
            <h1 className="text-4xl font-bold text-white">User Management</h1>
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
            Add User
          </motion.button>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)' }}>
          Manage user accounts, roles, and access permissions
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Users', value: users.length },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length },
          { label: 'Admins', value: users.filter(u => u.role === 'Administrator').length },
          { label: 'Departments', value: 6 },
        ].map((stat, idx) => (
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
        <DataTable columns={columns} data={users} searchPlaceholder="Search users..." title="User Directory" />
      </motion.div>
    </>
  )
}

export default function UserManagementPage() {
  return (
    <DashboardLayout>
      <UserManagementContent />
    </DashboardLayout>
  )
}
