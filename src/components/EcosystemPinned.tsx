'use client'

import { useRef, useState } from 'react'
import FadeIn from './FadeIn'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import BrandLogo from './BrandLogo'

type BrandData = {
  slug: string
  name: string
  url: string
  countryLabel?: string
  description: string
}

type SegmentData = {
  index: string
  color: string
  title: string
  summary: string
  brands: BrandData[]
}

type Props = {
  sectionLabel: string
  headline1: string
  headline2: string
  visitWebsite: string
  websitePending: string
  segments: SegmentData[]
}

function BrandCard({
  brand,
  color,
  visitWebsite,
  websitePending,
  delay,
}: {
  brand: BrandData
  color: string
  visitWebsite: string
  websitePending: string
  delay: number
}) {
  const inner = (
    <>
      <span className="block h-0.5 w-7 rounded-full transition-all duration-300 group-hover:w-12" style={{ background: color }} />
      <div className="flex items-start justify-between gap-2">
        <BrandLogo slug={brand.slug} name={brand.name} />
        {brand.countryLabel && (
          <span className="font-mono text-[10px] text-text-faint bg-ink/5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
            {brand.countryLabel}
          </span>
        )}
      </div>
      <p className="text-[12.5px] text-text-muted leading-[1.55] flex-1">{brand.description}</p>
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {brand.url !== '#' ? (
        <a
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 p-5 rounded-2xl bg-bg-elevated border border-line hover:-translate-y-0.5 transition-all duration-200 h-full"
          style={{ '--hover-border': color } as React.CSSProperties}
        >
          {inner}
          <span className="font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color }}>
            {visitWebsite} →
          </span>
        </a>
      ) : (
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-bg-elevated border border-line h-full">
          {inner}
          <span className="font-mono text-[11px] text-text-faint">{websitePending}</span>
        </div>
      )}
    </motion.div>
  )
}

