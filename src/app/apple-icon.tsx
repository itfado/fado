import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: 9,
            fontFamily: 'Arial Black, Arial, sans-serif',
            lineHeight: 1,
            paddingLeft: 9,
          }}
        >
          FADO
        </div>
      </div>
    ),
    { ...size }
  )
}
