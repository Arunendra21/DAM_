'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface Database {
  id: string
  name: string
  type: string
  environment: string
  accessLevel: string
  storageUsed: string
  lastAccessed: string
  status: string
  icon: string
}

interface DatabaseAccessTableProps {
  databases: Database[]
}

export default function DatabaseAccessTable({ databases }: DatabaseAccessTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEnv, setFilterEnv] = useState('All')

  const filtered = databases.filter(
    (db) =>
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterEnv === 'All' || db.environment === filterEnv)
  )

  const environmentColors = {
    Production: 'bg-red-500/10 border-red-500/20 text-red-300',
    Development: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    Staging: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  }

  const accessColors = {
    'Read Only': 'bg-blue-500/10 text-blue-300',
    'Read/Write': 'bg-purple-500/10 text-purple-300',
    Admin: 'bg-red-500/10 text-red-300',
    Read: 'bg-cyan-500/10 text-cyan-300',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40">
        <table className="w-full">
          <thead className="bg-slate-900/80 border-b border-slate-700/50">
            <tr>
              {[
                'Database Name',
                'Type',
                'Environment',
                'Access Level',
                'Storage Used',
                'Last Accessed',
                'Status',
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
            {filtered.map((db, idx) => (
              <motion.tr
                key={db.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">{db.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{db.type}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      environmentColors[
                        db.environment as keyof typeof environmentColors
                      ]
                    }`}
                  >
                    {db.environment}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      accessColors[db.accessLevel as keyof typeof accessColors]
                    }`}
                  >
                    {db.accessLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{db.storageUsed}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{db.lastAccessed}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    {db.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-400">
        Showing {filtered.length} of {databases.length} databases
      </div>
    </motion.div>
  )
}
