import { getTranslations } from 'next-intl/server'
import FadeIn from './FadeIn'
import { brands, segments } from '@/data/brands'
import { BrandGrid, BrandItem } from './BrandCardGrid'
import BrandLogo from './BrandLogo'
import EcosystemProgress from './EcosystemProgress'
import TypingText from './TypingText'

const countryKeyMap: Record<string, 'countryVN' | 'countryAU'> = {
  vn: 'countryVN',
  au: 'countryAU',
}

export default async function Ecosystem() {
  const t = await getTranslations('ecosystem')
  const tSeg = await getTranslations('segments')
  const tBrands = await getTranslations('brands')

  return (
    <section id="ecosystem" style={{ padding: '120px 24px' }}>
      <EcosystemProgress />
      {/* Section header */}
      <div className="max-w-container mx-auto mb-16">
        <FadeIn>
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            {t('sectionLabel')}
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2
            className="font-display font-semibold leading-[1.1] mb-[18px]"
            style={{ fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.025em' }}
          >
            {t('headline1')}
            <br />
            {t('headline2')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-text-muted text-[16px] max-w-[580px]">
            <TypingText text={t('sub')} startOnView persistentCaret speed={10} />
          </p>
        </FadeIn>
      </div>

      {/* Pillars */}
      <div className="max-w-container mx-auto flex flex-col gap-3">
        {segments.map((seg, si) => {
          const segBrands = brands.filter((b) => b.segment === ((si + 1) as 1 | 2 | 3 | 4 | 5))
          const accent = seg.color

          return (
            <FadeIn key={seg.index} delay={si * 0.07}>
              <article
                id={`seg-${seg.index}`}
                className="rounded-[18px] overflow-hidden border border-line bg-bg-elevated"
                style={{ borderLeft: `2px solid ${accent}22` }}
              >
                {/* Pillar header */}
                <header className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 flex gap-4 items-start flex-wrap border-b border-line">
                  <span
                    className="font-mono text-[12px] border rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5 leading-none"
                    style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0d` }}
                  >
                    {seg.index}
                  </span>
                  <div>
                    <h3 className="font-ui font-semibold text-[18px] mb-1.5" style={{ letterSpacing: '-0.01em' }}>
                      {tSeg(`${seg.index}.title`)}
                    </h3>
                    <p className="text-text-muted text-[14px] max-w-[540px]">
                      {tSeg(`${seg.index}.summary`)}
                    </p>
                  </div>
                </header>

                {/* Brand cards — stagger in when segment enters viewport */}
                <BrandGrid>
                  {segBrands.map((brand) => (
                    <BrandItem key={brand.slug}>
                      {brand.url !== '#' ? (
                        <a
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-3 p-5 bg-bg-card hover:bg-bg-card-hover transition-colors duration-200 h-full"
                        >
                          <span className="block h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-12" style={{ background: accent, opacity: 0.75 }} />
                          <div className="flex items-start justify-between gap-3">
                            <BrandLogo slug={brand.slug} name={brand.name} />
                            {brand.country && (
                              <span className="font-mono text-[11px] text-text-faint bg-ink/5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                                {t(countryKeyMap[brand.country])}
                              </span>
                            )}
                          </div>
                          <span className="text-[13px] text-text-muted leading-[1.55] flex-1">
                            {tBrands(`${brand.slug}.description`)}
                          </span>
                          <span className="font-mono text-[11.5px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: accent }}>
                            {t('visitWebsite')}
                          </span>
                        </a>
                      ) : (
                        <div className="flex flex-col gap-3 p-5 bg-bg-card h-full">
                          <span className="block h-0.5 w-8 rounded-full" style={{ background: accent, opacity: 0.5 }} />
                          <div className="flex items-start justify-between gap-3">
                            <BrandLogo slug={brand.slug} name={brand.name} />
                            {brand.country && (
                              <span className="font-mono text-[11px] text-text-faint bg-ink/5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                                {t(countryKeyMap[brand.country])}
                              </span>
                            )}
                          </div>
                          <span className="text-[13px] text-text-muted leading-[1.55] flex-1">
                            {tBrands(`${brand.slug}.description`)}
                          </span>
                          <span className="font-mono text-[11.5px] text-text-faint mt-1">
                            {t('websitePending')}
                          </span>
                        </div>
                      )}
                    </BrandItem>
                  ))}
                </BrandGrid>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
