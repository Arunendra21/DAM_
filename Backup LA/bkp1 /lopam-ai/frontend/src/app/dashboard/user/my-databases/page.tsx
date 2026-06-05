'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Search, Filter, Download, Eye, Plus, TrendingUp } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userPortalData } from '@/lib/dashboard/user-portal-complete-data'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MyDatabasesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEnv, setFilterEnv] = useState('All')
  const data = userPortalData.myDatabases

  const filtered = data.databases.filter(
    (db) =>
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterEnv === 'All' || db.environment === filterEnv)
  )

  const colors = ['#06b6d4', '#0891b2', '#06d6a6', '#fbbf24', '#f97316']

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">My Databases</h1>
          </div>
          <p className="text-gray-400">View and manage all databases you can access</p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Databases', value: data.stats.total, icon: Database },
            { label: 'Production', value: data.stats.production, icon: TrendingUp },
            { label: 'Development', value: data.stats.development, icon: Database },
            { label: 'Staging', value: data.stats.staging, icon: Database },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-cyan-400/50" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Database Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data.usageDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {data.usageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Access Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="day" stroke="rgba(100,116,139,0.5)" />
                <YAxis stroke="rgba(100,116,139,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="accesses" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search databases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={filterEnv}
            onChange={(e) => setFilterEnv(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option>All</option>
            <option>Production</option>
            <option>Development</option>
            <option>Staging</option>
          </select>

          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 transition">
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </motion.div>

        {/* Databases Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="overflow-x-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
          <table className="w-full">
            <thead className="bg-slate-900/80 border-b border-slate-700/50">
              <tr>
                {['Database Name', 'Type', 'Environment', 'Access Level', 'Storage', 'Last Accessed', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((db, idx) => (
                <motion.tr key={db.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{db.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{db.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${db.environment === 'Production' ? 'bg-red-500/10 border-red-500/20 text-red-300' : db.environment === 'Development' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'}`}>
                      {db.environment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{db.accessLevel}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{db.storageSize}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{db.lastAccessed}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <motion.button whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition text-xs font-medium">
                      <Eye className="w-3 h-3" />
                      Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-sm text-gray-400">Showing {filtered.length} of {data.databases.length} databases</p>
      </div>
    </UserDashboardLayout>
  )
}
