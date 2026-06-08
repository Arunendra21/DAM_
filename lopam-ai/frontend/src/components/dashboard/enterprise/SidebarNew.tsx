'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  X,
  Sparkles,
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

export function SidebarNew({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen w-64 z-40 lg:sticky flex flex-col"
        animate={{ x: open ? 0 : -256 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(180deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.85) 100%)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(22,224,181,0.1)',
        }}
      >
        {/* Header */}
        <motion.div
          className="p-6 border-b"
          style={{ borderColor: 'rgba(22,224,181,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <Link href="/dashboard/admin" className="flex items-center gap-3 flex-1">
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #16E0B5 0%, #00FFC3 100%)',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles className="w-6 h-6 text-slate-900" />
              </motion.div>
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-white leading-tight">Lopam DAM</h1>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  DAM Platform
                </p>
              </div>
            </Link>
            <motion.button
              onClick={() => setOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Link href={item.href}>
                  <motion.div
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg flex items-center gap-3 relative overflow-hidden group cursor-pointer"
                    style={{
                      background: isActive
                        ? 'rgba(22,224,181,0.12)'
                        : 'transparent',
                      borderLeft: isActive ? '3px solid #16E0B5' : '3px solid transparent',
                      boxShadow: isActive ? '0 0 25px rgba(22,224,181,0.15)' : 'none',
                      paddingLeft: isActive ? 'calc(1rem - 3px)' : '1rem',
                      color: isActive ? '#16E0B5' : 'rgba(255,255,255,0.75)',
                    }}
                    whileHover={{
                      backgroundColor: isActive
                        ? 'rgba(22,224,181,0.15)'
                        : 'rgba(22,224,181,0.08)',
                      color: '#16E0B5',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Background glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(22,224,181,0.1) 0%, transparent 100%)',
                        transition: 'opacity 0.3s',
                      }}
                    />

                    {/* Icon */}
                    <Icon className="w-5 h-5 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />

                    {/* Label */}
                    <span className="text-sm font-medium relative z-10 truncate">{item.label}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute right-3 w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#16E0B5' }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <motion.div
          className="p-4 border-t space-y-3"
          style={{ borderColor: 'rgba(22,224,181,0.1)' }}
        >
          <motion.div
            className="px-4 py-3 rounded-lg"
            style={{
              background: 'rgba(22,224,181,0.08)',
              border: '1px solid rgba(22,224,181,0.15)',
              boxShadow: '0 0 15px rgba(22,224,181,0.08)',
            }}
            whileHover={{
              boxShadow: '0 0 25px rgba(22,224,181,0.15)',
            }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              System Status
            </p>
            <div className="flex items-center gap-2 mt-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-green-400">
                All Systems Operational
              </span>
            </div>
          </motion.div>

          <div className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <p>© 2026 Lopam DAM</p>
            <p>Database Access Management</p>
          </div>
        </motion.div>
      </motion.aside>
    </>
  )
}
