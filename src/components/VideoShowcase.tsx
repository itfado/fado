'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Replace with actual YouTube video ID when ready
const YOUTUBE_ID = ''

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [72, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (playing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [playing])

  return (
    <section ref={sectionRef} style={{ padding: '0 24px 80px' }}>
      <motion.div
        style={{ y, scale, opacity }}
        className="max-w-container mx-auto relative rounded-[22px] overflow-hidden"
        aria-label="Video tổng quan hệ sinh thái FADO Group"
      >
        {/* Container background */}
        <div
          className="relative w-full"
          style={{ aspectRatio: '16/9', background: '#080808' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 60% at 50% 45%, rgba(255,90,31,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Animated grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating brand stats */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-6 text-center px-6">
              {/* FADO wordmark area */}
              <div className="flex items-center gap-3 opacity-20">
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/70">
                  FADO Group — Cross‑Border Commerce Ecosystem
                </span>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.4)' }} />
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 sm:gap-14 opacity-15">
                {[
                  { n: '14+', label: 'thương hiệu' },
                  { n: '9', label: 'quốc gia' },
                  { n: '15+', label: 'năm' },
                ].map(({ n, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span
                      className="font-display font-bold text-white"
                      style={{ fontSize: 'clamp(20px, 3vw, 40px)' }}
                    >
                      {n}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Play button — center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => setPlaying(true)}
              className="group flex items-center gap-3 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                padding: '14px 28px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
              aria-label="Phát video giới thiệu FADO Group"
            >
              {/* Play icon */}
              <span
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <path d="M1 1L10 6.5L1 12V1Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span
                className="font-ui font-medium text-white/90 tracking-[-0.01em]"
                style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
              >
                Phát video giới thiệu
              </span>
            </button>
          </div>

          {/* Bottom bar — thin accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,90,31,0.6), transparent)' }}
          />
        </div>
      </motion.div>

      {/* YouTube modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
          onClick={() => setPlaying(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video giới thiệu FADO Group"
        >
          <div
            className="relative w-full rounded-[18px] overflow-hidden shadow-2xl"
            style={{ maxWidth: 960, aspectRatio: '16/9', background: '#000' }}
            onClick={(e) => e.stopPropagation()}
          >
            {YOUTUBE_ID ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="FADO Group — Video tổng quan"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[13px] text-white/30 tracking-[0.1em] uppercase">
                  Video đang cập nhật
                </p>
              </div>
            )}
            {/* Close */}
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                width: 36,
                height: 36,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
              aria-label="Đóng video"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
