/** @type {import('next').NextConfig} */

// Allow the browser to talk to the backend API (and websockets in dev) under CSP.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
const connectSrc = [
  "'self'",
  apiUrl,
  'https://formsubmit.co',
  process.env.NODE_ENV === 'development' ? 'ws: http://localhost:*' : '',
]
  .filter(Boolean)
  .join(' ')

// Content Security Policy.
// 'unsafe-inline'/'unsafe-eval' are required by Next.js runtime + the 3D
// (three.js) and animation (GSAP/framer-motion) libraries this app uses; the
// remaining directives still block clickjacking, object/embed injection and
// base-tag hijacking.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src ${connectSrc}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
]

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspDirectives.join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // Strip console.* (except warn/error) from the production client bundle to cut
  // parse/execute time. No effect in development.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  // Tree-shake large barrel-file packages so only the icons/components actually
  // used are bundled. Big win for lucide-react (73 files) and framer-motion.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Immutable long-term caching for hashed build assets.
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache the self-hosted fonts aggressively.
        source: '/:path*\\.(woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
