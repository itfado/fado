'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'

/* Section tin tức kiểu "Latest Blogs" (cảm hứng antigravity.google):
   header + nút xem tất cả, hàng thẻ cuộn ngang + mũi tên prev/next.
   Hiện dùng thẻ placeholder (thumbnail gradient đa sắc) — nội dung thật bổ sung sau. */

type Post = { cat: string; from: string; to: string }

const POSTS: Post[] = [
  { cat: 'catProduct', from: '#ff5a1f', to: '#a855f7' },
  { cat: 'catCorporate', from: '#3b82f6', to: '#06b6d4' },
  { cat: 'catEvent', from: '#a855f7', to: '#ff5a1f' },
  { cat: 'catCareer', from: '#10b981', to: '#3b82f6' },
  { cat: 'catProduct', from: '#06b6d4', to: '#a855f7' },
]

export default function LatestBlogs() {
  const t = useTranslations('news')
  const scroller = useRef<HTMLDivElement>(null)

  function scrollBy(dir: number) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section id="news" style={{ padding: '120px 24px' }}>
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
              {t('sectionLabel')}
            </p>
            <h2
              className="font-display font-semibold leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.025em' }}
            >
              {t('title')}
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center border border-accent text-accent font-semibold px-6 py-3 rounded-full text-[14px] hover:bg-accent hover:text-white transition-colors duration-200"
          >
            {t('viewAll')}
          </a>
        </div>

        {/* Cards */}
        <div
          ref={scroller}
          className="flex gap-6 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
        >
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="group flex-shrink-0 w-[300px] sm:w-[340px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Thumbnail */}
              <a
                href="#"
                className="block relative rounded-[18px] overflow-hidden mb-5"
                style={{ aspectRatio: '4/3' }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                />
                {/* Grain */}
                <div
                  className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                  }}
                />
                <span className="absolute top-4 left-4 font-mono text-[10.5px] tracking-[0.14em] uppercase text-white/90 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {t(p.cat)}
                </span>
                <span className="absolute bottom-4 left-4 font-display font-bold text-white/85 text-[20px] tracking-[0.12em]">
                  FADO
                </span>
              </a>
              {/* Meta */}
              <p className="font-mono text-[12px] text-text-faint mb-2">
                {t('dateTbd')} · {t(p.cat)}
              </p>
              <h3 className="font-ui font-semibold text-[17px] leading-[1.35] mb-3" style={{ letterSpacing: '-0.01em' }}>
                {t('comingSoon')}
              </h3>
              <span className="inline-flex items-center gap-1.5 font-medium text-[13.5px] text-accent">
                {t('readMore')}
                <span aria-hidden="true">›</span>
              </span>
            </article>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3 mt-10">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Trước"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-line-strong text-text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Sau"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-line-strong text-text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
