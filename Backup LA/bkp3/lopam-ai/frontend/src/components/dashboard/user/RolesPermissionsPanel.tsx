'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Calendar } from 'lucide-react'

interface Permission {
  id: string
  name: string
  assignedDate: string
  expiryDate: string
  permissions: string[]
}

interface RolesPermissionsPanelProps {
  roles: Permission[]
}

export default function RolesPermissionsPanel({ roles }: RolesPermissionsPanelProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(roles[0]?.id)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
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
                  Assigned: {role.assignedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Expires: {role.expiryDate}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedRole === role.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
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
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-400 font-medium">Assigned Permissions:</p>
              <div className="space-y-2">
                {role.permissions.map((perm, pidx) => (
                  <motion.div
                    key={pidx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pidx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-white">{perm}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
