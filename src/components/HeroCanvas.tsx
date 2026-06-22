'use client'

import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = 1
    let mx = 0, my = 0, ox = 0, oy = 0
    let rafId = 0

    const rings = [
      { base: 90, growth: 170, period: 6000, phase: 0, tint: '255,90,31' },
      { base: 90, growth: 260, period: 6000, phase: 2000, tint: '255,255,255' },
      { base: 90, growth: 340, period: 6000, phase: 4000, tint: '255,255,255' },
    ]

    function resize() {
      const hero = canvas!.parentElement!
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = hero.clientWidth
      h = hero.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function onMouseMove(e: MouseEvent) {
      const hero = canvas!.parentElement!
      const rect = hero.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 24
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 24
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h)
      const cx = w / 2, cy = h * 0.42
      ctx!.beginPath()
      ctx!.arc(cx, cy, 200, 0, Math.PI * 2)
      ctx!.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx!.lineWidth = 1
      ctx!.stroke()
    }

    function frame(now: number) {
      if (document.visibilityState !== 'visible') {
        rafId = requestAnimationFrame(frame)
        return
      }

      ox += (mx - ox) * 0.05
      oy += (my - oy) * 0.05

      ctx!.clearRect(0, 0, w, h)
      const cx = w / 2 + ox
      const cy = h * 0.42 + oy

      rings.forEach((r) => {
        const t = ((now + r.phase) % r.period) / r.period
        const radius = r.base + t * r.growth
        const opacity = 0.14 * (1 - t)
        ctx!.beginPath()
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(${r.tint},${opacity})`
        ctx!.lineWidth = 1
        ctx!.stroke()
      })

      rafId = requestAnimationFrame(frame)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    resize()

    if (reduceMotion) {
      drawStatic()
    } else {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
