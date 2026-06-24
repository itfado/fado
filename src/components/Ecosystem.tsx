import { getTranslations } from 'next-intl/server'
import { brands, segments } from '@/data/brands'
import EcosystemPinned from './EcosystemPinned'

const countryKeyMap: Record<string, 'countryVN' | 'countryAU'> = {
  vn: 'countryVN',
  au: 'countryAU',
}

export default async function Ecosystem() {
  const t = await getTranslations('ecosystem')
  const tSeg = await getTranslations('segments')
  const tBrands = await getTranslations('brands')

  const segmentData = segments.map((seg) => ({
    index: seg.index,
    color: seg.color,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: tSeg(`${seg.titleKey}.title` as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    summary: tSeg(`${seg.titleKey}.summary` as any),
    brands: brands
      .filter((b) => b.segment === seg.key)
      .map((brand) => ({
        slug: brand.slug,
        name: brand.name,
        url: brand.url,
        countryLabel: brand.country
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? t(countryKeyMap[brand.country] as any)
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: tBrands(`${brand.slug}.description` as any),
      })),
  }))

  return (
    <section id="ecosystem">
      <EcosystemPinned
        sectionLabel={t('sectionLabel')}
        headline1={t('headline1')}
        headline2={t('headline2')}
        visitWebsite={t('visitWebsite')}
        websitePending={t('websitePending')}
        segments={segmentData}
      />
    </section>
  )
}
