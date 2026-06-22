import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })
  return { title: t('metaTitle') }
}

export default async function VeChungToi({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <div className="text-center max-w-[480px] mx-auto px-6">
          <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-text-faint mb-4">
            {t('status')}
          </p>
          <h1 className="font-display font-semibold text-[32px] mb-4">{t('title')}</h1>
          <p className="text-text-muted text-[15px]">{t('body')}</p>
          <a
            href="/"
            className="inline-flex mt-8 text-[14px] text-text-muted hover:text-white transition-colors underline underline-offset-4"
          >
            {t('backLink')}
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
