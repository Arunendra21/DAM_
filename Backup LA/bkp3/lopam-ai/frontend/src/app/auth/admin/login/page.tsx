'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { loginUser, getRememberedEmail } from '@/lib/api/auth-flow'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [initialEmail, setInitialEmail] = useState('')

  useEffect(() => {
    // Pre-fill email if "Remember Me" was checked
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
        // Redirect based on role
        const adminRoles = ['SUPER_ADMIN', 'SECURITY_ADMIN', 'DBA', 'AUDITOR']
        const userRoles = result.user.roles

        if (userRoles.some((role) => adminRoles.includes(role))) {
          router.push('/loading')
        } else {
          setError('You do not have admin access. Please use the User Portal.')
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
    <AuthLayout variant="admin">
      <div className="relative z-20">
        {/* Logo/Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Lopam AI
          </h1>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
        </motion.div>

        <AuthForm
          title="Welcome Back"
          subtitle="Securely access your Database Activity Monitoring platform"
          fields={[
            {
              name: 'emailOrUsername',
              label: 'Email or Username',
              type: 'text',
              placeholder: 'admin@lopam.ai',
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
          variant="admin"
        />
      </div>
    </AuthLayout>
  )
}
