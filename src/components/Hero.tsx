import HeroCanvas from './HeroCanvas'

export default function Hero() {
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
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[920px] mx-auto">
        <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-7">
          Tập đoàn FADO — Cross&#8209;Border Commerce Ecosystem
        </p>

        <h1
          className="font-serif font-medium leading-[1.02] mb-7 tracking-[-0.02em]"
          style={{ fontSize: 'clamp(48px, 9vw, 104px)' }}
        >
          Kết nối thương mại
          <br />
          <span className="italic text-accent">không biên giới.</span>
        </h1>

        <p
          className="text-text-muted mx-auto mb-10 max-w-[620px]"
          style={{ fontSize: '18px' }}
        >
          Từ một nền tảng mua hàng quốc tế năm 2011, FADO Group đã mở rộng thành hệ sinh
          thái gồm logistics, công nghệ và bán lẻ — vận hành xuyên suốt Việt Nam, Úc và
          hơn 9 quốc gia trên toàn cầu.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(255,90,31,0.5)] transition-all duration-200"
          >
            Khám phá hệ sinh thái
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-line-strong text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
          >
            Liên hệ hợp tác
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-text-faint uppercase">
          cuộn xuống
        </span>
        <div className="w-px h-[34px] relative overflow-hidden" style={{ background: 'linear-gradient(var(--tw-gradient-stops, #5c5c5c, transparent))' }}>
          <div
            className="absolute left-0 w-full h-full"
            style={{
              background: 'linear-gradient(white, transparent)',
              animation: 'cueDrop 2.2s ease-in-out infinite',
              top: '-100%',
            }}
          />
        </div>
      </div>
    </section>
  )
}
