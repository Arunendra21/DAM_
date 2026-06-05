import { apiRequest, setAccessToken, setRefreshToken } from './client'

export interface LoginRequest {
  emailOrUsername: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  email: string
  username?: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  organizationName?: string
  department?: string
  employeeId?: string
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

export interface RegisterResponse {
  success?: boolean
  message?: string
  details?: Array<{ message: string }>
}

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse | null> {
  const response = await apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: credentials,
    useAuth: false,
  })

  if (response.success && response.data) {
    setAccessToken(response.data.accessToken)
    setRefreshToken(response.data.refreshToken)

    // Store user data
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    // Store remember me
    if (credentials.rememberMe) {
      localStorage.setItem('rememberEmail', credentials.emailOrUsername)
    }

    return response.data
  }

  return null
}

export async function registerUser(data: RegisterRequest): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  if (!response.success) {
    // If there are validation details, format them nicely
    if (response.data?.details) {
      const details = response.data.details
      if (Array.isArray(details)) {
        const messages = details.map(d => d.message).join(', ')
        return {
          success: false,
          message: messages,
        }
      }
    }
    return {
      success: false,
      message: response.error || response.message || 'Registration failed',
    }
  }

  return {
    success: response.success,
    message: response.message || 'Registration successful',
  }
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/password/forgot-password', {
    method: 'POST',
    body: { email },
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to process forgot password',
  }
}

export async function verifyOtp(
  email: string,
  otp: string
): Promise<{ success: boolean; resetToken?: string; message: string }> {
  const response = await apiRequest<{ resetToken: string }>('/api/password/verify-otp', {
    method: 'POST',
    body: { email, otp },
    useAuth: false,
  })

  return {
    success: response.success,
    resetToken: response.data?.resetToken,
    message: response.message || response.error || 'OTP verification failed',
  }
}

export async function resetPassword(
  token: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/password/reset-password', {
    method: 'POST',
    body: { token, password },
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Password reset failed',
  }
}

export async function validateResetToken(token: string): Promise<boolean> {
  const response = await apiRequest<{ valid: boolean }>('/api/password/validate-token?token=' + token, {
    method: 'GET',
    useAuth: false,
  })

  return response.data?.valid || false
}

export function getRememberedEmail(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('rememberEmail')
}

export function clearRememberedEmail(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('rememberEmail')
}
