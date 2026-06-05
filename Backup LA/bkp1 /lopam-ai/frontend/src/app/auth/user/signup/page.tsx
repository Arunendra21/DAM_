'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { registerUser } from '@/lib/api/auth-flow'
import { motion } from 'framer-motion'

export default function UserSignup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true)
    setError('')

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
        setTimeout(() => {
          router.push('/auth/user/login')
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
      <AuthLayout variant="user">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-4 text-5xl">✓</div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 mb-4">
            Your user account has been successfully created. Redirecting to login...
          </p>
          <div className="text-sm text-gray-500">Please wait or click below to continue</div>
          <Link href="/auth/user/login" className="inline-block mt-4 text-purple-400 hover:text-purple-300">
            Go to Login →
          </Link>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout variant="user">
      <div className="relative z-20">
        {/* Logo/Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Lopam AI
          </h1>
          <p className="text-xs text-gray-400 mt-1">User Portal</p>
        </motion.div>

        <AuthForm
          title="Create User Account"
          subtitle="Register to access the platform"
          isSignup={true}
          fields={[
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'you@company.com',
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
