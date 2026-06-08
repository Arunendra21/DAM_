import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { CoreFeatures } from '@/components/sections/CoreFeatures'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { SecurityAnalytics } from '@/components/sections/SecurityAnalytics'
import { Compliance } from '@/components/sections/Compliance'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { PlatformOverview } from '@/components/sections/PlatformOverview'
import { KeyBenefits } from '@/components/sections/KeyBenefits'
import { SupportedDatabases } from '@/components/sections/SupportedDatabases'
import { SolutionsPreview } from '@/components/sections/SolutionsPreview'

export const metadata: Metadata = {
  title: 'Lopam DAM - Enterprise Database Access Management Platform',
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
  // metadataBase, OG/Twitter images and robots are inherited from the root
  // layout. The OG/Twitter image is the real generated app/opengraph-image.tsx
  // (the previous static /og-image.jpg did not exist and returned 404).
  openGraph: {
    title: 'Lopam DAM - Enterprise Database Security',
    description: 'Real-time database monitoring and threat detection for enterprises',
    url: '/',
    siteName: 'Lopam DAM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lopam DAM - Enterprise Database Security',
    description: 'Real-time database monitoring and threat detection',
  },
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
        {/* <Testimonials /> */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
