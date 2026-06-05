'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, Eye, Trash2, Edit2 } from 'lucide-react'

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  searchPlaceholder?: string
  title?: string
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = 'Search...',
  title,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key]
        return value?.toString().toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [data, search, columns])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortOrder])

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 rounded-xl backdrop-blur-md p-6">
      {title && (
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/30">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-300 ${
                    col.sortable ? 'cursor-pointer hover:text-gray-200' : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          sortKey === col.key
                            ? sortOrder === 'asc'
                              ? 'rotate-180'
                              : ''
                            : 'opacity-0'
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => (
                <motion.tr
                  key={row.id || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-slate-700/20 hover:bg-slate-800/30 transition"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-300">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-1 hover:bg-blue-500/20 rounded transition"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-blue-400" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1 hover:bg-yellow-500/20 rounded transition"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-yellow-400" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1 hover:bg-red-500/20 rounded transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-500">
        Showing {sortedData.length} of {data.length} entries
      </div>
    </div>
  )
}