export default function EcosystemPinned({
  segments,
  sectionLabel,
  headline1,
  headline2,
  visitWebsite,
  websitePending,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(segments.length - 1, Math.floor(v * segments.length))
    setActiveIdx(next)
  })

  function scrollToSegment(i: number) {
    const el = wrapperRef.current
    if (!el) return
    const elTop = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    const target = elTop + (i / segments.length) * scrollable + 1
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const seg = segments[activeIdx]

  const gridCols =
    seg.brands.length <= 2
      ? 'grid-cols-2'
      : seg.brands.length >= 4
      ? 'grid-cols-2 xl:grid-cols-4'
      : 'grid-cols-2 xl:grid-cols-3'

  return (
    <>
      {/* ── DESKTOP: scroll-pinned side-by-side ── */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative"
        style={{ height: `${segments.length * 100}vh` }}
      >
        <div className="sticky top-[58px] h-[calc(100vh-58px)] flex overflow-hidden">

          {/* Left panel — always visible, segment nav */}
          <div className="w-[40%] xl:w-[36%] flex flex-col justify-center px-10 xl:px-14 border-r border-line relative overflow-hidden">

            {/* Faint big number behind left panel */}
            <div
              aria-hidden="true"
              className="absolute -right-4 bottom-0 font-display font-bold leading-none select-none pointer-events-none"
              style={{
                fontSize: '20vw',
                color: seg.color,
                opacity: 0.035,
                letterSpacing: '-0.06em',
                transform: 'translateY(15%)',
                transition: 'color 0.45s ease',
              }}
            >
              {seg.index}
            </div>

            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-accent mb-5 relative z-10">
              {sectionLabel}
            </p>

            <h2
              className="font-display font-bold leading-[1.08] mb-7 relative z-10"
              style={{ fontSize: 'clamp(20px, 2vw, 32px)', letterSpacing: '-0.03em' }}
            >
              {headline1}
              <br />
              <span className="italic text-text-muted">{headline2}</span>
            </h2>

            {/* Segment list */}
            <nav className="flex flex-col relative z-10">
              {segments.map((s, i) => (
                <button
                  key={s.index}
                  onClick={() => scrollToSegment(i)}
                  className="flex items-center gap-4 py-2.5 border-t border-line text-left transition-all duration-300"
                  style={{ opacity: i === activeIdx ? 1 : 0.35 }}
                >
                  <span
                    className="font-mono text-[11px] w-7 flex-shrink-0 transition-colors duration-300"
                    style={{ color: i === activeIdx ? s.color : 'var(--c-text-faint)' }}
                  >
                    {s.index}
                  </span>
                  <span
                    className="font-ui font-medium text-[14px] transition-colors duration-300"
                    style={{ color: i === activeIdx ? 'var(--c-text)' : 'var(--c-text-muted)' }}
                  >
                    {s.title}
                  </span>
                  {i === activeIdx && (
                    <motion.div
                      layoutId="seg-dot"
                      className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: s.color }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Progress bar */}
            <div className="mt-5 h-px bg-line relative overflow-hidden rounded-full z-10">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: seg.color }}
                animate={{ width: `${((activeIdx + 1) / segments.length) * 100}%` }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-mono text-[10px] text-text-faint mt-2 relative z-10">
              {activeIdx + 1} / {segments.length}
            </p>
          </div>

          {/* Right panel — brand cards, transitions on segment change */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={seg.index}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col px-8 xl:px-12 py-10 overflow-y-auto overflow-x-hidden"
              >
                {/* Decorative number (right panel) */}
                <div
                  aria-hidden="true"
                  className="absolute right-4 top-4 font-display font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontSize: '30vw',
                    color: seg.color,
                    opacity: 0.022,
                    letterSpacing: '-0.06em',
                  }}
                >
                  {seg.index}
                </div>

                {/* Segment header */}
                <div className="mb-8 flex-shrink-0 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-mono text-[11px] border rounded-full px-2.5 py-1 leading-none"
                      style={{ color: seg.color, borderColor: `${seg.color}50`, background: `${seg.color}10` }}
                    >
                      {seg.index}
                    </span>
                    <h3
                      className="font-ui font-semibold text-[20px]"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {seg.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-[14px] max-w-[520px] leading-[1.65]">
                    {seg.summary}
                  </p>
                </div>

                {/* Brand cards grid */}
                <div className={`grid gap-3 relative z-10 ${gridCols}`}>
                  {seg.brands.map((brand, bi) => (
                    <BrandCard
                      key={brand.slug}
                      brand={brand}
                      color={seg.color}
                      visitWebsite={visitWebsite}
                      websitePending={websitePending}
                      delay={bi * 0.07}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── MOBILE: vertical scroll, tất cả segment xếp dọc ── */}
      <div className="lg:hidden px-5 py-14">
        <FadeIn>
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-accent mb-5">
            {sectionLabel}
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2
            className="font-display font-bold leading-[1.06] mb-10"
            style={{ fontSize: 'clamp(28px, 6vw, 40px)', letterSpacing: '-0.03em' }}
          >
            {headline1}
            <br />
            <span className="italic text-text-muted">{headline2}</span>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-10">
          {segments.map((s) => (
            <FadeIn key={s.index}>
              <div>
                {/* Segment header */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ color: s.color, borderColor: `${s.color}44`, background: `${s.color}10` }}
                  >
                    {s.index}
                  </span>
                  <h3 className="font-ui font-semibold text-[15px]" style={{ letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                </div>
                <p className="text-text-muted text-[13.5px] mb-4 leading-[1.6]">{s.summary}</p>

                {/* Brand cards */}
                <div className="grid grid-cols-2 gap-3">
                  {s.brands.map((brand) => {
                    const content = (
                      <>
                        <span className="block h-0.5 w-5 rounded-full mb-2" style={{ background: s.color }} />
                        <BrandLogo slug={brand.slug} name={brand.name} />
                        <p className="text-[12px] text-text-muted leading-[1.5] mt-2">{brand.description}</p>
                      </>
                    )
                    return brand.url !== '#' ? (
                      <a
                        key={brand.slug}
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-4 rounded-2xl bg-bg-elevated border border-line active:scale-[0.98] transition-transform"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={brand.slug} className="flex flex-col p-4 rounded-2xl bg-bg-elevated border border-line">
                        {content}
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  )
}
