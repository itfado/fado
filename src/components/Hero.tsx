import { getTranslations } from 'next-intl/server'
import HeroCanvas from './HeroCanvas'

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: '140px 24px 80px' }}
    >
      <HeroCanvas />

      {/* Radial ember glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 38%, rgba(255,90,31,0.14), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[920px] mx-auto">
        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-text-faint">
            FADO Group
          </p>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold leading-[1.06] mb-8"
          style={{ fontSize: 'clamp(40px, 4.8vw, 66px)', letterSpacing: '-0.025em', overflowWrap: 'break-word', wordBreak: 'keep-all' }}
        >
          {t('headline1')}
          <br />
          <span className="italic text-accent">{t('headline2')}</span>
        </h1>

        {/* Sub */}
        <p
          className="text-text-muted mx-auto mb-10 max-w-[640px] leading-[1.75]"
          style={{ fontSize: 'clamp(15px, 1.6vw, 17px)' }}
        >
          {t('sub')}
        </p>

        {/* CTAs */}
        <div className="flex gap-3.5 justify-center flex-wrap">
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(255,90,31,0.5)] transition-all duration-200"
          >
            {t('cta1')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-line-strong text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('cta2')}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-text-faint uppercase">
          {t('scroll')}
        </span>
        <div className="w-px h-[36px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="w-full"
            style={{
              height: '100%',
              background: 'linear-gradient(white, transparent)',
              animation: 'cueDrop 2.4s ease-in-out infinite',
              position: 'relative',
              top: '-100%',
            }}
          />
        </div>
      </div>
    </section>
  )
}
