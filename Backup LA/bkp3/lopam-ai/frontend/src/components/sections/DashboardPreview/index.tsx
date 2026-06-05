'use client'

import { useEffect, useReducer } from 'react'
import { motion } from 'framer-motion'
import { SecurityAlert, QueryType, AlertSeverity } from '@/types/dashboard'
import { mockAlerts } from '@/data/dashboard/alerts'
import { DashboardFrame } from './DashboardFrame'
import { AlertsPanel } from './AlertsPanel'
import { SecurityScore } from './SecurityScore'

interface DashboardState {
  alerts: SecurityAlert[]
  securityScore: number
  queriesMonitored: number
  threatsBlocked: number
}

type DashboardAction = { type: 'ADD_ALERT'; payload: SecurityAlert } | { type: 'UPDATE_SCORE'; payload: number } | { type: 'UPDATE_METRICS'; payload: Partial<DashboardState> }

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts.slice(0, 9)],
      }
    case 'UPDATE_SCORE':
      return {
        ...state,
        securityScore: action.payload,
      }
    case 'UPDATE_METRICS':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export function DashboardPreview() {
  const [state, dispatch] = useReducer(dashboardReducer, {
    alerts: mockAlerts,
    securityScore: 87,
    queriesMonitored: 1247832,
    threatsBlocked: 847,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics randomly
      dispatch({
        type: 'UPDATE_METRICS',
        payload: {
          queriesMonitored: state.queriesMonitored + Math.floor(Math.random() * 1000),
          threatsBlocked: state.threatsBlocked + Math.floor(Math.random() * 10),
          securityScore: Math.min(100, Math.max(50, state.securityScore + (Math.random() - 0.5) * 4)),
        },
      })

      // Occasionally add new alerts
      if (Math.random() > 0.7) {
        const newAlert: SecurityAlert = {
          id: Date.now().toString(),
          timestamp: new Date(),
          database: ['prod-postgresql-01', 'analytics-mysql-02', 'legacy-oracle'][Math.floor(Math.random() * 3)],
          user: ['admin@company.com', 'service_account', 'analyst_user'][Math.floor(Math.random() * 3)],
          queryType: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'][Math.floor(Math.random() * 4)] as QueryType,
          query: 'SELECT * FROM sensitive_data',
          riskScore: Math.floor(Math.random() * 100),
          severity: ['CRITICAL', 'HIGH', 'MEDIUM'][Math.floor(Math.random() * 3)] as AlertSeverity,
          ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          status: 'active',
        }
        dispatch({ type: 'ADD_ALERT', payload: newAlert })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [state])

  return (
    <section id="dashboard" className="section-container">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="section-header">
          <h2 className="section-title">Live Security Dashboard</h2>
          <p className="section-subtitle">Real-time monitoring of database activities and security threats</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <DashboardFrame>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
            {/* Left Column - Alerts */}
            <div className="lg:col-span-1">
              <AlertsPanel alerts={state.alerts} />
            </div>

            {/* Middle Column - Security Score */}
            <div className="lg:col-span-1">
              <SecurityScore score={Math.round(state.securityScore)} />
            </div>

            {/* Right Column - Metrics */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div className="space-y-4">
                {[
                  { label: 'Queries Monitored', value: state.queriesMonitored, suffix: '' },
                  { label: 'Threats Blocked', value: state.threatsBlocked, suffix: '' },
                  { label: 'Avg Response Time', value: '2.3', suffix: 'ms' },
                  { label: 'Active Connections', value: '1,247', suffix: '' },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="p-3 rounded-lg bg-black/40 dark:bg-black/60 border border-border dark:border-surface-border/50"
                    whileHover={{ borderColor: 'rgb(16, 185, 129)' }}
                  >
                    <p className="text-xs text-slate-700 dark:text-slate-700 dark:text-gray-300 font-semibold mb-1 font-medium">{metric.label}</p>
                    <p className="text-lg font-bold text-primary">
                      {typeof metric.value === 'number' && metric.value > 1000
                        ? (metric.value / 1000000).toFixed(2) + 'M'
                        : metric.value.toLocaleString()}
                      {metric.suffix && <span className="text-xs text-slate-600 dark:text-slate-700 dark:text-gray-300 font-semibold ml-1">{metric.suffix}</span>}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Status Badge */}
              <motion.div
                className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-center"
                animate={{ borderColor: ['rgb(34, 197, 94)', 'rgb(16, 185, 129)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xs font-semibold text-green-600">● System Operational</p>
              </motion.div>
            </div>
          </div>
        </DashboardFrame>
      </div>
    </section>
  )
}
