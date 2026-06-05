'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { getAccessToken, removeTokens } from '@/lib/api/client'
import { Sidebar } from '@/components/dashboard/enterprise/Sidebar'
import { Navbar } from '@/components/dashboard/enterprise/Navbar'
import { KPICards } from '@/components/dashboard/enterprise/KPICards'
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
  // Fixed: Removed missing widget imports
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader className="w-16 h-16 animate-spin mx-auto text-blue-400 mb-4" />
          <p className="text-gray-300 text-lg">Loading Enterprise Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Layout Container */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar onLogout={handleLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Content Wrapper */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Page Title */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Enterprise Dashboard
                </h1>
                <p className="text-gray-400">
                  Real-time monitoring and management of your database infrastructure
                </p>
              </motion.div>

              {/* KPI Cards */}
              <KPICards data={enterpriseDashboardData.kpis} />

              {/* Main Grid - Charts and Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column - 2 span */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Database Distribution & Growth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DatabaseDistributionWidget data={enterpriseDashboardData.databaseDistribution} />
                    <DatabaseHealthStatus data={enterpriseDashboardData.healthStatus} />
                  </div>

                  {/* Database Growth Trend */}
                  <DatabaseGrowthTrend data={enterpriseDashboardData.growthTrend} />

                  {/* Query Monitoring */}
                  <QueryMonitoring data={enterpriseDashboardData.queryMonitoring} />

                  {/* Storage Consumption */}
                  <StorageConsumption data={enterpriseDashboardData.storageData} />
                </div>

                {/* Right Column - 1 span */}
                <div className="space-y-6">
                  {/* Top Databases */}
                  <TopDatabasesByLoad data={enterpriseDashboardData.topDatabasesByLoad} />

                  {/* Access Requests */}
                  <AccessRequestOverview data={enterpriseDashboardData.accessRequests} />

                  {/* System Health */}
                  <SystemHealthPanel data={enterpriseDashboardData.systemHealth} />
                </div>
              </div>

              {/* Activities and Alerts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <RecentActivities data={enterpriseDashboardData.recentActivities} />
                </div>

                {/* Security Alerts */}
                <SecurityAlertCenter data={enterpriseDashboardData.securityAlerts} />
              </div>

              {/* Footer Spacing */}
              <div className="h-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
