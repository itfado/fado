import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.contact' })
  return { title: t('metaTitle') }
}

export default async function LienHe({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.contact' })

  return (
    <>
      <Nav />
      <main className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
        <div className="max-w-container mx-auto px-6">

          {/* Header */}
          <FadeIn>
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-accent mb-5">
              {t('sectionLabel')}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1
              className="font-display font-bold mb-16"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
            >
              {t('title')}
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Info */}
            <FadeIn delay={0.16}>
              <div>
                <h2
                  className="font-display font-semibold mb-8"
                  style={{ fontSize: '18px', letterSpacing: '-0.01em' }}
                >
                  {t('infoTitle')}
                </h2>
                <div className="flex flex-col gap-7">
                  {[
                    { label: t('emailLabel'), value: 'contact@fadogroup.com.au', href: 'mailto:contact@fadogroup.com.au' },
                    { label: t('websiteLabel'), value: 'fadogroup.com.au', href: 'https://fadogroup.com.au' },
                    { label: t('hqLabel'), value: t('hqValue'), href: undefined },
                  ].map(({ label, value, href }) => (
                    <div key={label}>
                      <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-faint mb-1.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-[15px] text-text-muted hover:text-white transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[15px] text-text-muted">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Form / CTA */}
            <FadeIn delay={0.24}>
              <div>
                <h2
                  className="font-display font-semibold mb-4"
                  style={{ fontSize: '18px', letterSpacing: '-0.01em' }}
                >
                  {t('formTitle')}
                </h2>
                <p className="text-text-muted text-[15px] leading-[1.7] mb-8">{t('formBody')}</p>
                <a
                  href="mailto:contact@fadogroup.com.au"
                  className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_rgba(255,90,31,0.45)] transition-all duration-200"
                >
                  {t('formCta')}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
