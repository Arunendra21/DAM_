'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Save, Key, Bell, Moon, Lock } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'api', label: 'API Keys', icon: Key },
  ]

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Settings' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-gray-400" />
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-gray-400">Manage your account and system configuration</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-700/50"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 rounded-xl backdrop-blur-md p-8"
      >
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Admin"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="john.admin@company.com"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input
                type="text"
                defaultValue="IT Administration"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                defaultValue="Administrator"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-gray-500 focus:outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </motion.button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Password</h3>
                <p className="text-gray-400 text-sm mb-3">Last changed 45 days ago</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                  Change Password
                </motion.button>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm mb-3">Status: <span className="text-green-400 font-semibold">Enabled</span></p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                  Manage 2FA
                </motion.button>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Active Sessions</h3>
                <p className="text-gray-400 text-sm mb-3">You have 2 active sessions</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                  Sign Out All Devices
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
            <div className="space-y-3">
              {[
                'Security Alerts',
                'System Maintenance',
                'Backup Notifications',
                'Compliance Reports',
                'Access Requests',
              ].map((notif) => (
                <label key={notif} className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-800/40 transition">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded accent-blue-500"
                  />
                  <span className="text-gray-300">{notif}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Appearance Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
              <div className="space-y-2">
                {['Dark Mode', 'Light Mode', 'Auto'].map((theme) => (
                  <label key={theme} className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-800/40 transition">
                    <input
                      type="radio"
                      name="theme"
                      defaultChecked={theme === 'Dark Mode'}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <span className="text-gray-300">{theme}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">API Keys</h2>
            <p className="text-gray-400 text-sm mb-4">Manage API keys for programmatic access</p>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-sm text-gray-400">sk_live_51A2b3C4d5E6f7g8h9i0</p>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">Active</span>
                </div>
                <p className="text-gray-500 text-xs mb-3">Created 90 days ago</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
                >
                  Revoke
                </motion.button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              <Key className="w-4 h-4" />
              Generate New Key
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function SettingsPagePage() {
  return (
    <DashboardLayout>
      <SettingsPageContent />
    </DashboardLayout>
  )
}
