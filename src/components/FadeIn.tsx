'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /**
   * 'up'     — fade + slide up (default)
   * 'scale'  — fade + subtle scale
   * 'reveal' — clip-path slot-machine reveal (cinematic, for headlines)
   */
  variant?: 'up' | 'scale' | 'reveal'
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0  },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show:   { opacity: 1, scale: 1    },
  },
  reveal: {
    hidden: { clipPath: 'inset(0 0 105% 0)', opacity: 0 },
    show:   { clipPath: 'inset(0 0 0% 0)',   opacity: 1 },
  },
}

const transitions = {
  up:     { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
  scale:  { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] as const },
  reveal: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
}

export default function FadeIn({ children, delay = 0, className, variant = 'up' }: Props) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -20px 0px' }}
      transition={{ ...transitions[variant], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
