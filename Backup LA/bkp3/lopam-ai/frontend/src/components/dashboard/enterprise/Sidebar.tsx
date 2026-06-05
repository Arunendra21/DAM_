'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard,
  Database,
  Users,
  Inbox,
  Zap,
  Activity,
  AlertTriangle,
  FileText,
  HardDrive,
  Lock,
  CheckCircle,
  Globe,
  Shield,
  BarChart3,
  TrendingUp,
  Settings,
  Bell,
  X,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/admin' },
  { icon: Database, label: 'Database Inventory', href: '/dashboard/admin/database-inventory' },
  { icon: Users, label: 'User Management', href: '/dashboard/admin/user-management' },
  { icon: Inbox, label: 'Access Requests', href: '/dashboard/admin/access-requests' },
  { icon: Zap, label: 'Query Monitoring', href: '/dashboard/admin/query-monitoring' },
  { icon: Activity, label: 'Activity Logs', href: '/dashboard/admin/activity-logs' },
  { icon: AlertTriangle, label: 'Security Alerts', href: '/dashboard/admin/security-alerts' },
  { icon: FileText, label: 'Compliance Reports', href: '/dashboard/admin/compliance-reports' },
  { icon: HardDrive, label: 'Backup & Recovery', href: '/dashboard/admin/backup-recovery' },
  { icon: Lock, label: 'Encryption Management', href: '/dashboard/admin/encryption-management' },
  { icon: CheckCircle, label: 'Audit Center', href: '/dashboard/admin/audit-center' },
  { icon: Globe, label: 'Database Discovery', href: '/dashboard/admin/database-discovery' },
  { icon: Shield, label: 'Data Classification', href: '/dashboard/admin/data-classification' },
  { icon: TrendingUp, label: 'Risk Assessment', href: '/dashboard/admin/risk-assessment' },
  { icon: BarChart3, label: 'Policies', href: '/dashboard/admin/policies' },
  { icon: Database, label: 'Integrations', href: '/dashboard/admin/integrations' },
  { icon: Activity, label: 'System Health', href: '/dashboard/admin/system-health' },
  { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-blue-500/20 z-40 lg:sticky flex flex-col"
        animate={{ x: open ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Lopam AI</h1>
              <p className="text-xs text-gray-400">DAM Platform</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={item.href}>
                  <div className="px-4 py-3 rounded-lg hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-200 flex items-center gap-3 group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/20 space-y-3">
          <div className="px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-xs text-gray-400 mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400 font-semibold">All Systems Operational</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>© 2026 Lopam AI</p>
            <p>Database Access Management</p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
