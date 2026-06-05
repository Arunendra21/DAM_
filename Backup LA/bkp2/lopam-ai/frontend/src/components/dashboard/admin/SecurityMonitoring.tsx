import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, Shield, Eye, Lock } from 'lucide-react'

interface SecurityData {
  privilegedAccessRequests: number
  unauthorizedAttempts: number
  suspiciousQueries: number
  policyViolations: number
  dataExfiltrationAlerts: number
  trend: Array<{ date: string; violations: number }>
}

interface SecurityMonitoringProps {
  data: SecurityData
}

interface MetricItem {
  icon: typeof AlertTriangle
  label: string
  value: number
  color: 'red' | 'yellow' | 'orange' | 'purple'
}

export function SecurityMonitoring({ data }: SecurityMonitoringProps) {
  const metrics: MetricItem[] = [
    {
      icon: Shield,
      label: 'Privileged Access Requests',
      value: data.privilegedAccessRequests,
      color: 'purple',
    },
    {
      icon: AlertTriangle,
      label: 'Unauthorized Attempts',
      value: data.unauthorizedAttempts,
      color: 'red',
    },
    {
      icon: Eye,
      label: 'Suspicious Queries',
      value: data.suspiciousQueries,
      color: 'orange',
    },
    {
      icon: Lock,
      label: 'Policy Violations',
      value: data.policyViolations,
      color: 'yellow',
    },
  ]

  const colorMap = {
    red: 'bg-red-500/20 text-red-300 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Security Monitoring Overview</h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={idx}
              className={`p-4 rounded-lg border ${colorMap[metric.color]}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <Icon size={20} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs opacity-80">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Violations Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Policy Violations Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="violations"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Summary */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Security Alerts Summary</h4>
          <div className="space-y-3">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-red-300 text-sm">Critical Alerts</span>
                <span className="text-red-400 font-bold text-lg">
                  {data.dataExfiltrationAlerts}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Data exfiltration attempts detected</p>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-orange-300 text-sm">High Priority</span>
                <span className="text-orange-400 font-bold text-lg">
                  {data.unauthorizedAttempts + data.policyViolations}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Unauthorized access and policy breaches</p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-yellow-300 text-sm">Medium Priority</span>
                <span className="text-yellow-400 font-bold text-lg">
                  {data.suspiciousQueries}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Suspicious database queries detected</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
