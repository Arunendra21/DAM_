'use client'

import { motion } from 'framer-motion'
import { BarChart, Plus, Download, Calendar } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ReportsPage() {
  const data = userPortalData.reports

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BarChart className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">Reports</h1>
            </div>
            <p className="text-gray-400">Generate and manage your reports</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Generate Report
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Reports Generated', value: data.stats.generated },
            { label: 'Downloads', value: data.stats.downloads },
            { label: 'Scheduled', value: data.stats.scheduled },
            { label: 'Usage Reports', value: data.stats.usageReports },
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
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Usage</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.monthlyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="month" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="usage" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Query Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={data.queryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="week" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="queries" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Data Access Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.dataAccessVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="day" stroke="rgba(100,116,139,0.5)" />
              <YAxis stroke="rgba(100,116,139,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.reportTypes.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-white">{report.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{report.description}</p>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-cyan-500/10 rounded transition">
                  <Download className="w-4 h-4 text-cyan-400" />
                </motion.button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <Calendar className="w-3 h-3" />
                Last Generated: {report.lastGenerated}
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {report.format.map((fmt) => (
                  <span key={fmt} className="px-2 py-1 rounded bg-slate-800/30 text-xs text-gray-300">
                    {fmt}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </UserDashboardLayout>
  )
}
