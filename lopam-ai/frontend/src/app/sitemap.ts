import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo/site'
import { features } from '@/data/features'
import { solutions } from '@/data/solutions'
import { blogPosts } from '@/data/blog-posts'
import { caseStudies } from '@/data/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static public marketing/legal pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/resources/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/company/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/company/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/company/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Dynamic detail pages generated from the same data the pages render from.
  const featureRoutes: MetadataRoute.Sitemap = features.map((f) => ({
    url: `${siteUrl}/features/${f.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${siteUrl}/solutions/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/resources/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${siteUrl}/resources/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    ...staticRoutes,
    ...featureRoutes,
    ...solutionRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ]
}
