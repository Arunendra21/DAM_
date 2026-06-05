import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api/client'

export interface CurrentUser {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  phone: string
  roles: string[]
  status: string
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First, try to get user from localStorage (set during login)
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user')
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser)
              setUser(userData)
              setIsLoading(false)
              return
            } catch (e) {
              // If localStorage data is invalid, try API
            }
          }
        }

        // Fallback: fetch from API
        const response = await apiRequest<CurrentUser>('/api/auth/me', { useAuth: true })
        if (response.success && response.data) {
          setUser(response.data)
          // Cache in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data))
          }
        } else {
          setError(response.error || 'Failed to fetch user')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading, error }
}
