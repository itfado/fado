'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

export function BrandGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid gap-px p-px"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
    >
      {children}
    </motion.ul>
  )
}

export function BrandItem({ children }: { children: React.ReactNode }) {
  return <motion.li variants={item}>{children}</motion.li>
}
