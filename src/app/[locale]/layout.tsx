import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { headers } from 'next/headers'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const headersList = await headers()
  const host = headersList.get('host') || 'ecosys.fadoai.com'
  const metadataBase = new URL(`https://${host}`)

  return {
    metadataBase,
    title: {
      default: t('title'),
      template: '%s | FADO Group',
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_AU',
      url: 'https://fadogroup.com.au',
      siteName: 'FADO Group',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.location.hostname==='ecosys.fadoai.com'){document.documentElement.setAttribute('data-theme','light');return;}try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
