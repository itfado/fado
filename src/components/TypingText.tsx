'use client'

import { useEffect, useRef, useState } from 'react'

/* Gõ chữ từng ký tự. Tùy chọn:
   - startOnView: bắt đầu gõ khi cuộn tới (cho section dưới)
   - persistentCaret: giữ con trỏ nhấp nháy sau khi gõ xong (kiểu Antigravity)
   Tôn trọng reduce-motion (hiện full ngay). Giữ chỗ full để layout không nhảy. */
export default function TypingText({
  text,
  speed = 16,
  startDelay = 300,
  startOnView = false,
  persistentCaret = false,
  className,
  style,
}: {
  text: string
  speed?: number
  startDelay?: number
  startOnView?: boolean
  persistentCaret?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const reduced = useRef(false)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) {
      setCount(text.length)
      setStarted(true)
      return
    }
    if (!startOnView) {
      const id = setTimeout(() => setStarted(true), startDelay)
      return () => clearTimeout(id)
    }
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setStarted(true), startDelay)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text, startDelay, startOnView])

  useEffect(() => {
    if (!started || reduced.current) return
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(id)
  }, [started, count, text.length, speed])

  const done = count >= text.length
  const showCaret = started && (!done || persistentCaret)

  return (
    // Bản full ẩn giữ chỗ → layout cố định; chữ gõ phủ đè lên
    <span
      ref={wrapRef}
      className={className}
      style={{ ...style, position: 'relative', display: 'block' }}
      aria-label={text}
    >
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        {text}
      </span>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {text.slice(0, count)}
        {showCaret && (
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '1.05em',
              marginLeft: '3px',
              borderRadius: '2px',
              transform: 'translateY(3px)',
              background: 'var(--c-accent)',
              boxShadow: '0 0 8px var(--c-accent), 0 0 2px var(--c-accent)',
              animation: 'caretBlink 1.05s ease-in-out infinite',
            }}
          />
        )}
      </span>
    </span>
  )
}
