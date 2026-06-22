'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /** 'up' (default): fade + slide up | 'scale': fade + subtle scale */
  variant?: 'up' | 'scale'
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0  },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    show:   { opacity: 1, scale: 1    },
  },
}

export default function FadeIn({ children, delay = 0, className, variant = 'up' }: Props) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
