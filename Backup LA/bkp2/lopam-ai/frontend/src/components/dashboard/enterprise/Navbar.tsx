'use client'

import { motion } from 'framer-motion'
import { Menu, Bell, Settings, LogOut, User, Search, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Navbar({ onLogout, sidebarOpen, setSidebarOpen }: NavbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const notifications = [
    { id: 1, text: 'New security alert from Production DB', time: '2 mins ago', unread: true },
    { id: 2, text: 'Backup completed successfully', time: '15 mins ago', unread: true },
    { id: 3, text: 'Access request pending approval', time: '1 hour ago', unread: false },
  ]

  return (
    <motion.header
      className="sticky top-0 z-30 bg-gradient-to-r from-slate-900/95 to-slate-950/95 border-b border-blue-500/20 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 border border-blue-500/20 rounded-lg px-3 py-2 w-64">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search databases, users..."
              className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500 flex-1"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors relative"
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-slate-900 border border-blue-500/30 rounded-lg shadow-xl z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-4 border-b border-blue-500/20">
                  <h3 className="text-white font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer transition-colors ${
                        notif.unread ? 'bg-blue-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-blue-400' : 'bg-gray-600'}`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-blue-500/20 text-center">
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors">
            <Settings size={18} />
          </button>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-300">Admin</span>
            </motion.button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-slate-900 border border-blue-500/30 rounded-lg shadow-xl z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-4 border-b border-blue-500/20">
                  <p className="text-white font-semibold text-sm">Admin User</p>
                  <p className="text-xs text-gray-400">admin@lopam.ai</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-2">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-2">
                  <Settings size={16} />
                  Preferences
                </button>
                <div className="border-t border-blue-500/20">
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
