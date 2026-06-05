'use client'

import { motion } from 'framer-motion'
import { Activity, MapPin } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ActiveSessionsPage() {
  const data = userPortalData.activeSessions
  const colors = ['#06b6d4', '#0891b2', '#06d6a6', '#fbbf24', '#f97316']

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Active Sessions</h1>
          </div>
          <p className="text-gray-400">Monitor your current database sessions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Active Sessions', value: data.stats.activeSessions },
            { label: 'Avg Session Time', value: data.stats.avgSessionTime },
            { label: 'Active Devices', value: data.stats.activeDevices },
            { label: 'Current Connections', value: data.stats.currentConnections },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
            >
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Session Activity Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.activityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="time" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Connection Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data.connectionDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {data.connectionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="overflow-x-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
          <table className="w-full">
            <thead className="bg-slate-900/80 border-b border-slate-700/50">
              <tr>
                {['Database', 'Login Time', 'Duration', 'Device', 'IP Address', 'Location', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {data.sessions.map((session, idx) => (
                <motion.tr key={session.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{session.database}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{session.loginTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{session.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{session.device}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">{session.ipAddress}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {session.location}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition text-xs font-medium">
                      Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </UserDashboardLayout>
  )
}
