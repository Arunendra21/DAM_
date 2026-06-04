'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader, LogOut, Home } from 'lucide-react'
import { apiRequest, getAccessToken, removeTokens } from '@/lib/api/client'
import { CustomCursor } from '@/components/cursors/CustomCursor'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  roles: string[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.push('/auth')
      return
    }

    // Try to get user from localStorage first (cached during login)
    const cachedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    let userData: User | null = null

    if (cachedUser) {
      try {
        userData = JSON.parse(cachedUser)
        setUser(userData)
      } catch {
        userData = null
      }
    }

    // Redirect based on role (silent, no loading screen)
    if (userData) {
      const adminRoles = ['SUPER_ADMIN', 'SECURITY_ADMIN', 'DBA', 'AUDITOR']
      const hasAdminRole = userData.roles?.some((role: string) => adminRoles.includes(role))

      if (hasAdminRole) {
        router.push('/dashboard/admin')
      } else if (userData.roles?.includes('USER')) {
        router.push('/dashboard/user')
      } else {
        setError('No valid role assigned')
        setIsLoading(false)
      }
      return
    }

    // If no cached user, fetch from API
    apiRequest('/api/auth/me', { useAuth: true })
      .then((response) => {
        if (response.success && response.data) {
          userData = response.data.user || response.data
          setUser(userData)

          // Redirect based on role
          const adminRoles = ['SUPER_ADMIN', 'SECURITY_ADMIN', 'DBA', 'AUDITOR']
          const hasAdminRole = userData.roles?.some((role: string) => adminRoles.includes(role))

          if (hasAdminRole) {
            router.push('/dashboard/admin')
          } else if (userData.roles?.includes('USER')) {
            router.push('/dashboard/user')
          } else {
            setError('No valid role assigned')
          }
        } else {
          setError('Failed to load user data')
        }
      })
      .catch(() => {
        setError('Session expired. Please login again.')
        removeTokens()
        router.push('/auth')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [router])

  const handleLogout = () => {
    removeTokens()
    router.push('/auth')
  }

  // Don't show loading screen - redirect happens silently
  if (isLoading) {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 flex items-center justify-center px-4">
        <CustomCursor />
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-6 text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                Back to Login
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render nothing - redirect happens silently to admin/user dashboard
  return null
}
