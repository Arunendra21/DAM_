'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, EyeOff, Loader, Sparkles } from 'lucide-react'

interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
  required?: boolean
}

interface AuthFormProps {
  title: string
  subtitle: string
  fields: FormField[]
  submitButtonText: string
  onSubmit: (data: Record<string, string>) => Promise<void>
  isLoading?: boolean
  error?: string
  showRememberMe?: boolean
  variant?: 'admin' | 'user'
  isSignup?: boolean
}

export function AuthForm({
  title,
  subtitle,
  fields,
  submitButtonText,
  onSubmit,
  isLoading = false,
  error = '',
  showRememberMe = false,
  variant = 'admin',
  isSignup = false,
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [localError, setLocalError] = useState('')

  const accentColor = variant === 'admin' ? '#16E0B5' : '#00FFC3'
  const accentColorGlow = variant === 'admin' ? 'rgba(22,224,181,0.25)' : 'rgba(0,255,195,0.25)'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit({ ...formData, rememberMe: rememberMe.toString() })
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-8">
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
          <span
            className="text-xs font-bold tracking-wider uppercase"
            style={{ color: accentColor }}
          >
            {variant === 'admin' ? 'Admin Portal' : 'User Portal'}
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-sm"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Error Message */}
      {(error || localError) && (
        <motion.div
          className="mb-6 p-4 rounded-lg border"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#FCA5A5',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-medium">{error || localError}</p>
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="space-y-5 mb-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <label
              className="block text-sm font-semibold mb-2 transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {field.label}
              {field.required !== false && <span style={{ color: '#FF6B6B' }}>*</span>}
            </label>

            <div className="relative group">
              <input
                type={
                  field.type === 'password' && showPassword[field.name]
                    ? 'text'
                    : field.type
                }
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none border transition-all duration-300 font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(22,224,181,0.12)',
                  color: '#FFFFFF',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = accentColor
                  e.currentTarget.style.boxShadow = `0 0 15px ${accentColorGlow}`
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(22,224,181,0.12)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              />

              {/* Password visibility toggle */}
              {field.type === 'password' && (
                <motion.button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name],
                    }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accentColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {showPassword[field.name] ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Remember Me */}
      {showRememberMe && (
        <motion.div
          className="flex items-center mb-6 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 rounded border transition-colors duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${accentColor}`,
              cursor: 'pointer',
              accentColor: accentColor,
            }}
          />
          <label
            htmlFor="remember"
            className="ml-3 text-sm cursor-pointer transition-colors duration-200 group-hover:text-white"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Remember me for 30 days
          </label>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 border flex items-center justify-center disabled:opacity-50"
        style={{
          background: `linear-gradient(90deg, ${variant === 'admin' ? '#16E0B5' : '#00FFC3'}, ${variant === 'admin' ? '#00FFC3' : '#36E4DA'})`,
          color: '#020617',
          border: `1px solid ${accentColor}`,
        }}
        whileHover={{
          scale: isLoading ? 1 : 1.02,
          boxShadow: `0 0 30px ${accentColorGlow}`,
        }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.boxShadow = `0 0 30px ${accentColorGlow}`
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin mr-2" size={18} />
            <span>Authenticating...</span>
          </>
        ) : (
          submitButtonText
        )}
      </motion.button>

      {/* Divider */}
      <motion.div
        className="my-6 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(22,224,181,0.2), transparent)',
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-xs">
          Or
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(22,224,181,0.2), transparent)',
          }}
        />
      </motion.div>

      {/* Additional Links */}
      <motion.div
        className="space-y-3 text-center text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        {!isSignup && (
          <div>
            <a
              href="/auth/forgot-password"
              className="transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              Forgot your password?
            </a>
          </div>
        )}

        <div style={{ color: 'rgba(255,255,255,0.55)' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <a
            href={
              isSignup
                ? variant === 'admin'
                  ? '/auth/admin/login'
                  : '/auth/user/login'
                : variant === 'admin'
                  ? '/auth/admin/signup'
                  : '/auth/user/signup'
            }
            className="transition-colors duration-300"
            style={{ color: accentColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </a>
        </div>

        <div className="pt-3 border-t" style={{ borderColor: 'rgba(22,224,181,0.1)' }}>
          <a
            href="/auth"
            className="transition-colors duration-300 flex items-center justify-center gap-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            ← Back to Portal Selection
          </a>
        </div>
      </motion.div>
    </motion.form>
  )
}
