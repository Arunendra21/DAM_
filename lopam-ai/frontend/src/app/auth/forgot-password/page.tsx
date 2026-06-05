'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { forgotPassword } from '@/lib/api/auth-flow'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await forgotPassword(email)
      if (result.success) {
        setStep('otp')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { verifyOtp } = await import('@/lib/api/auth-flow')
      const result = await verifyOtp(email, otp)

      if (result.success && result.resetToken) {
        setResetToken(result.resetToken)
        setStep('reset')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    const password = (e.target as HTMLFormElement).querySelector('[name="password"]') as HTMLInputElement
    const confirmPassword = (e.target as HTMLFormElement).querySelector('[name="confirmPassword"]') as HTMLInputElement

    if (password.value !== confirmPassword.value) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { resetPassword } = await import('@/lib/api/auth-flow')
      const result = await resetPassword(resetToken, password.value)

      if (result.success) {
        router.push('/auth')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout variant="admin">
      <div className="relative z-20">
        {/* Step indicator */}
        <motion.div
          className="flex justify-between mb-8 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {['Email', 'OTP', 'Reset'].map((stepName, idx) => (
            <div
              key={stepName}
              className={`flex-1 text-center pb-2 border-b-2 ${
                (step === 'email' && idx === 0) ||
                (step === 'otp' && idx <= 1) ||
                (step === 'reset' && idx <= 2)
                  ? 'border-blue-500 text-blue-400'
                  : 'border-slate-700/50 text-gray-500'
              }`}
            >
              {stepName}
            </div>
          ))}
        </motion.div>

        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Step 1: Email */}
        {step === 'email' && (
          <motion.form
            onSubmit={handleRequestOtp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Forgot Your Password?</h2>
              <p className="text-gray-400">Enter your email address and we&apos;ll send you an OTP</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                disabled={isLoading}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                'Send OTP'
              )}
            </motion.button>
          </motion.form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <motion.form
            onSubmit={handleVerifyOtp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Verify OTP</h2>
              <p className="text-gray-400">Check your email for the 6-digit code</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">One-Time Password</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-center text-2xl tracking-widest"
                disabled={isLoading}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </motion.button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back
              </button>
            </div>
          </motion.form>
        )}

        {/* Step 3: Reset Password */}
        {step === 'reset' && (
          <motion.form
            onSubmit={handleResetPassword}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Reset Your Password</h2>
              <p className="text-gray-400">Enter your new password below</p>
            </div>

            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </motion.button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <button
                type="button"
                onClick={() => setStep('otp')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back
              </button>
            </div>
          </motion.form>
        )}

        {/* Back link */}
        <motion.div
          className="mt-8 pt-6 border-t border-slate-700/50 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/auth" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
            ← Back to Portal Selection
          </Link>
        </motion.div>
      </div>
    </AuthLayout>
  )
}
