import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'

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
          <FadeIn>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-accent mb-5">
              {t('status')}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1
              className="font-display font-bold mb-5"
              style={{ fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              {t('title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-text-muted text-[15px] leading-[1.7]">{t('body')}</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <a
              href="/"
              className="inline-flex mt-8 text-[13px] font-mono tracking-[0.08em] text-text-faint hover:text-white transition-colors"
            >
              {t('backLink')}
            </a>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
