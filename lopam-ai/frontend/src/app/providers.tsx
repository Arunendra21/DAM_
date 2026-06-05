'use client'

import { CursorProvider } from '@/components/cursor/CursorContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CursorProvider>{children}</CursorProvider>
  )
}
