import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
  className?: string
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/25 dark:bg-primary/20 text-primary-dark dark:text-primary border border-primary/60 dark:border-primary/30 font-bold',
    secondary: 'bg-secondary/25 dark:bg-secondary/20 text-secondary dark:text-secondary border border-secondary/60 dark:border-secondary/30 font-bold',
    danger: 'bg-red-500/25 dark:bg-red-500/20 text-red-700 dark:text-red-500 border border-red-500/60 dark:border-red-500/30 font-bold',
    warning: 'bg-yellow-500/25 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500 border border-yellow-500/60 dark:border-yellow-500/30 font-bold',
    success: 'bg-green-500/25 dark:bg-green-500/20 text-green-700 dark:text-green-500 border border-green-500/60 dark:border-green-500/30 font-bold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
