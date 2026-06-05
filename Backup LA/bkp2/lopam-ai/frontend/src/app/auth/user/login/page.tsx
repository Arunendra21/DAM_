'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { loginUser, getRememberedEmail } from '@/lib/api/auth-flow'
import { motion } from 'framer-motion'

export default function UserLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [initialEmail, setInitialEmail] = useState('')

  useEffect(() => {
    const remembered = getRememberedEmail()
    if (remembered) {
      setInitialEmail(remembered)
    }
  }, [])

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await loginUser({
        emailOrUsername: data.emailOrUsername,
        password: data.password,
        rememberMe: data.rememberMe === 'true',
      })

      if (result) {
        // Check if user has USER role (not admin roles)
        const adminRoles = ['SUPER_ADMIN', 'SECURITY_ADMIN', 'DBA', 'AUDITOR']
        const userRoles = result.user.roles

        if (userRoles.some((role) => adminRoles.includes(role))) {
          setError('This account has admin access. Please use the Admin Portal.')
        } else if (userRoles.includes('USER')) {
          router.push('/loading')
        } else {
          setError('You do not have user access.')
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout variant="user">
      <div className="relative z-20">
        <AuthForm
          title="Welcome Back"
          subtitle="Securely access your Database Activity Monitoring platform"
          fields={[
            {
              name: 'emailOrUsername',
              label: 'Email or Username',
              type: 'text',
              placeholder: 'you@example.com',
              required: true,
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: '••••••••',
              required: true,
            },
          ]}
          submitButtonText="Sign In Securely"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          showRememberMe={true}
          variant="user"
        />
      </div>
    </AuthLayout>
  )
}
