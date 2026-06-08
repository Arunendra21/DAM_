import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/seo/site'

// Real, server-generated Open Graph / Twitter image (1200x630).
export const runtime = 'edge'
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 40,
            color: '#38bdf8',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Enterprise Database Security &amp; Activity Monitoring
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: '#94a3b8',
            maxWidth: 950,
          }}
        >
          Real-time monitoring, access control, threat detection &amp; compliance.
        </div>
      </div>
    ),
    { ...size }
  )
}
