'use client'

import { useEffect, useRef } from 'react'

const COUNT = 32
const MAX_DIST = 155
const SPEED = 0.16   // slower and dreamier than hero (0.32)
const PARTICLE_OPACITY_MIN = 0.15
const PARTICLE_OPACITY_MAX = 0.50

export default function TransitionCanvas() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // parallax offset — updated by scroll listener, read by RAF loop
  const parallaxY = useRef(0)
  const opacityVal = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0

    interface Pt { x:number; y:number; vx:number; vy:number; r:number; op:number }
    let pts: Pt[] = []

    function resize() {
      if (!canvas) return
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      // re-scatter any particles that are now out of bounds
      pts.forEach(p => {
        if (p.x > W) p.x = Math.random() * W
        if (p.y > H) p.y = Math.random() * H
      })
    }

    function initParticles() {
      pts = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r:  Math.random() * 1.4 + 0.5,
        op: PARTICLE_OPACITY_MIN + Math.random() * (PARTICLE_OPACITY_MAX - PARTICLE_OPACITY_MIN),
      }))
    }

    resize()
    initParticles()
    window.addEventListener('resize', resize, { passive: true })

    // ── Scroll-driven opacity + parallax camera movement ──────────────────
    function onScroll() {
      const sy  = window.scrollY
      const vh  = window.innerHeight

      // Fade in: from 45 % to 100 % of hero height
      const fin  = Math.max(0, Math.min(1, (sy - vh * 0.45) / (vh * 0.55)))
      // Fade out: starting ~300 px after pin end (heroHeight + 580 pin + 300 buffer)
      const pinEnd = vh + 580
      const fout = Math.max(0, Math.min(1, (sy - pinEnd) / 280))
      opacityVal.current = fin * (1 - fout) * 0.82

      // Parallax: particle field drifts UP as camera moves down
      // gentle: 0.055 × scroll → 55 px shift over 1000 px of scroll
      parallaxY.current = -sy * 0.055
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init

    // ── RAF draw loop ──────────────────────────────────────────────────────
    let rafId: number

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)

      const py = parallaxY.current

      // Update + wrap particles
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
      }

      ctx.save()
      ctx.translate(0, py)  // camera-down parallax shift

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i].x - pts[j].x
          const dy   = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.09
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${a})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Dots
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.op})`
        ctx.fill()
      }

      ctx.restore()

      // Sync CSS opacity
      if (wrap) wrap.style.opacity = String(opacityVal.current)

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3,          // above page bg, below hero content (z-10)
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Subtle amber glow — parallaxes with the canvas, intensifies during transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,90,31,0.09) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 35% at 50% 72%, rgba(255,90,31,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
