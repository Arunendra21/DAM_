'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { removeTokens } from '@/lib/api/client'
import { UserSidebar } from './user/UserSidebar'
import { NavbarNew } from './enterprise/NavbarNew'

interface UserDashboardLayoutProps {
  children: React.ReactNode
}

export function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    removeTokens()
    router.push('/auth')
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #031028 50%, #020617 100%)',
      }}
    >
      {/* Sidebar */}
      <UserSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

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
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
