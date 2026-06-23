'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  color: string // 'r,g,b'
  glow: boolean // hạt sáng nổi bật, có quầng
}

const COUNT = 92
const MAX_DIST = 190
const MOUSE_RADIUS = 240
const MOUSE_FORCE = 0.013   // gentle attraction when idle
const BASE_SPEED = 0.32

// Bảng màu đa sắc (đồng bộ màu 5 mảng + ember) — kiểu x.ai / Antigravity
const PALETTE = [
  '255,90,31',   // ember
  '59,130,246',  // blue
  '168,85,247',  // violet
  '16,185,129',  // green
  '6,182,212',   // cyan
  '245,158,11',  // amber
]

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Màu "mực" theo theme: trắng ở dark, đậm ở light. Đọc từ token --c-ink.
    function readInk(): string {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--c-ink').trim()
      let h = hex.replace('#', '')
      if (h.length === 3) h = h.split('').map((c) => c + c).join('')
      const r = parseInt(h.slice(0, 2), 16) || 255
      const g = parseInt(h.slice(2, 4), 16) || 255
      const b = parseInt(h.slice(4, 6), 16) || 255
      return `${r},${g},${b}`
    }
    let inkRGB = readInk()
    const themeObs = new MutationObserver(() => {
      inkRGB = readInk()
      if (reduceMotion) drawStatic()
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let w = 0, h = 0, dpr = 1
    let mx = -9999, my = -9999
    let pmx = -9999, pmy = -9999   // previous mouse pos for velocity calc
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
          color: PALETTE[(Math.random() * PALETTE.length) | 0],
          glow: Math.random() < 0.3,
        })
      }
    }

    function onMouseMove(e: MouseEvent) {
      const hero = canvas!.parentElement!
      const rect = hero.getBoundingClientRect()
      pmx = mx
      pmy = my
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }

    function onMouseLeave() {
      pmx = -9999; pmy = -9999
      mx = -9999; my = -9999
    }

    function drawDot(p: Particle) {
      if (p.glow) {
        ctx!.shadowColor = `rgba(${p.color},0.9)`
        ctx!.shadowBlur = 10
      }
      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.glow ? p.r * 1.4 : p.r, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${p.color},${p.opacity + (p.glow ? 0.25 : 0)})`
      ctx!.fill()
      ctx!.shadowBlur = 0
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) drawDot(p)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${inkRGB},${(1 - dist / MAX_DIST) * 0.08})`
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

      // Mouse velocity this frame — cleared after reading so it doesn't persist
      const mouseVx = (pmx > -9000 && mx > -9000) ? (mx - pmx) : 0
      const mouseVy = (pmy > -9000 && my > -9000) ? (my - pmy) : 0
      const mouseSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy)
      // Reset previous = current so velocity = 0 next frame if no new mousemove
      pmx = mx
      pmy = my

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist2 = dx * dx + dy * dy

        if (dist2 < MOUSE_RADIUS * MOUSE_RADIUS && mx > -9000) {
          const dist = Math.sqrt(dist2)
          const proximity = 1 - dist / MOUSE_RADIUS

          if (mouseSpeed > 4) {
            // Fast sweep — carry particles along with cursor direction
            p.vx += mouseVx * proximity * 0.22
            p.vy += mouseVy * proximity * 0.22
          } else {
            // Idle / slow — gentle attraction toward cursor
            if (dist > 0) {
              const force = proximity * MOUSE_FORCE
              p.vx += (dx / dist) * force
              p.vy += (dy / dist) * force
            }
          }
        }

        // Damping — looser when mouse active so particles carry momentum
        const damping = mouseSpeed > 4 ? 0.95 : 0.999
        p.vx *= damping
        p.vy *= damping

        // Speed cap — much higher when mouse is sweeping
        const maxSpeed = mouseSpeed > 4 ? BASE_SPEED * 7 : BASE_SPEED * 2.8
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > maxSpeed) {
          p.vx = (p.vx / spd) * maxSpeed
          p.vy = (p.vy / spd) * maxSpeed
        }

        // Keep drifting if too slow
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

        drawDot(p)
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
            ctx!.strokeStyle = `rgba(${inkRGB},${(1 - dist / MAX_DIST) * 0.11})`
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
      themeObs.disconnect()
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ animation: 'heroFade 1.6s ease both' }}
      aria-hidden="true"
    />
  )
}
