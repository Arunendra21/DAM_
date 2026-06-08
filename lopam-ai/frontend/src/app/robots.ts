import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Authenticated / non-public areas should not be crawled or indexed.
        disallow: ['/dashboard', '/auth', '/cursor-demo', '/loading'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
