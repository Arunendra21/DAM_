'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { riskAssessmentData } from '@/lib/dashboard/dam-pages-data'

function RiskAssessmentPageContent() {
  const [risks] = useState(riskAssessmentData)

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'from-red-500/10 to-red-600/10 border-red-500/20'
    if (score >= 60) return 'from-orange-500/10 to-orange-600/10 border-orange-500/20'
    if (score >= 40) return 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20'
    return 'from-green-500/10 to-green-600/10 border-green-500/20'
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400'
      case 'High':
        return 'bg-orange-500/20 text-orange-400'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-green-500/20 text-green-400'
    }
  }

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Risk Assessment' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-red-400" />
          <h1 className="text-3xl font-bold text-white">Risk Assessment</h1>
        </div>
        <p className="text-gray-400">Vulnerability analysis and threat assessment</p>
      </motion.div>

      {/* Risk Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Critical Databases</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{risks.filter(r => r.riskLevel === 'Critical').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">High Risk</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">{risks.filter(r => r.riskLevel === 'High').length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Total Vulnerabilities</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{risks.reduce((s, r) => s + r.vulnerabilities, 0)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Avg Risk Score</p>
          <p className="text-2xl font-bold text-white mt-1">{Math.round(risks.reduce((s, r) => s + r.riskScore, 0) / risks.length)}</p>
        </div>
      </motion.div>

      {/* Risk Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {risks.map((risk, index) => (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className={`bg-gradient-to-br ${getRiskColor(risk.riskScore)} border rounded-lg p-6 backdrop-blur-md`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{risk.database}</h3>
                <p className="text-gray-400 text-sm mt-1">Last Assessed: {risk.lastAssessed}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getRiskLabel(risk.riskLevel)}`}>
                {risk.riskLevel}
              </span>
            </div>

            {/* Risk Score */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-semibold">Risk Score</span>
                <span className="text-2xl font-bold text-white">{risk.riskScore}</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${risk.riskScore}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${
                    risk.riskScore >= 80
                      ? 'bg-gradient-to-r from-red-500 to-red-600'
                      : risk.riskScore >= 60
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                        : risk.riskScore >= 40
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Vulnerabilities</p>
                <p className="text-red-400 font-bold text-lg mt-1">{risk.vulnerabilities}</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Recommendations</p>
                <p className="text-blue-400 font-bold text-lg mt-1">{risk.recommendations}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function RiskAssessmentPagePage() {
  return (
    <DashboardLayout>
      <RiskAssessmentPageContent />
    </DashboardLayout>
  )
}
