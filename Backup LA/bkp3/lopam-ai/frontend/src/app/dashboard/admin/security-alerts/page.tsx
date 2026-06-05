'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { AlertCard } from '@/components/dashboard/enterprise/cards/AlertCard'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { securityAlertsData } from '@/lib/dashboard/dam-pages-data'

function SecurityAlertsContent() {
  const [alerts] = useState(securityAlertsData)

  const criticalAlerts = alerts.filter(a => a.level === 'critical')
  const highAlerts = alerts.filter(a => a.level === 'high')
  const mediumAlerts = alerts.filter(a => a.level === 'medium')

  return (
    <>
      <Breadcrumb items={[{ label: 'Security Alerts' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-8 h-8" style={{ color: '#FF4444' }} />
          <h1 className="text-4xl font-bold text-white">Security Alerts</h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)' }}>
          Real-time security incidents and threat alerts
        </p>
      </motion.div>

      {/* Alert Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Critical Alerts', value: criticalAlerts.length, color: '#FF4444' },
          { label: 'High Risk', value: highAlerts.length, color: '#FF8C00' },
          { label: 'Medium Risk', value: mediumAlerts.length, color: '#FFD700' },
          { label: 'Total Alerts', value: alerts.length, color: '#16E0B5' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="rounded-lg p-4 border"
            style={{
              background: 'linear-gradient(135deg, rgba(7,16,34,0.95) 0%, rgba(3,16,40,0.85) 100%)',
              border: `1px solid ${stat.color}33`,
              boxShadow: `0 0 20px ${stat.color}14`,
              backdropFilter: 'blur(16px)',
            }}
            whileHover={{
              boxShadow: `0 0 35px ${stat.color}33`,
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.65)' }} className="text-sm font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4" style={{ color: '#FF4444' }}>
            Critical Alerts ({criticalAlerts.length})
          </h2>
          <div className="space-y-3">
            {criticalAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                title={alert.title}
                description={alert.description}
                level="critical"
                timestamp={alert.timestamp}
                actionLabel="View"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* High Risk Alerts */}
      {highAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4" style={{ color: '#FF8C00' }}>
            High Risk Alerts ({highAlerts.length})
          </h2>
          <div className="space-y-3">
            {highAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                title={alert.title}
                description={alert.description}
                level="high"
                timestamp={alert.timestamp}
                actionLabel="View"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Medium Risk Alerts */}
      {mediumAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4" style={{ color: '#FFD700' }}>
            Medium Risk Alerts ({mediumAlerts.length})
          </h2>
          <div className="space-y-3">
            {mediumAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                title={alert.title}
                description={alert.description}
                level="medium"
                timestamp={alert.timestamp}
                actionLabel="View"
              />
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default function SecurityAlertsPage() {
  return (
    <DashboardLayout>
      <SecurityAlertsContent />
    </DashboardLayout>
  )
}
