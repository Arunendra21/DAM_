'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { getAccessToken, removeTokens } from '@/lib/api/client'
import { CustomCursor } from '@/components/cursors/CustomCursor'
import { SidebarNew } from '@/components/dashboard/enterprise/SidebarNew'
import { NavbarNew } from '@/components/dashboard/enterprise/NavbarNew'
import { KPICardsNew } from '@/components/dashboard/enterprise/KPICardsNew'
import { DatabaseDistributionWidget } from '@/components/dashboard/enterprise/widgets/DatabaseDistributionWidget'
import { DatabaseGrowthTrend } from '@/components/dashboard/enterprise/widgets/DatabaseGrowthTrend'
import { QueryMonitoring } from '@/components/dashboard/enterprise/widgets/QueryMonitoring'
import { TopDatabasesByLoad } from '@/components/dashboard/enterprise/widgets/TopDatabasesByLoad'
import { AccessRequestOverview } from '@/components/dashboard/enterprise/widgets/AccessRequestOverview'
import { RecentActivities } from '@/components/dashboard/enterprise/widgets/RecentActivities'
import { SecurityAlertCenter } from '@/components/dashboard/enterprise/widgets/SecurityAlertCenter'
import { DatabaseHealthStatus } from '@/components/dashboard/enterprise/widgets/DatabaseHealthStatus'
import { StorageConsumption } from '@/components/dashboard/enterprise/widgets/StorageConsumption'
import { SystemHealthPanel } from '@/components/dashboard/enterprise/widgets/SystemHealthPanel'
import { enterpriseDashboardData } from '@/lib/dashboard/enterprise-data'

export default function EnterpriseDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.push('/auth')
      return
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [router])

  const handleLogout = () => {
    removeTokens()
    router.push('/auth')
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #020617 0%, #031028 50%, #020617 100%)',
        }}
      >
        <CustomCursor />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4"
            style={{
              borderRadius: '50%',
              border: '3px solid rgba(22,224,181,0.2)',
              borderTop: '3px solid #16E0B5',
            }}
          />
          <p className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Loading Enterprise Dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #031028 50%, #020617 100%)',
      }}
    >
      <CustomCursor />

      {/* Sidebar */}
      <SidebarNew open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarNew
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Content Wrapper */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Enterprise Dashboard</h1>
              <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                Real-time monitoring and management of your database infrastructure
              </p>
            </motion.div>

            {/* KPI Cards */}
            <KPICardsNew data={enterpriseDashboardData.kpis} />

            {/* Main Grid - Charts and Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mt-8">
              {/* Left Column - 2 span */}
              <div className="lg:col-span-2 space-y-6">
                {/* Database Distribution & Growth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DatabaseDistributionWidget data={enterpriseDashboardData.databaseDistribution} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <DatabaseHealthStatus data={enterpriseDashboardData.healthStatus} />
                  </motion.div>
                </div>

                {/* Database Growth Trend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <DatabaseGrowthTrend data={enterpriseDashboardData.growthTrend} />
                </motion.div>

                {/* Query Monitoring */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <QueryMonitoring data={enterpriseDashboardData.queryMonitoring} />
                </motion.div>

                {/* Storage Consumption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <StorageConsumption data={enterpriseDashboardData.storageData} />
                </motion.div>
              </div>

              {/* Right Column - 1 span */}
              <div className="space-y-6">
                {/* Top Databases */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TopDatabasesByLoad data={enterpriseDashboardData.topDatabasesByLoad} />
                </motion.div>

                {/* Access Requests */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <AccessRequestOverview data={enterpriseDashboardData.accessRequests} />
                </motion.div>

                {/* System Health */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SystemHealthPanel data={enterpriseDashboardData.systemHealth} />
                </motion.div>
              </div>
            </div>

            {/* Activities and Alerts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Activities */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <RecentActivities data={enterpriseDashboardData.recentActivities} />
              </motion.div>

              {/* Security Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SecurityAlertCenter data={enterpriseDashboardData.securityAlerts} />
              </motion.div>
            </div>

            {/* Footer Spacing */}
            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  )
}
