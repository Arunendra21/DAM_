'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ActivityAnalyticsData {
  weeklyAccess: Array<{ day: string; value: number }>
  monthlyQueries: Array<{ month: string; value: number }>
  databaseUsage: Array<{ name: string; value: number }>
  accessTrends: Array<{ week: string; approved: number; rejected: number; pending: number }>
}

interface ActivityAnalyticsProps {
  data: ActivityAnalyticsData
}

export default function ActivityAnalytics({ data }: ActivityAnalyticsProps) {
  const colors = ['#06b6d4', '#0891b2', '#06d6a6', '#fbbf24', '#f97316']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Access Activity Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Access Activity */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">Weekly Database Access</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.weeklyAccess}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="day" stroke="rgba(100,116,139,0.5)" />
              <YAxis stroke="rgba(100,116,139,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Queries */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">Monthly Query Execution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.monthlyQueries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="month" stroke="rgba(100,116,139,0.5)" />
              <YAxis stroke="rgba(100,116,139,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Database Usage Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">Database Usage Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.databaseUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.databaseUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.databaseUsage.map((db, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{db.name}</span>
                <span className="text-white font-medium">{db.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Access Request Trends */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">Access Request Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.accessTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="week" stroke="rgba(100,116,139,0.5)" />
              <YAxis stroke="rgba(100,116,139,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}
