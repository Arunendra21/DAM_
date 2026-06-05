'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg dark:shadow-glow-sm hover:shadow-glow-md',
    secondary: 'border-2 border-primary text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 font-bold hover:shadow-md',
    ghost: 'text-primary hover:bg-primary/10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      type={props.type}
      onClick={props.onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className, {
        'opacity-50 cursor-not-allowed': disabled || isLoading,
      })}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </motion.button>
  )
}
