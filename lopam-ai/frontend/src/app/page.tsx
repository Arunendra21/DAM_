import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { CoreFeatures } from '@/components/sections/CoreFeatures'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { SecurityAnalytics } from '@/components/sections/SecurityAnalytics'
import { Compliance } from '@/components/sections/Compliance'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { PlatformOverview } from '@/components/sections/PlatformOverview'
import { KeyBenefits } from '@/components/sections/KeyBenefits'
import { SupportedDatabases } from '@/components/sections/SupportedDatabases'
import { SolutionsPreview } from '@/components/sections/SolutionsPreview'

export const metadata: Metadata = {
  title: 'Lopam AI - Enterprise Database Access Management Platform',
  description:
    'Real-time database monitoring, threat detection, and compliance automation for enterprise security. Protect your databases with AI-powered threat detection.',
  keywords: [
    'database security',
    'DAM',
    'database access management',
    'threat detection',
    'compliance',
    'PCI-DSS',
    'HIPAA',
    'GDPR',
  ],
  metadataBase: new URL('https://lopam-ai.com'),
  canonical: 'https://lopam-ai.com',
  openGraph: {
    title: 'Lopam AI - Enterprise Database Security',
    description: 'Real-time database monitoring and threat detection for enterprises',
    url: 'https://lopam-ai.com',
    siteName: 'Lopam AI',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lopam AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lopam AI - Enterprise Database Security',
    description: 'Real-time database monitoring and threat detection',
  },
  robots: 'index, follow',
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <TrustedBy />
        <CoreFeatures />
        <PlatformOverview />
        <KeyBenefits />
        <SupportedDatabases />
        <DashboardPreview />
        <SecurityAnalytics />
        <Compliance />
        <SolutionsPreview />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
