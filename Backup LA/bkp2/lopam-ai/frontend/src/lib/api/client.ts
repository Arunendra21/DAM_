// API Client for Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: unknown
  useAuth?: boolean
}

async function refreshAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return null

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return data.accessToken
  } catch {
    return null
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    useAuth = true,
  } = options

  const url = `${API_BASE_URL}${endpoint}`

  // Add auth token if available
  const allHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  let token: string | null = null
  if (useAuth) {
    token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (token) {
      allHeaders['Authorization'] = `Bearer ${token}`
    }
  }

  const config: RequestInit = {
    method,
    headers: allHeaders,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    let response = await fetch(url, config)

    // Handle 401 - try to refresh token
    if (response.status === 401 && useAuth) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        allHeaders['Authorization'] = `Bearer ${newToken}`
        response = await fetch(url, {
          ...config,
          headers: allHeaders,
        })
      } else {
        // Redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
        }
        return {
          success: false,
          error: 'Authentication expired',
        }
      }
    }

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        data: error,
        error: error.error || error.message || `HTTP ${response.status}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data.data || data,
      message: data.message,
    }
  } catch (error) {
    console.error('API request failed:', error)
    return {
      success: false,
      error: 'Network error. Please try again later.',
    }
  }
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('accessToken', token)
}

export function setRefreshToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('refreshToken', token)
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}

export function removeTokens(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  localStorage.removeItem('rememberEmail')
}

// Legacy function names for compatibility
export function getToken(): string | null {
  return getAccessToken()
}

export function setToken(token: string): void {
  setAccessToken(token)
}

export function removeToken(): void {
  removeTokens()
}

export { apiRequest }
