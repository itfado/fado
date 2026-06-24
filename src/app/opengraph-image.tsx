import { ImageResponse } from 'next/og'
import type { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types.js'

export const runtime = 'edge'
export const alt = 'FADO Group — Cross‑Border E-Commerce & Logistics Ecosystem'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadMontserrat() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NextJS OG)' } }
    ).then((r) => r.text())

    const url = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1]
    if (!url) return null

    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const fontData = await loadMontserrat()

  const options: ImageResponseOptions = {
    ...size,
    fonts: fontData
      ? [{ name: 'Montserrat', data: fontData, weight: 400, style: 'normal' as const }]
      : [],
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#080808',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Primary orange glow — top center */}
        <div
          style={{
            position: 'absolute',
            width: 1000,
            height: 800,
            top: -320,
            left: 100,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(255,90,31,0.22) 0%, rgba(255,90,31,0.07) 45%, transparent 70%)',
          }}
        />

        {/* Secondary glow — bottom right, cooler */}
        <div
          style={{
            position: 'absolute',
            width: 560,
            height: 420,
            bottom: -180,
            right: -60,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(255,90,31,0.09) 0%, transparent 70%)',
          }}
        />

        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* FADO wordmark */}
          <div
            style={{
              fontSize: 176,
              fontWeight: 400,
              fontFamily: 'Montserrat, sans-serif',
              color: '#ffffff',
              letterSpacing: 18,
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            FADO
          </div>

          {/* Accent line — subtle white */}
          <div
            style={{
              width: 48,
              height: 1,
              background: 'rgba(255,255,255,0.18)',
              marginBottom: 28,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.42)',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Cross‑Border E-Commerce & Logistics Ecosystem
          </div>
        </div>

        {/* Domain — bottom center */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            fontSize: 13,
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.14em',
          }}
        >
          fadogroup.com.au
        </div>
      </div>
    ),
    options
  )
}
