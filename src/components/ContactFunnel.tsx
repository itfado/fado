'use client'

import { useEffect, useRef } from 'react'

/* Phễu hội tụ ở Contact: các hạt cam rót từ trên xuống và hội tụ vào một điểm
   sáng ngay khối CTA — như đáy phễu / điểm chuyển đổi. Kích hoạt khi section
   vào tầm nhìn (opacity ramp). Canvas đặt sau nội dung. */

const COUNT = 38
const FOCAL_Y = 0.72 // vị trí "đáy phễu" theo chiều cao section (gần CTA)

export default function ContactFunnel() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0, H = 0, dpr = 1
    function resize() {
      W = wrap!.clientWidth
      H = wrap!.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      canvas!.style.width = W + 'px'
      canvas!.style.height = H + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    type P = { a: number; p: number; sp: number; r: number; op: number }
    const pts: P[] = Array.from({ length: COUNT }, () => ({
      a: (Math.random() - 0.5) * 2, // hệ số trải ngang -1..1
      p: Math.random(), // tiến trình 0 (trên) → 1 (đáy phễu)
      sp: 0.018 + Math.random() * 0.032,
      r: Math.random() * 1.2 + 0.5,
      op: 0.07 + Math.random() * 0.13,
    }))

    let active = false
    const io = new IntersectionObserver(([e]) => (active = e.isIntersecting), { threshold: 0.15 })
    const section = wrap.parentElement
    if (section) io.observe(section)

    let shown = 0
    let raf = 0
    let last = performance.now()
    function draw(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      shown += ((active ? 1 : 0) - shown) * Math.min(1, dt * 0.8) // ramp opacity êm, từ tốn
      ctx!.clearRect(0, 0, W, H)

      if (shown > 0.01) {
        const cx = W / 2
        const fy = H * FOCAL_Y

        for (const p of pts) {
          if (!reduce) {
            p.p += p.sp * dt
            if (p.p > 1) p.p -= 1
          }
          const ease = p.p * p.p // tăng tốc hội tụ về đáy
          const x = cx + p.a * (W * 0.42) * (1 - ease)
          const y = p.p * fy
          const fade = p.p < 0.85 ? 1 : (1 - p.p) / 0.15 // mờ dần khi tới điểm hội tụ
          ctx!.beginPath()
          ctx!.arc(x, y, p.r * (1 - p.p * 0.4), 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(255,${100 + Math.round(p.p * 40)},40,${p.op * fade * shown})`
          ctx!.shadowColor = 'rgba(255,90,31,0.5)'
          ctx!.shadowBlur = 4
          ctx!.fill()
          ctx!.shadowBlur = 0
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
