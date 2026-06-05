'use client'

import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassCard } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

const chartData = [
  { day: 'Mon', queries: 4200, anomalies: 24 },
  { day: 'Tue', queries: 3800, anomalies: 13 },
  { day: 'Wed', queries: 2800, anomalies: 9 },
  { day: 'Thu', queries: 2390, anomalies: 39 },
  { day: 'Fri', queries: 2490, anomalies: 21 },
  { day: 'Sat', queries: 2300, anomalies: 25 },
  { day: 'Sun', queries: 2490, anomalies: 47 },
]

export function SecurityAnalytics() {
  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <h2 className="section-title">Security Analytics</h2>
          <p className="section-subtitle">Real-time insights into your database security posture</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Chart */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <GlassCard>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Query Volume & Anomalies (7 days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
                  <XAxis dataKey="day" stroke="rgba(148, 163, 175, 0.6)" />
                  <YAxis stroke="rgba(148, 163, 175, 0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="queries"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorQueries)"
                  />
                  <Area
                    type="monotone"
                    dataKey="anomalies"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorAnomalies)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Stats */}
          <motion.div variants={staggerItem} className="flex flex-col gap-4">
            {[
              { label: 'Avg Queries/Day', value: '3,143', trend: '+12%' },
              { label: 'Anomalies/Week', value: '178', trend: '-5%' },
              { label: 'Threat Score', value: '34/100', trend: '-8%' },
              { label: 'Response Time', value: '2.3ms', trend: '-2%' },
            ].map((stat) => (
              <GlassCard key={stat.label}>
                <p className="text-sm text-slate-700 dark:text-gray-200 mb-2 font-bold">{stat.label}</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
