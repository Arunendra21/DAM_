'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ChevronDown, Check, X, Calendar } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function RolesPermissionsPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(userPortalData.rolesAndPermissions[0]?.id)
  const roles = userPortalData.rolesAndPermissions

  const permissionLabels = { read: 'Read', write: 'Write', delete: 'Delete', export: 'Export', admin: 'Admin' }

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Roles & Permissions</h1>
          </div>
          <p className="text-gray-400">View your assigned roles and permissions</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-slate-700/50 overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950/40"
            >
              <button
                onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                  <div className="flex gap-6 text-sm text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Assigned: {role.assignmentDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Expires: {role.expiryDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{role.description}</p>
                </div>
                <motion.div animate={{ rotate: expandedRole === role.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedRole === role.id ? 'auto' : 0,
                  opacity: expandedRole === role.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-slate-700/50"
              >
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-3">Assigned Databases:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.accessScope.map((db) => (
                        <span key={db} className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-sm border border-cyan-500/20">
                          {db}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-3">Permissions:</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(role.permissions).map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-3 rounded-lg border flex items-center gap-2 ${
                            value
                              ? 'bg-green-500/10 border-green-500/20 text-green-300'
                              : 'bg-slate-800/30 border-slate-700/30 text-gray-500'
                          }`}
                        >
                          {value ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          <span className="text-sm font-medium">{permissionLabels[key as keyof typeof permissionLabels]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Permission Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Database</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Read</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Write</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Delete</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Export</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-300">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {roles.map((role) =>
                  role.accessScope.map((db) => (
                    <tr key={`${role.id}-${db}`} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 text-sm text-white font-medium">{db}</td>
                      <td className="px-4 py-3 text-center">{role.permissions.read && <Check className="w-5 h-5 text-green-400 mx-auto" />}</td>
                      <td className="px-4 py-3 text-center">{role.permissions.write && <Check className="w-5 h-5 text-green-400 mx-auto" />}</td>
                      <td className="px-4 py-3 text-center">{role.permissions.delete && <Check className="w-5 h-5 text-green-400 mx-auto" />}</td>
                      <td className="px-4 py-3 text-center">{role.permissions.export && <Check className="w-5 h-5 text-green-400 mx-auto" />}</td>
                      <td className="px-4 py-3 text-center">{role.permissions.admin && <Check className="w-5 h-5 text-green-400 mx-auto" />}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </UserDashboardLayout>
  )
}
