'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Database,
  Clock,
  Activity,
  Shield,
  FileText,
  Bell,
  BarChart3,
  Settings,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/user' },
  { icon: Database, label: 'My Databases', href: '/dashboard/user/my-databases' },
  { icon: Clock, label: 'Access Requests', href: '/dashboard/user/access-requests' },
  { icon: Activity, label: 'Active Sessions', href: '/dashboard/user/active-sessions' },
  { icon: Shield, label: 'Roles & Permissions', href: '/dashboard/user/roles-permissions' },
  { icon: Shield, label: 'Security Center', href: '/dashboard/user/security' },
  { icon: FileText, label: 'Audit Logs', href: '/dashboard/user/audit-logs' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/user/notifications' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/user/reports' },
  { icon: Settings, label: 'Profile Settings', href: '/dashboard/user/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/user/help' },
]

interface UserSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UserSidebar({ open, setOpen }: UserSidebarProps) {
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
            <Link href="/dashboard/user" className="flex items-center gap-3 flex-1">
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
                  User Portal
                </p>
              </div>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-1 hover:bg-white/10 rounded transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600/20 to-cyan-600/10 text-cyan-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 w-1 h-8 rounded-r-lg bg-cyan-400"
                        style={{
                          boxShadow: '0 0 15px rgba(0,255,195,0.5)',
                        }}
                      />
                    )}
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <motion.div
          className="p-6 border-t"
          style={{ borderColor: 'rgba(22,224,181,0.1)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-gray-500 text-center">
            Secure Database Access Management
          </p>
        </motion.div>
      </motion.aside>
    </>
  )
}
