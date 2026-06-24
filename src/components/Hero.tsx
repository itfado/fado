import { getTranslations } from 'next-intl/server'
import HeroCanvas from './HeroCanvas'
import HeroInner from './HeroInner'

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: 'clamp(100px, 18vw, 140px) 24px clamp(60px, 10vw, 80px)' }}
    >
      <HeroCanvas />

      {/* Aurora gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hero-aurora"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <HeroInner
        label={t('label')}
        headline1={t('headline1')}
        headline2={t('headline2')}
        sub={t('sub')}
        cta1={t('cta1')}
        cta2={t('cta2')}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: '40%',
          background:
            'linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--c-bg) 60%, transparent) 50%, var(--c-bg) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ animation: 'heroFade 1s ease both', animationDelay: '0.9s' }}
      >
        <div className="w-px h-[28px] overflow-hidden" style={{ background: 'var(--c-line-strong)' }}>
          <div
            className="w-full"
            style={{
              height: '100%',
              background: 'linear-gradient(var(--c-ink), transparent)',
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
