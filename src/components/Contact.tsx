import { getTranslations } from 'next-intl/server'
import FadeIn from './FadeIn'
import TypingText from './TypingText'
import ContactFunnel from './ContactFunnel'

export default async function Contact() {
  const t = await getTranslations('contact')

  return (
    <section id="contact" className="text-center relative overflow-hidden" style={{ padding: '120px 24px' }}>
      {/* Subtle ember glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,31,0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <ContactFunnel />
      <FadeIn>
        <div className="max-w-[680px] mx-auto relative z-10">
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            {t('sectionLabel')}
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] mb-[18px]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.025em' }}
          >
            {t('headline1')}
            <br />
            {t('headline2')}
          </h2>
          <p className="text-text-muted text-[16px] max-w-[560px] mx-auto mb-9">
            <TypingText text={t('sub')} startOnView persistentCaret speed={10} />
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:contact@fadogroup.com.au"
              className="inline-flex items-center justify-center border border-accent text-accent font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:bg-accent hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('emailBtn')}
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
