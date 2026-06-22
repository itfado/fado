import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fadogroup.com.au'),
  title: {
    default: 'FADO Group — Hệ sinh thái Thương mại & Logistics Xuyên Biên Giới',
    template: '%s | FADO Group',
  },
  description:
    'FADO Group: tập đoàn đa ngành vận hành hệ sinh thái logistics, công nghệ và bán lẻ xuyên biên giới trên 9 quốc gia.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://fadogroup.com.au',
    siteName: 'FADO Group',
    title: 'FADO Group — Hệ sinh thái Thương mại & Logistics Xuyên Biên Giới',
    description:
      'FADO Group: tập đoàn đa ngành vận hành hệ sinh thái logistics, công nghệ và bán lẻ xuyên biên giới trên 9 quốc gia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FADO Group — Cross-Border Commerce Ecosystem',
    description:
      'FADO Group: tập đoàn đa ngành vận hành hệ sinh thái logistics, công nghệ và bán lẻ xuyên biên giới.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
