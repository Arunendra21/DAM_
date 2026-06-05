'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Lock, Smartphone } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const profile = userPortalData.profileSettings

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'devices', label: 'Devices', icon: Smartphone },
  ]

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400">Manage your account and security settings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 border-b border-slate-700/50 pb-4"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>

              {Object.entries(profile.personalInfo).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    type="text"
                    defaultValue={value}
                    disabled={key !== 'phone'}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              ))}

              <motion.button whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition font-medium">
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {[
              {
                title: 'Password',
                description: `Last changed on ${profile.securitySettings.passwordLastChanged}. Expires on ${profile.securitySettings.passwordExpires}`,
                button: 'Change Password',
              },
              {
                title: '2FA Status',
                description: profile.securitySettings.twoFactorAuth ? 'Two-Factor Authentication is enabled' : 'Enable 2FA for added security',
                button: 'Manage 2FA',
              },
              {
                title: 'MFA Configuration',
                description: `Current method: ${profile.securitySettings.mfaMethod}`,
                button: 'Configure MFA',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition text-sm font-medium">
                  {item.button}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Trusted Devices</h3>
            {profile.trustedDevices.map((device, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{device.name}</h4>
                    <p className="text-sm text-gray-400">{device.type}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-medium">Trusted</span>
                </div>
                <p className="text-sm text-gray-500">Last used: {device.lastUsed}</p>
              </motion.div>
            ))}

            <h3 className="text-lg font-semibold text-white mt-8">Recent Logins</h3>
            {profile.recentLogins.map((login, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{login.device} - {login.location}</p>
                    <p className="text-xs text-gray-500">{login.timestamp}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-medium">
                    {login.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </UserDashboardLayout>
  )
}
