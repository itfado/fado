import { getTranslations } from 'next-intl/server'
import FadeIn from './FadeIn'

export default async function About() {
  const t = await getTranslations('about')

  const values = [
    { num: t('v01Num'), title: t('v01Title'), body: t('v01Body') },
    { num: t('v02Num'), title: t('v02Title'), body: t('v02Body') },
    { num: t('v03Num'), title: t('v03Title'), body: t('v03Body') },
  ]

  return (
    <section id="about" style={{ padding: '120px 24px' }}>
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        {/* Text side */}
        <div>
          <FadeIn>
            <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
              {t('sectionLabel')}
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2
              className="font-display font-light leading-[1.1] mb-[18px]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em' }}
            >
              {t('headline1')}
              <br />
              {t('headline2')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-text-muted text-[15.5px] mb-[18px]">{t('para1')}</p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-text-muted text-[15.5px] mb-7">{t('para2')}</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(255,90,31,0.5)] transition-all duration-200"
            >
              {t('cta')}
            </a>
          </FadeIn>
        </div>

        {/* Value cards */}
        <div className="flex flex-col gap-[18px]">
          {values.map((v, i) => (
            <FadeIn key={v.num} delay={i * 0.08}>
              <div className="p-[26px_28px] rounded-[16px] bg-bg-elevated border border-line hover:border-accent/40 transition-colors duration-300">
                <span className="font-mono text-[13px] text-accent">{v.num}</span>
                <h4 className="font-ui font-semibold text-[16px] mt-2.5 mb-2">{v.title}</h4>
                <p className="text-[14px] text-text-muted">{v.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
