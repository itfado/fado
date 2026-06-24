'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  )
}

export default function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const progress = useMotionValue(0)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update() {
      const rect = el!.getBoundingClientRect()
      const vh = window.innerHeight
      // progress 0: element top at 90% from top of viewport (just entering)
      // progress 1: element bottom at 15% from top of viewport (mostly passed)
      const startY = vh * 0.90
      const endY   = vh * 0.15

      if (rect.top >= startY) {
        progress.set(0)
      } else if (rect.bottom <= endY) {
        progress.set(1)
      } else {
        const range = (startY - endY) + rect.height
        const scrolled = startY - rect.top
        progress.set(Math.max(0, Math.min(1, scrolled / range)))
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [progress])

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end   = Math.min(1, (i + 4) / words.length)
        return (
          <Word key={`${word}-${i}`} word={word} progress={progress} start={start} end={end} />
        )
      })}
    </p>
  )
}
