'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bell, Search, LogOut, Settings, User, Menu, X, Lock, Key } from 'lucide-react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface NavbarProps {
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function NavbarNew({ onLogout, sidebarOpen, setSidebarOpen }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { user, isLoading } = useCurrentUser()

  const isUserPortal = pathname?.includes('/dashboard/user')

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dropdown]')) {
        setProfileOpen(false)
        setNotificationOpen(false)
      }
    }

    if (profileOpen || notificationOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen, notificationOpen])

  // Determine role label based on user's roles
  const getRoleLabel = (roles: string[]): string => {
    if (!roles || roles.length === 0) return 'User'
    const roleLabels: Record<string, string> = {
      'SUPER_ADMIN': 'Administrator',
      'SECURITY_ADMIN': 'Security Admin',
      'DBA': 'Database Administrator',
      'AUDITOR': 'Auditor',
      'USER': 'Database User',
    }
    return roleLabels[roles[0]] || roles[0]
  }

  const displayName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : user?.username || 'User'

  const displayRole = user?.roles ? getRoleLabel(user.roles) : 'User'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{
        background: 'linear-gradient(180deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.85) 100%)',
        borderColor: 'rgba(22,224,181,0.08)',
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Menu Toggle + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            whileHover={{ scale: 1.05 }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          {/* Premium Search Bar */}
          <div className="flex-1 max-w-sm hidden sm:flex relative">
            <motion.div
              className="w-full relative"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search databases, users, alerts..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg font-medium text-sm"
                style={{
                  background: 'rgba(22,224,181,0.08)',
                  border: '1px solid rgba(22,224,181,0.15)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.3s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(22,224,181,0.4)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(22,224,181,0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(22,224,181,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <motion.div className="relative" whileHover={{ scale: 1.05 }} data-dropdown>
            <motion.button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition relative"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <Bell size={20} />
              {/* Notification Indicator */}
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 rounded-lg p-4 space-y-3"
                style={{
                  background: 'linear-gradient(180deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.85) 100%)',
                  border: '1px solid rgba(22,224,181,0.15)',
                  boxShadow: '0 0 30px rgba(22,224,181,0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <h3 className="text-sm font-bold" style={{ color: '#16E0B5' }}>
                  Notifications
                </h3>
                {[
                  {
                    title: 'Security Alert',
                    message: 'Unauthorized access attempt detected',
                    time: '2 min ago',
                  },
                  {
                    title: 'Backup Complete',
                    message: 'ProductionDB-01 backup finished',
                    time: '15 min ago',
                  },
                  {
                    title: 'Compliance',
                    message: 'Monthly audit report ready',
                    time: '1 hour ago',
                  },
                ].map((notif, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-lg border"
                    style={{
                      background: 'rgba(22,224,181,0.05)',
                      border: '1px solid rgba(22,224,181,0.1)',
                    }}
                    whileHover={{
                      background: 'rgba(22,224,181,0.1)',
                      borderColor: 'rgba(22,224,181,0.2)',
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold text-white">{notif.title}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          {notif.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Profile Dropdown */}
          <motion.div className="relative" whileHover={{ scale: 1.05 }} data-dropdown>
            <motion.button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-cyan-400">
                <span className="text-xs font-bold text-slate-900">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">
                {isLoading ? 'Loading...' : displayName}
              </span>
            </motion.button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 rounded-lg p-3 space-y-2 z-50"
                style={{
                  background: 'linear-gradient(180deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.85) 100%)',
                  border: '1px solid rgba(22,224,181,0.15)',
                  boxShadow: '0 0 30px rgba(22,224,181,0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* User Info Header */}
                <div className="px-3 py-3 border-b" style={{ borderColor: 'rgba(22,224,181,0.1)' }}>
                  <p className="text-sm font-semibold text-white">{displayName}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {displayRole}
                  </p>
                  {user?.email && (
                    <p className="text-xs mt-2 text-gray-500">{user.email}</p>
                  )}
                  {user?.phone && (
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  )}
                </div>

                {/* Menu Items */}
                <motion.button
                  onClick={() => {
                    router.push(isUserPortal ? '/dashboard/user/settings' : '/dashboard/admin/settings')
                    setProfileOpen(false)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-300 hover:bg-white/10 transition"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <User size={16} />
                  My Profile
                </motion.button>

                <motion.button
                  onClick={() => {
                    router.push(isUserPortal ? '/dashboard/user/security' : '/dashboard/admin/security')
                    setProfileOpen(false)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-300 hover:bg-white/10 transition"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Lock size={16} />
                  Security Settings
                </motion.button>

                <motion.button
                  onClick={() => {
                    router.push('/auth/forgot-password')
                    setProfileOpen(false)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-300 hover:bg-white/10 transition"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Key size={16} />
                  Change Password
                </motion.button>

                <motion.button
                  onClick={() => {
                    router.push(isUserPortal ? '/dashboard/user/settings' : '/dashboard/admin/settings')
                    setProfileOpen(false)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-300 hover:bg-white/10 transition"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Settings size={16} />
                  Settings
                </motion.button>

                <motion.button
                  onClick={() => {
                    onLogout()
                    setProfileOpen(false)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition"
                  whileHover={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
