'use client'

import { motion } from 'framer-motion'
import { Lock, CheckCircle, AlertCircle, LogIn, Key } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SecurityCenterPage() {
  const data = userPortalData.securityCenter

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Security Center</h1>
          </div>
          <p className="text-gray-400">Monitor your account security posture</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid md:grid-cols-2 gap-6">
          {/* Security Score */}
          <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(data.overallScore / 100) * 282.7} 282.7`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{data.overallScore}%</span>
                <span className="text-sm text-gray-400">Security Score</span>
              </div>
            </div>
          </div>

          {/* Security Status Widgets */}
          <div className="space-y-3">
            {data.widgets.map((widget, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">{widget.name}</p>
                  <p className="text-xs text-gray-400">{widget.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Security Score Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="month" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Login Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.loginActivityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="day" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="successful" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="failed" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Security Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Security Timeline</h3>
          <div className="space-y-4">
            {data.timeline.map((event, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <motion.div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    {event.type === 'login' && <LogIn className="w-5 h-5 text-cyan-400" />}
                    {event.type === 'password' && <Key className="w-5 h-5 text-cyan-400" />}
                    {event.type === 'device' && <Lock className="w-5 h-5 text-cyan-400" />}
                    {event.type === 'alert' && <AlertCircle className="w-5 h-5 text-red-400" />}
                  </motion.div>
                  {idx < data.timeline.length - 1 && <div className="w-px h-12 bg-gradient-to-b from-cyan-500/20 to-transparent my-2" />}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-white">{event.event}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                  {event.device && <p className="text-xs text-gray-600 mt-1">{event.device}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
            {data.alerts.map((alert, idx) => (
              <div key={idx} className={`p-4 rounded-lg border flex items-center gap-2 ${alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {alert.message}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </UserDashboardLayout>
  )
}
