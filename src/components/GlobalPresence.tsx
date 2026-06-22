import { getTranslations } from 'next-intl/server'
import FadeIn from './FadeIn'
import { officeGroups } from '@/data/offices'

export default async function GlobalPresence() {
  const t = await getTranslations('globalPresence')
  const tOffices = await getTranslations('offices')

  return (
    <section
      id="global"
      className="bg-bg-elevated border-t border-line border-b border-b-line"
      style={{ padding: '120px 24px' }}
    >
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
            <span className="italic text-accent">{t('headline2')}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-text-muted text-[16px] max-w-[560px]">{t('sub')}</p>
        </FadeIn>
      </div>

      {/* Office grid */}
      <FadeIn delay={0.18}>
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {officeGroups.map((group) => (
            <div key={group.titleKey}>
              <h4 className="font-mono text-[13px] tracking-[0.08em] uppercase text-accent font-medium mb-4">
                {tOffices(group.titleKey as Parameters<typeof tOffices>[0])}
              </h4>
              <ul>
                {group.offices.map((office, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[14px] text-text-muted py-2 border-t border-line first:border-t-0"
                  >
                    <span className="text-[16px] leading-[1.4] flex-shrink-0">{office.flag}</span>
                    {tOffices(office.labelKey as Parameters<typeof tOffices>[0])}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
