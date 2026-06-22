'use client'

import { useEffect, useState } from 'react'
import { segments } from '@/data/brands'

export default function EcosystemProgress() {
  const [active, setActive] = useState(-1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('ecosystem')
    if (!section) return

    const sectionObs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    sectionObs.observe(section)

    const segObs = segments.map((seg, i) => {
      const el = document.getElementById(`seg-${seg.index}`)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.25, rootMargin: '-15% 0px -45% 0px' }
      )
      obs.observe(el)
      return obs
    })

    return () => {
      sectionObs.disconnect()
      segObs.forEach(o => o?.disconnect())
    }
  }, [])

  return (
    <div
      className="fixed left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: visible ? 'auto' : 'none' }}
    >
      {segments.map((seg, i) => (
        <div key={seg.index} className="flex flex-col items-center">
          {i > 0 && (
            <div
              style={{
                width: 1,
                height: 22,
                background: i <= active
                  ? `linear-gradient(to bottom, ${segments[i - 1].color}55, ${seg.color}55)`
                  : 'rgba(255,255,255,0.08)',
                transition: 'background 0.5s',
              }}
            />
          )}
          <button
            onClick={() => document.getElementById(`seg-${seg.index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="flex items-center gap-2 py-0.5"
            aria-label={`Segment ${seg.index}`}
          >
            <div
              style={{
                width: i === active ? 10 : 6,
                height: i === active ? 10 : 6,
                borderRadius: '50%',
                background: i === active
                  ? seg.color
                  : i < active ? `${seg.color}50` : 'rgba(255,255,255,0.18)',
                boxShadow: i === active ? `0 0 10px ${seg.color}70` : 'none',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                flexShrink: 0,
              }}
            />
            <span
              className="font-mono text-[9.5px] tracking-[0.16em] uppercase"
              style={{
                color: seg.color,
                opacity: i === active ? 0.75 : 0,
                transform: i === active ? 'translateX(0)' : 'translateX(-4px)',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                whiteSpace: 'nowrap',
              }}
            >
              {seg.index}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}
