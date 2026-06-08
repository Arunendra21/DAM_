/**
 * Central site/SEO configuration.
 *
 * The canonical production URL is read from NEXT_PUBLIC_SITE_URL so it can be
 * overridden per environment (Vercel production vs. preview deployments).
 * It falls back to the known production domain.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dam-six-lake.vercel.app'

// Normalise: no trailing slash, so `${siteUrl}${path}` is always well-formed.
export const siteUrl = rawSiteUrl.replace(/\/$/, '')

export const siteConfig = {
  name: 'Lopam AI',
  shortName: 'Lopam AI',
  title: 'Lopam AI — Enterprise Database Security & Activity Monitoring',
  description:
    'Lopam AI is an enterprise Database Activity Monitoring (DAM) and access management platform. Get real-time monitoring, RBAC access control, AI-powered threat detection, and automated compliance for PCI-DSS, SOX, GDPR, HIPAA and ISO 27001.',
  url: siteUrl,
  ogImage: `${siteUrl}/og-image.png`,
  locale: 'en_US',
  keywords: [
    'database security',
    'database activity monitoring',
    'DAM platform',
    'database access management',
    'privileged access management',
    'RBAC',
    'compliance',
    'PCI-DSS',
    'GDPR',
    'SOX',
    'HIPAA',
    'threat detection',
    'audit logs',
    'data security',
  ],
  twitter: '@lopamai',
} as const
