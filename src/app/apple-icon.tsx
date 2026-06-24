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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
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
            marginBottom: 12,
            paddingLeft: 9,
          }}
        >
          FADO
        </div>
        <div
          style={{
            width: 28,
            height: 2,
            background: '#FF5A1F',
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
