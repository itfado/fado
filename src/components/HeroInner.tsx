'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import TypingText from './TypingText'

interface Props {
  label: string
  headline1: string
  headline2: string
  sub: string
  cta1: string
  cta2: string
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.38
    const y = (e.clientY - rect.top - rect.height / 2) * 0.38
    el.style.transition = 'transform 0.12s ease'
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}

export default function HeroInner({ label, headline1, headline2, sub, cta1, cta2 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, -90])
  const opacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <motion.div
      ref={containerRef}
      className="relative z-10 max-w-[1060px] mx-auto"
      style={{ y, opacity }}
    >
      {/* Label */}
      <div
        className="inline-flex items-center gap-2 mb-9"
        style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.05s' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
        <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-text-faint">
          {label}
        </p>
      </div>

      {/* Headline */}
      <h1
        className="font-display font-bold leading-[1.04] mb-10"
        style={{
          fontSize: 'clamp(40px, 4.8vw, 66px)',
          letterSpacing: '-0.03em',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        <span
          style={{
            display: 'block',
            animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: '0.18s',
          }}
        >
          {headline1}
        </span>
        <span
          className="italic text-accent"
          style={{
            display: 'block',
            animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: '0.28s',
          }}
        >
          {headline2}
        </span>
      </h1>

      {/* Sub */}
      <p
        className="text-text-muted mx-auto mb-14 leading-[1.75]"
        style={{
          fontSize: 'clamp(15px, 1.6vw, 17px)',
          maxWidth: '620px',
          animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
          animationDelay: '0.40s',
        }}
      >
        <TypingText text={sub} startDelay={700} speed={8} persistentCaret />
      </p>

      {/* CTAs */}
      <div
        className="flex gap-4 justify-center flex-wrap"
        style={{ animation: 'heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.52s' }}
      >
        <MagneticLink
          href="#ecosystem"
          className="inline-flex items-center justify-center border border-accent text-accent font-semibold px-8 py-4 rounded-full text-[15px] hover:bg-accent hover:text-white transition-colors duration-200"
        >
          {cta1}
        </MagneticLink>
        <MagneticLink
          href="#contact"
          className="inline-flex items-center justify-center font-semibold px-8 py-4 rounded-full text-[15px] border border-ink/30 text-text hover:border-accent hover:text-accent transition-colors duration-200"
        >
          {cta2}
        </MagneticLink>
      </div>
    </motion.div>
  )
}
