'use client'

import { ThemeProvider } from 'next-themes'
import { CursorProvider } from '@/components/cursor/CursorContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <CursorProvider>{children}</CursorProvider>
    </ThemeProvider>
  )
}
