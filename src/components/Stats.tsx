'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { stats } from '@/data/stats'

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1200
          const start = performance.now()
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-mono text-[38px] font-medium text-white">
      {count}
      {suffix && (
        <span className="font-mono text-[24px] text-accent">{suffix}</span>
      )}
    </span>
  )
}

export default function Stats() {
  const t = useTranslations('stats')

  return (
    <section className="border-t border-line border-b border-b-line">
      <div
        className="max-w-container mx-auto px-7 flex items-center justify-center gap-9 flex-wrap"
        style={{ padding: '48px 28px' }}
      >
        {stats.map((s, i) => (
          <>
            {i > 0 && (
              <div key={`div-${i}`} className="w-px h-10 bg-line hidden sm:block" aria-hidden="true" />
            )}
            <div key={s.labelKey} className="flex flex-col items-center gap-1.5 min-w-[130px]">
              <CountUp target={s.value} suffix={s.suffix} />
              <span className="text-[13px] text-text-muted text-center">{t(s.labelKey)}</span>
            </div>
          </>
        ))}
      </div>
    </section>
  )
}
