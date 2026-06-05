'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Cpu, HardDrive, Wifi, CheckCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/dashboard/enterprise/shared/Breadcrumb'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { systemHealthData } from '@/lib/dashboard/dam-pages-data'

function SystemHealthContent() {
  const [healthData] = useState(systemHealthData)

  const healthMetrics = [
    {
      label: 'CPU Usage',
      value: healthData.cpu,
      unit: '%',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-500',
      status: healthData.cpu < 50 ? 'Optimal' : healthData.cpu < 75 ? 'Warning' : 'Critical',
    },
    {
      label: 'Memory Usage',
      value: healthData.memory,
      unit: '%',
      icon: Activity,
      color: 'from-purple-500 to-cyan-500',
      status: healthData.memory < 50 ? 'Optimal' : healthData.memory < 75 ? 'Warning' : 'Critical',
    },
    {
      label: 'Disk Usage',
      value: healthData.disk,
      unit: '%',
      icon: HardDrive,
      color: 'from-orange-500 to-yellow-500',
      status: healthData.disk < 50 ? 'Optimal' : healthData.disk < 75 ? 'Warning' : 'Critical',
    },
    {
      label: 'Network Usage',
      value: healthData.network,
      unit: '%',
      icon: Wifi,
      color: 'from-green-500 to-teal-500',
      status: healthData.network < 50 ? 'Optimal' : healthData.network < 75 ? 'Warning' : 'Critical',
    },
  ]

  return (
    <>
      <Breadcrumb items={[{ label: 'System Health' }]} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8" style={{ color: '#16E0B5' }} />
          <h1 className="text-4xl font-bold text-white">System Health</h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)' }}>
          Real-time system performance and resource monitoring
        </p>
      </motion.div>

      {/* Main Metrics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon
          const getStatusColor = (value: number) => {
            if (value < 50) return '#10B981'
            if (value < 75) return '#F59E0B'
            return '#EF4444'
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="rounded-xl p-6 border overflow-hidden relative backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.8) 100%)',
                border: '1px solid rgba(22,224,181,0.15)',
                boxShadow: '0 0 20px rgba(22,224,181,0.08)',
                backdropFilter: 'blur(16px)',
              }}
              whileHover={{
                boxShadow: '0 0 35px rgba(22,224,181,0.2)',
                transform: 'translateY(-4px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-300">{metric.label}</h3>
                <Icon className="w-6 h-6 text-gray-400" />
              </div>

              {/* Value */}
              <div className="mb-4">
                <motion.p
                  className="text-4xl font-bold"
                  style={{ color: getStatusColor(metric.value) }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {metric.value}
                  <span className="text-lg text-gray-400">{metric.unit}</span>
                </motion.p>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div
                  className="w-full rounded-full h-2 overflow-hidden border"
                  style={{
                    background: 'rgba(22,224,181,0.1)',
                    borderColor: 'rgba(22,224,181,0.15)',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full"
                    style={{
                      background: `linear-gradient(90deg, ${metric.color})`,
                    }}
                  />
                </div>
              </div>

              {/* Status */}
              <p className="text-xs font-semibold" style={{ color: getStatusColor(metric.value) }}>
                {metric.status === 'Optimal' && '✓ '} {metric.status}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-6 border"
          style={{
            background: 'linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.8) 100%)',
            border: '1px solid rgba(22,224,181,0.15)',
            boxShadow: '0 0 20px rgba(22,224,181,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Response Times</h3>
          <div className="space-y-4">
            {[
              { label: 'API Latency', value: healthData.apiLatency, max: 500 },
              {
                label: 'Query Response Time',
                value: healthData.queryResponseTime,
                max: 300,
              },
            ].map((metric, idx) => (
              <motion.div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>{metric.label}</span>
                  <span className="text-white font-bold">{metric.value}ms</span>
                </div>
                <div
                  className="w-full rounded-full h-2 overflow-hidden border"
                  style={{
                    background: 'rgba(22,224,181,0.1)',
                    borderColor: 'rgba(22,224,181,0.15)',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl p-6 border"
          style={{
            background: 'linear-gradient(135deg, rgba(7,16,34,0.9) 0%, rgba(3,16,40,0.8) 100%)',
            border: '1px solid rgba(22,224,181,0.15)',
            boxShadow: '0 0 20px rgba(22,224,181,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Service Status</h3>
          <div className="space-y-3">
            {[
              { name: 'Database Availability', status: 'Online', uptime: '99.8%' },
              { name: 'Backup Service', status: 'Healthy', uptime: '100%' },
              { name: 'Cache Service', status: 'Running', uptime: '99.9%' },
              { name: 'Message Queue', status: 'Healthy', uptime: '100%' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{
                  background: 'rgba(22,224,181,0.05)',
                  border: '1px solid rgba(22,224,181,0.1)',
                }}
                whileHover={{
                  background: 'rgba(22,224,181,0.1)',
                  borderColor: 'rgba(22,224,181,0.2)',
                }}
              >
                <div>
                  <p className="text-sm text-white font-medium">{service.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-xs">
                    {service.uptime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">{service.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default function SystemHealthPage() {
  return (
    <DashboardLayout>
      <SystemHealthContent />
    </DashboardLayout>
  )
}
