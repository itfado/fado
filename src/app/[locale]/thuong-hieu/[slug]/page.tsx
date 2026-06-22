import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { brands, segments } from '@/data/brands'
import { routing } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    brands.map((b) => ({ locale, slug: b.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) return {}
  return { title: brand.name }
}

export default async function BrandPage({ params }: Props) {
  const { locale, slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) notFound()

  const segment = segments[brand.segment - 1]
  const tBrand = await getTranslations({ locale, namespace: 'brandPage' })
  const tSeg = await getTranslations({ locale, namespace: 'segments' })
  const tBrands = await getTranslations({ locale, namespace: 'brands' })

  return (
    <>
      <Nav />
      <main className="min-h-screen" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-text-faint mb-10">
            <a href="/#ecosystem" className="hover:text-text-muted transition-colors">
              {tBrand('breadcrumb')}
            </a>
            <span>/</span>
            <span>{brand.name}</span>
          </div>

          {/* Segment badge */}
          <p
            className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-text-faint mb-4"
            style={{ color: segment.color }}
          >
            {segment.index} — {tSeg(`${segment.index}.title`)}
          </p>

          <h1
            className="font-display font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
          >
            {brand.name}
          </h1>

          <p className="text-text-muted text-[17px] max-w-[560px] mb-10">
            {tBrands(`${brand.slug}.description`)}
          </p>

          {brand.url !== '#' ? (
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(255,255,255,0.25)] transition-all duration-200"
            >
              {tBrand('visitWebsite')}
            </a>
          ) : (
            <p className="text-text-faint text-[14px] font-mono">{tBrand('websitePending')}</p>
          )}

          <div className="mt-16 pt-8 border-t border-line">
            <a
              href="/#ecosystem"
              className="text-[14px] text-text-muted hover:text-white transition-colors"
            >
              {tBrand('backLink')}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
