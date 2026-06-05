'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { registerUser } from '@/lib/api/auth-flow'
import { motion } from 'framer-motion'

export default function AdminSignup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true)
    setError('')

    // Basic validation
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const result = await registerUser({
        email: data.email,
        username: data.email.split('@')[0],
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password,
      })

      if (result.success) {
        setSuccess(true)
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/auth/admin/login')
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout variant="admin">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-4 text-5xl">✓</div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 mb-4">
            Your admin account has been successfully created. Redirecting to login...
          </p>
          <div className="text-sm text-gray-500">Please wait or click below to continue</div>
          <Link
            href="/auth/admin/login"
            className="inline-block mt-4 text-blue-400 hover:text-blue-300"
          >
            Go to Login →
          </Link>
        </motion.div>
      </AuthLayout>
    )
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
          title="Create Admin Account"
          subtitle="Register as an administrator"
          isSignup={true}
          fields={[
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'admin@company.com',
              required: true,
            },
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              placeholder: 'John',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              placeholder: 'Doe',
              required: true,
            },
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              placeholder: '+1 (555) 123-4567',
              required: false,
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: '••••••••',
              required: true,
            },
            {
              name: 'confirmPassword',
              label: 'Confirm Password',
              type: 'password',
              placeholder: '••••••••',
              required: true,
            },
          ]}
          submitButtonText="Create Account"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </AuthLayout>
  )
}
