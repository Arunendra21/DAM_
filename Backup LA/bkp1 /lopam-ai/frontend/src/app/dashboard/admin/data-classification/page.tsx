'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Percent } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { dataClassificationData } from '@/lib/dashboard/dam-pages-data'

function DataClassificationPageContent() {
  const [classificationData] = useState(dataClassificationData)

  const totalDataItems = classificationData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Data Classification' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Data Classification</h1>
        </div>
        <p className="text-gray-400">Sensitive data detection and classification</p>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Data Items</p>
          <p className="text-2xl font-bold text-white mt-1">{totalDataItems.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Critical Risk</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{classificationData.filter(d => d.riskLevel === 'Critical').reduce((s, d) => s + d.count, 0).toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">High Risk</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">{classificationData.filter(d => d.riskLevel === 'High').reduce((s, d) => s + d.count, 0).toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Classification Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {classificationData.map((item, index) => {
          const percentage = (item.count / totalDataItems) * 100
          const riskColor =
            item.riskLevel === 'Critical'
              ? 'from-red-500/10 to-red-600/10 border-red-500/20'
              : item.riskLevel === 'High'
                ? 'from-orange-500/10 to-orange-600/10 border-orange-500/20'
                : 'from-blue-500/10 to-blue-600/10 border-blue-500/20'

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`bg-gradient-to-br ${riskColor} border rounded-lg p-6 backdrop-blur-md`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.category}</h3>
                  <p className="text-gray-400 text-sm mt-1">Databases: {item.databases}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    item.riskLevel === 'Critical'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}
                >
                  {item.riskLevel}
                </span>
              </div>

              {/* Count & Percentage */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Data Items</span>
                  <span className="text-white font-bold">{item.count.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Distribution</span>
                  <span className="text-gray-300 text-xs font-semibold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${
                      item.riskLevel === 'Critical'
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                  />
                </div>
              </div>

              {/* Encryption Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Encryption</p>
                  <p className={`font-semibold text-sm mt-1 ${item.encryption === 'Yes' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.encryption}
                  </p>
                </div>
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <Percent className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-400 text-xs">Score</p>
                  </div>
                  <p className="text-white font-semibold text-sm mt-1">High</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function DataClassificationPagePage() {
  return (
    <DashboardLayout>
      <DataClassificationPageContent />
    </DashboardLayout>
  )
}
