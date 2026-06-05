'use client'

import { motion } from 'framer-motion'
import { Eye, MapPin } from 'lucide-react'

interface Session {
  id: string
  database: string
  startTime: string
  duration: string
  device: string
  ipAddress: string
  location: string
  status: string
}

interface ActiveSessionsTableProps {
  sessions: Session[]
}

export default function ActiveSessionsTable({ sessions }: ActiveSessionsTableProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
        <table className="w-full">
          <thead className="bg-slate-900/80 border-b border-slate-700/50">
            <tr>
              {[
                'Database',
                'Start Time',
                'Duration',
                'Device',
                'IP Address',
                'Location',
                'Status',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {sessions.map((session, idx) => (
              <motion.tr
                key={session.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">{session.database}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{session.startTime}</td>
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
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition text-xs font-medium">
                    <Eye className="w-3 h-3" />
                    Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
