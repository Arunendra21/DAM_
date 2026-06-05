import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/styles/design-system.css'
import { Providers } from './providers'
import { CustomCursor } from '@/components/cursors/CustomCursor'
import { EntranceLoader } from '@/components/entrance/EntranceLoader'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Lopam AI - Enterprise Database Security',
  description: 'Database Activity Monitoring & Data Security Platform',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <CustomCursor />
          <EntranceLoader>
            {children}
          </EntranceLoader>
        </Providers>
      </body>
    </html>
  )
}
