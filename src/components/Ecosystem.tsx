import { getTranslations } from 'next-intl/server'
import FadeIn from './FadeIn'
import { brands, segments } from '@/data/brands'

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
      {/* Section header */}
      <div className="max-w-container mx-auto mb-16">
        <FadeIn>
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            {t('sectionLabel')}
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2
            className="font-serif font-medium leading-[1.08] mb-[18px] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            {t('headline1')}
            <br />
            {t('headline2')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-text-muted text-[16px] max-w-[580px]">{t('sub')}</p>
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
                className="rounded-[18px] overflow-hidden border border-line bg-bg-elevated"
                style={{ borderLeft: `2px solid ${accent}22` }}
              >
                {/* Pillar header */}
                <header className="px-8 pt-8 pb-6 flex gap-5 items-start flex-wrap border-b border-line">
                  <span
                    className="font-mono text-[12px] border rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5 leading-none"
                    style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0d` }}
                  >
                    {seg.index}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-[20px] mb-1.5" style={{ letterSpacing: '-0.01em' }}>
                      {tSeg(`${seg.index}.title`)}
                    </h3>
                    <p className="text-text-muted text-[14px] max-w-[540px]">
                      {tSeg(`${seg.index}.summary`)}
                    </p>
                  </div>
                </header>

                {/* Brand cards */}
                <ul className="grid gap-px p-px" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {segBrands.map((brand) => (
                    <li key={brand.slug}>
                      {brand.url !== '#' ? (
                        <a
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-2 p-5 bg-bg-card hover:bg-bg-card-hover transition-colors duration-200 h-full"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-display font-semibold text-[15px] group-hover:text-white transition-colors">
                              {brand.name}
                            </span>
                            {brand.country && (
                              <span className="font-mono text-[11px] text-text-faint bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
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
                        <div className="flex flex-col gap-2 p-5 bg-bg-card h-full">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-display font-semibold text-[15px]">{brand.name}</span>
                            {brand.country && (
                              <span className="font-mono text-[11px] text-text-faint bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
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
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
