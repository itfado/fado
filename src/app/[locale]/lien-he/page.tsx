import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
      <main className="min-h-screen" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-container mx-auto px-6">
          <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-text-faint mb-4">
            {t('sectionLabel')}
          </p>
          <h1
            className="font-display font-semibold leading-[1.1] mb-12"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            {t('title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-semibold text-[20px] mb-6">{t('infoTitle')}</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    {t('emailLabel')}
                  </p>
                  <a
                    href="mailto:contact@fadogroup.com.au"
                    className="text-[15px] text-text-muted hover:text-white transition-colors"
                  >
                    contact@fadogroup.com.au
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    {t('websiteLabel')}
                  </p>
                  <a
                    href="https://fadogroup.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-text-muted hover:text-white transition-colors"
                  >
                    fadogroup.com.au
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    {t('hqLabel')}
                  </p>
                  <p className="text-[15px] text-text-muted">{t('hqValue')}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display font-semibold text-[20px] mb-6">{t('formTitle')}</h2>
              <p className="text-text-muted text-[15px] mb-6">{t('formBody')}</p>
              <a
                href="mailto:contact@fadogroup.com.au"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('formCta')}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
