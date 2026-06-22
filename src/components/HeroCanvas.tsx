'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
}

const COUNT = 70
const MAX_DIST = 190
const MOUSE_RADIUS = 180
const MOUSE_FORCE = 0.012
const BASE_SPEED = 0.32

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = 1
    let mx = -9999, my = -9999
    let rafId = 0
    const particles: Particle[] = []

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

    function init() {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          r: Math.random() * 1.4 + 0.6,
          opacity: Math.random() * 0.45 + 0.2,
        })
      }
    }

    function onMouseMove(e: MouseEvent) {
      const hero = canvas!.parentElement!
      const rect = hero.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }

    function onMouseLeave() {
      mx = -9999
      my = -9999
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx!.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(255,255,255,${(1 - dist / MAX_DIST) * 0.08})`
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }
    }

    function frame() {
      if (document.visibilityState !== 'visible') {
        rafId = requestAnimationFrame(frame)
        return
      }

      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Mouse attraction
        const dx = mx - p.x
        const dy = my - p.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < MOUSE_RADIUS * MOUSE_RADIUS && dist2 > 0) {
          const dist = Math.sqrt(dist2)
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Velocity damping + speed clamp
        p.vx *= 0.999
        p.vy *= 0.999
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > BASE_SPEED * 2.8) {
          p.vx = (p.vx / spd) * BASE_SPEED * 2.8
          p.vy = (p.vy / spd) * BASE_SPEED * 2.8
        }
        // Keep moving if too slow
        if (spd < BASE_SPEED * 0.25) {
          p.vx += (Math.random() - 0.5) * 0.015
          p.vy += (Math.random() - 0.5) * 0.015
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -8) p.x = w + 8
        if (p.x > w + 8) p.x = -8
        if (p.y < -8) p.y = h + 8
        if (p.y > h + 8) p.y = -8

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx!.fill()
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const ax = particles[i].x, ay = particles[i].y
          const bx = particles[j].x, by = particles[j].y
          const dx = ax - bx, dy = ay - by
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(ax, ay)
            ctx!.lineTo(bx, by)
            ctx!.strokeStyle = `rgba(255,255,255,${(1 - dist / MAX_DIST) * 0.11})`
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    const hero = canvas!.parentElement!
    hero.addEventListener('mousemove', onMouseMove, { passive: true })
    hero.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('resize', () => { resize(); init() }, { passive: true })

    resize()
    init()

    if (reduceMotion) {
      drawStatic()
    } else {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
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
