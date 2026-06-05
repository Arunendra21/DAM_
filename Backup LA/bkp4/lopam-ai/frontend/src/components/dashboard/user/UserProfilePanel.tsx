'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, MapPin, Edit, Lock, Smartphone, AlertCircle, Download } from 'lucide-react'

interface UserProfile {
  name: string
  employeeId: string
  department: string
  designation: string
  email: string
  phone: string
  lastLogin: string
  status: string
  avatar: string
}

interface UserProfilePanelProps {
  profile: UserProfile
}

export default function UserProfilePanel({ profile }: UserProfilePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-6 space-y-6"
    >
      {/* Profile Header */}
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-2xl font-bold text-cyan-400">{profile.avatar}</span>
        </motion.div>
        <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{profile.designation}</p>
        <p
          className={`text-xs mt-2 px-3 py-1 rounded-full w-fit mx-auto ${
            profile.status === 'Active'
              ? 'bg-green-500/10 text-green-300 border border-green-500/20'
              : 'bg-gray-500/10 text-gray-300 border border-gray-500/20'
          }`}
        >
          {profile.status}
        </p>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 text-sm">
          <AlertCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Employee ID</p>
            <p className="text-white font-medium">{profile.employeeId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Department</p>
            <p className="text-white font-medium">{profile.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Email</p>
            <p className="text-white font-medium text-xs">{profile.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Phone</p>
            <p className="text-white font-medium">{profile.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-gray-500 text-xs">Last Login</p>
            <p className="text-white font-medium">{profile.lastLogin}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 pt-4 border-t border-slate-700/50">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 transition font-medium text-sm">
          <Edit className="w-4 h-4" />
          Update Profile
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 text-gray-300 border border-slate-700/30 hover:border-slate-700/50 transition font-medium text-sm">
          <Lock className="w-4 h-4" />
          Change Password
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 text-gray-300 border border-slate-700/30 hover:border-slate-700/50 transition font-medium text-sm">
          <Smartphone className="w-4 h-4" />
          Manage 2FA
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 text-gray-300 border border-slate-700/30 hover:border-slate-700/50 transition font-medium text-sm">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>
    </motion.div>
  )
}
