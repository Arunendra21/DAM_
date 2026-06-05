import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white dark:bg-surface-card p-6 shadow-sm transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

export function GlassCard({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card dark:glass-card rounded-2xl p-6 transition-all duration-300 hover:border-primary/30',
        className
      )}
    >
      {children}
    </div>
  )
}
