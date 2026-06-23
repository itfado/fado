import { getTranslations } from 'next-intl/server'
import HeroCanvas from './HeroCanvas'
import TypingText from './TypingText'

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: '140px 24px 80px' }}
    >
      <HeroCanvas />

      {/* Aurora gradient đa sắc — kiểu x.ai / Antigravity, dịch chuyển chậm */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hero-aurora"
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
        <div
          className="inline-flex items-center gap-2 mb-9"
          style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.05s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-text-faint">
            {t('label')}
          </p>
        </div>

        {/* Headline — each line animates independently */}
        <h1
          className="font-display font-bold leading-[1.06] mb-10"
          style={{ fontSize: 'clamp(40px, 4.8vw, 66px)', letterSpacing: '-0.025em', wordBreak: 'keep-all' }}
        >
          <span
            style={{
              display: 'block',
              animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.18s',
            }}
          >
            {t('headline1')}
          </span>
          <span
            className="italic text-accent"
            style={{
              display: 'block',
              animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.28s',
            }}
          >
            {t('headline2')}
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-text-muted mx-auto mb-12 leading-[1.75]"
          style={{
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            maxWidth: '600px',
            animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: '0.40s',
          }}
        >
          <TypingText text={t('sub')} startDelay={700} speed={8} persistentCaret />
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3.5 justify-center flex-wrap"
          style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.52s' }}
        >
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center border border-accent text-accent font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:bg-accent hover:text-white hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('cta1')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-semibold px-7 py-3.5 rounded-full text-[14.5px] border border-line-strong text-text-muted hover:border-accent/50 hover:text-text hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('cta2')}
          </a>
        </div>
      </div>

      {/* Bottom fade — dissolves hero content before VideoShowcase enters */}
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
