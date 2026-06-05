'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { UserDashboardLayout } from '@/components/dashboard/UserDashboardLayout'
import { userDamDashboardData } from '@/lib/dashboard/user-dam-data'
import UserTopStats from '@/components/dashboard/user/UserTopStats'
import DatabaseAccessTable from '@/components/dashboard/user/DatabaseAccessTable'
import AccessRequestCenter from '@/components/dashboard/user/AccessRequestCenter'
import ActiveSessionsTable from '@/components/dashboard/user/ActiveSessionsTable'
import RolesPermissionsPanel from '@/components/dashboard/user/RolesPermissionsPanel'
import SecurityCenter from '@/components/dashboard/user/SecurityCenter'
import ActivityAnalytics from '@/components/dashboard/user/ActivityAnalytics'
import RecentActivityTimeline from '@/components/dashboard/user/RecentActivityTimeline'
import PerformanceInsights from '@/components/dashboard/user/PerformanceInsights'
import NotificationCenter from '@/components/dashboard/user/NotificationCenter'
import AuditLogs from '@/components/dashboard/user/AuditLogs'
import UserProfilePanel from '@/components/dashboard/user/UserProfilePanel'
import QuickActionsSection from '@/components/dashboard/user/QuickActionsSection'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showRequestModal, setShowRequestModal] = useState(false)

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <UserDashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold text-white">Database Access Portal</h1>
          <p className="text-gray-400">Manage your database access, permissions, and security</p>
        </motion.div>

        {/* Top Statistics */}
        <UserTopStats stats={userDamDashboardData.topStats} />

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-4 border-b border-slate-700/50"
        >
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'databases', label: 'My Databases' },
            { id: 'requests', label: 'Access Requests' },
            { id: 'sessions', label: 'Active Sessions' },
            { id: 'security', label: 'Security Center' },
            { id: 'audit', label: 'Audit Logs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/50'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <QuickActionsSection />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Analytics & Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Security Center */}
                <SecurityCenter data={userDamDashboardData.securityCenter} />

                {/* Activity Analytics */}
                <ActivityAnalytics data={userDamDashboardData.activityAnalytics} />

                {/* Performance Insights */}
                <PerformanceInsights data={userDamDashboardData.performanceInsights} />
              </div>

              {/* Right Column - User Profile & Notifications */}
              <div className="space-y-6">
                {/* User Profile */}
                <UserProfilePanel profile={userDamDashboardData.userProfile} />

                {/* Notifications */}
                <NotificationCenter notifications={userDamDashboardData.notifications} />
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivityTimeline activities={userDamDashboardData.recentActivity} />
          </motion.div>
        )}

        {/* Databases Tab */}
        {activeTab === 'databases' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <DatabaseAccessTable databases={userDamDashboardData.accessibleDatabases} />
          </motion.div>
        )}

        {/* Access Requests Tab */}
        {activeTab === 'requests' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowRequestModal(true)}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Request New Access
              </motion.button>
            </div>
            <AccessRequestCenter
              requests={userDamDashboardData.accessRequests}
              onNewRequest={() => setShowRequestModal(true)}
              showModal={showRequestModal}
              setShowModal={setShowRequestModal}
            />
          </motion.div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <ActiveSessionsTable sessions={userDamDashboardData.activeSessions} />
          </motion.div>
        )}

        {/* Roles & Permissions Tab */}
        <motion.div
          className={activeTab === 'roles' ? 'block' : 'hidden'}
          variants={tabVariants}
          initial="hidden"
          animate={activeTab === 'roles' ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        >
          <RolesPermissionsPanel roles={userDamDashboardData.userRoles} />
        </motion.div>

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <SecurityCenter data={userDamDashboardData.securityCenter} expanded={true} />
          </motion.div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <AuditLogs logs={userDamDashboardData.auditLogs} />
          </motion.div>
        )}
      </div>
    </UserDashboardLayout>
  )
}
