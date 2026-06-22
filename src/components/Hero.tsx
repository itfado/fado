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
        <div
          className="inline-flex items-center gap-2 mb-9"
          style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.05s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
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
            maxWidth: '520px',
            animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: '0.40s',
          }}
        >
          {t('sub')}
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3.5 justify-center flex-wrap"
          style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.52s' }}
        >
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(255,90,31,0.5)] transition-all duration-200"
          >
            {t('cta1')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.62)' }}
          >
            {t('cta2')}
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="absolute bottom-20 left-0 right-0 z-10 flex justify-center"
        aria-hidden="true"
        style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.68s' }}
      >
        <div className="flex items-center gap-10 sm:gap-16">
          {[
            { num: '14+', label: 'thương hiệu' },
            { num: '9',   label: 'quốc gia' },
            { num: '4',   label: 'châu lục' },
            { num: '15+', label: 'năm hoạt động' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-[20px] font-medium text-white/80">{num}</span>
              <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ animation: 'heroFade 1s ease both', animationDelay: '0.9s' }}
      >
        <div className="w-px h-[28px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
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
