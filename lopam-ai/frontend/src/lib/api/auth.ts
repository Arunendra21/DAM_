import { apiRequest, setAccessToken, setRefreshToken, removeTokens, getToken } from './client'

export interface LoginRequest {
  emailOrUsername: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    username: string
    firstName: string
    lastName: string
    roles: string[]
  }
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  password: string
}

export async function login(credentials: LoginRequest): Promise<LoginResponse | null> {
  const response = await apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: credentials,
    useAuth: false,
  })

  if (response.success && response.data) {
    setAccessToken(response.data.accessToken)
    setRefreshToken(response.data.refreshToken)
    return response.data
  }

  return null
}

export async function register(data: RegisterRequest): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Registration failed',
  }
}

export async function logout(): Promise<void> {
  try {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
    })
  } finally {
    removeTokens()
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    removeTokens()
    return null
  }

  const response = await apiRequest<{ accessToken: string; refreshToken: string }>('/api/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    useAuth: false,
  })

  if (response.success && response.data) {
    setAccessToken(response.data.accessToken)
    setRefreshToken(response.data.refreshToken)
    return response.data.accessToken
  }

  removeTokens()
  return null
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Password reset request failed',
  }
}

export async function resetPassword(data: ResetPasswordRequest): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/auth/reset-password', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Password reset failed',
  }
}

export async function setupMFA(): Promise<{ secret: string; qrCode: string } | null> {
  const response = await apiRequest<{ secret: string; qrCode: string }>(
    '/api/auth/mfa/setup',
    { method: 'POST' }
  )

  return response.success ? response.data || null : null
}

export async function verifyMFA(code: string): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/auth/mfa/verify', {
    method: 'POST',
    body: { code },
  })

  return {
    success: response.success,
    message: response.message || response.error || 'MFA verification failed',
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}

export function getCurrentUser(): LoginResponse['user'] | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

export function setCurrentUser(user: LoginResponse['user']): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}
