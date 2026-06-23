'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Replace with actual YouTube video ID when ready ──────────────────────────
const YOUTUBE_ID = 'eSwwC2LbtDI'
// ─────────────────────────────────────────────────────────────────────────────

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false)

  const sectionRef    = useRef<HTMLDivElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const glowRef       = useRef<HTMLDivElement>(null)
  const gridRef       = useRef<HTMLDivElement>(null)
  const particlesRef  = useRef<HTMLDivElement>(null)
  const iframeRef     = useRef<HTMLIFrameElement>(null)

  function closeVideo() {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}', '*'
    )
    setPlaying(false)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section   = sectionRef.current
    const card      = containerRef.current
    const glow      = glowRef.current
    const grid      = gridRef.current
    const particles = particlesRef.current
    if (!section || !card || !glow || !grid || !particles) return

    // ease: none throughout — scrub handles the feel
    const tl = gsap.timeline({ defaults: { ease: 'none' } })

    // ── Phase 1 (0 → 30 %): glow swells — ambient space materialises ───────
    tl.fromTo(glow,
      { opacity: 0.25, scale: 1.25, y: -24 },
      { opacity: 1,    scale: 1,    y: 0, duration: 0.30 },
      0,
    )

    // ── Phase 2 (15 → 45 %): grid rises from darkness ─────────────────────
    tl.fromTo(grid,
      { opacity: 0 },
      { opacity: 1, duration: 0.30 },
      0.15,
    )

    // ── Phase 3 (15 → 45 %): particles drift in (parallax slower than card) ─
    tl.fromTo(particles,
      { y: 40, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.30 },
      0.15,
    )

    // ── Phase 4 (15 → 100 %): card emerges — scale 0.80 → 1 ──────────────
    tl.fromTo(card,
      { scale: 0.80, y: 160, opacity: 0 },
      { scale: 1,    y: 0,   opacity: 1, duration: 0.85 },
      0.15,
    )

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end:   '+=580',
      scrub: 1.2,
      pin:   true,
      pinSpacing: true,
      animation: tl,
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--c-bg)' }}
    >
      {/* ── Ambient glow — low base, GSAP swells it (Phase 1) ──────────────── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          /* start at a gentle ambient — no hard black box before pin triggers */
          opacity: 0.25,
          background: [
            'radial-gradient(ellipse 88% 50% at 50% 8%,  rgba(255,90,31,0.14) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(255,90,31,0.07) 0%, transparent 65%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Grid — very faint, GSAP fades in (Phase 2) ───────────────────── */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          backgroundImage: [
            'linear-gradient(color-mix(in oklab, var(--c-ink) 8%, transparent) 1px, transparent 1px)',
            'linear-gradient(90deg, color-mix(in oklab, var(--c-ink) 8%, transparent) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '88px 88px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 75%, transparent 100%)',
          maskImage:       'linear-gradient(to bottom, transparent 0%, black 40%, black 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Grain — always on, same texture as hero ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.20]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* ── Ambient particles layer — GSAP parallax (Phase 3) ─────────────── */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {[
          { x: 8,  y: 12, s: 1.8, op: 0.18, d: 5.2, dl: 0.0 },
          { x: 22, y:  5, s: 1.2, op: 0.12, d: 4.1, dl: 1.1 },
          { x: 40, y: 18, s: 1.5, op: 0.15, d: 5.8, dl: 0.5 },
          { x: 58, y:  8, s: 1.0, op: 0.11, d: 4.6, dl: 1.8 },
          { x: 74, y: 14, s: 1.8, op: 0.17, d: 5.0, dl: 0.3 },
          { x: 90, y:  6, s: 1.2, op: 0.13, d: 3.9, dl: 2.1 },
          { x: 15, y: 30, s: 1.0, op: 0.09, d: 6.2, dl: 0.9 },
          { x: 50, y: 35, s: 1.5, op: 0.08, d: 4.8, dl: 1.5 },
          { x: 82, y: 28, s: 1.0, op: 0.10, d: 5.4, dl: 0.7 },
          { x: 5,  y: 50, s: 1.5, op: 0.07, d: 4.3, dl: 2.3 },
          { x: 35, y: 58, s: 1.0, op: 0.08, d: 5.6, dl: 1.0 },
          { x: 65, y: 52, s: 1.8, op: 0.09, d: 4.5, dl: 0.4 },
          { x: 92, y: 60, s: 1.2, op: 0.07, d: 5.1, dl: 1.7 },
          // orange accent dots
          { x: 30, y: 10, s: 1.5, op: 0.20, d: 4.4, dl: 0.2, orange: true },
          { x: 68, y: 22, s: 1.2, op: 0.16, d: 5.3, dl: 1.4, orange: true },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top:  `${p.y}%`,
              width:  p.s,
              height: p.s,
              opacity: p.op,
              background: (p as {orange?: boolean}).orange
                ? `rgba(255,90,31,0.7)`
                : 'var(--c-ink)',
              animation: `particleFloat ${p.d}s ease-in-out ${p.dl}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Card — GSAP animates this (Phase 4) ────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
        <div
          ref={containerRef}
          className="w-full rounded-[22px] overflow-hidden relative"
          style={{
            maxWidth: 900,
            aspectRatio: '16/9',
            background: 'var(--c-bg-elevated)',
            boxShadow: [
              '0 0 0 1px var(--c-line)',
              '0 40px 100px color-mix(in oklab, var(--c-ink) 18%, transparent)',
              '0 0 80px rgba(255,90,31,0.06)',
            ].join(', '),
            opacity: 0,   // GSAP starts from here
          }}
        >
          {/* Card interior glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 58% at 50% 44%, rgba(255,90,31,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Card interior grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.05,
              backgroundImage: [
                'linear-gradient(var(--c-ink) 1px, transparent 1px)',
                'linear-gradient(90deg, var(--c-ink) 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '54px 54px',
            }}
          />

          {/* Ghost brand identity */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 pointer-events-none select-none">
            <div className="flex items-center gap-3" style={{ opacity: 0.14 }}>
              <div className="w-px h-4" style={{ background: 'var(--c-ink)' }} />
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-ink">
                FADO Group — Cross‑Border Commerce Ecosystem
              </span>
              <div className="w-px h-4" style={{ background: 'var(--c-ink)' }} />
            </div>
            <div className="flex items-center gap-12 sm:gap-16" style={{ opacity: 0.12 }}>
              {[{ n: '14+', l: 'thương hiệu' }, { n: '9', l: 'quốc gia' }, { n: '15+', l: 'năm' }].map(({ n, l }) => (
                <div key={l} className="flex flex-col items-center gap-1">
                  <span className="font-display font-bold text-ink" style={{ fontSize: 'clamp(18px, 2.8vw, 38px)' }}>
                    {n}
                  </span>
                  <span className="font-mono text-[8.5px] tracking-widest uppercase text-ink/60">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlaying(true)}
              className="group flex items-center gap-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                padding: '14px 28px',
                background: 'color-mix(in oklab, var(--c-ink) 7%, transparent)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid color-mix(in oklab, var(--c-ink) 12%, transparent)',
                boxShadow: '0 8px 40px color-mix(in oklab, var(--c-ink) 15%, transparent)',
              }}
              aria-label="Phát video giới thiệu FADO Group"
            >
              <span
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 34, height: 34, background: 'color-mix(in oklab, var(--c-ink) 10%, transparent)', border: '1px solid color-mix(in oklab, var(--c-ink) 15%, transparent)' }}
              >
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <path d="M1 1L10 6.5L1 12V1Z" fill="var(--c-ink)" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-ui font-medium text-ink/88" style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', letterSpacing: '-0.01em' }}>
                Phát video giới thiệu
              </span>
            </button>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,90,31,0.6), transparent)', opacity: 0.3 }}
          />
        </div>
      </div>

      {/* YouTube modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          onClick={closeVideo}
          role="dialog" aria-modal="true"
          aria-label="Video giới thiệu FADO Group"
        >
          <div
            className="relative w-full rounded-[18px] overflow-hidden"
            style={{ maxWidth: 960, aspectRatio: '16/9', background: '#000', boxShadow: '0 40px 120px rgba(0,0,0,0.85)' }}
            onClick={e => e.stopPropagation()}
          >
            {YOUTUBE_ID ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title="FADO Group — Video tổng quan"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[12px] text-white/25 tracking-[0.12em] uppercase">Video đang cập nhật</p>
              </div>
            )}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90"
              style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.13)' }}
              aria-label="Đóng video"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1L10 10M10 1L1 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
