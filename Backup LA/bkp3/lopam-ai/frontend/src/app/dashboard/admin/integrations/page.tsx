'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plug, Plus, RefreshCw } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { StatusBadge } from '@/components/dashboard/enterprise/shared/StatusBadge'
import { integrationsData } from '@/lib/dashboard/dam-pages-data'

function IntegrationsPageContent() {
  const [integrations] = useState(integrationsData)

  const connectedCount = integrations.filter(i => i.status === 'Connected').length
  const disconnectedCount = integrations.filter(i => i.status === 'Disconnected').length

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Integrations' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Plug className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Integration
          </motion.button>
        </div>
        <p className="text-gray-400">Manage external platform integrations and connections</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Integrations</p>
          <p className="text-2xl font-bold text-white mt-1">{integrations.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Connected</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{connectedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Disconnected</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{disconnectedCount}</p>
        </div>
      </motion.div>

      {/* Integration Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 rounded-lg p-6 backdrop-blur-md hover:border-slate-600/50 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{integration.platform}</h3>
                <p className="text-gray-400 text-sm mt-1">Version: {integration.version}</p>
              </div>
              <StatusBadge
                status={integration.status === 'Connected' ? 'active' : 'inactive'}
                label={integration.status}
              />
            </div>

            {/* Sync Status */}
            <div className="mb-6 p-3 bg-slate-800/30 border border-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Sync Status</span>
                <span
                  className={`text-sm font-semibold ${
                    integration.syncStatus === 'Healthy' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {integration.syncStatus}
                </span>
              </div>
              <p className="text-gray-500 text-xs">Last: {integration.lastSync}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg py-2 text-blue-400 transition text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Sync
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-slate-700/20 hover:bg-slate-700/30 border border-slate-600/30 rounded-lg py-2 text-gray-300 transition text-sm"
              >
                Settings
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function IntegrationsPagePage() {
  return (
    <DashboardLayout>
      <IntegrationsPageContent />
    </DashboardLayout>
  )
}
