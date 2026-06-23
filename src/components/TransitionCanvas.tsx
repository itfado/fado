'use client'

import { useEffect, useRef } from 'react'

/* Hiệu ứng "phễu": khi cuộn từ Hero xuống section dưới, các hạt cam (và quầng
   sáng cam) chảy xuống và hội tụ dần về tâm như rót qua phễu. Opacity gắn theo
   vị trí cuộn nên chỉ hiện trong vùng chuyển tiếp hero → nội dung. */

const COUNT = 80

export default function TransitionCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacityVal = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0, H = 0, dpr = 1
    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      canvas!.style.width = W + 'px'
      canvas!.style.height = H + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    type P = { x0: number; y: number; r: number; op: number; sp: number }
    let pts: P[] = []
    function init() {
      pts = Array.from({ length: COUNT }, () => ({
        x0: Math.random(), // 0..1 vị trí ngang gốc
        y: Math.random() * H,
        r: Math.random() * 1.7 + 0.6,
        op: 0.2 + Math.random() * 0.55,
        sp: 40 + Math.random() * 90, // px/giây rơi xuống
      }))
    }
    init()

    const clamp = (v: number) => Math.max(0, Math.min(1, v))
    function onScroll() {
      const sy = window.scrollY
      const vh = window.innerHeight
      const fin = clamp((sy - vh * 0.4) / (vh * 0.5))
      const fout = clamp((sy - vh * 1.5) / (vh * 0.45))
      opacityVal.current = fin * (1 - fout)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let raf = 0
    let last = performance.now()
    function draw(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx!.clearRect(0, 0, W, H)
      const op = opacityVal.current
      if (op > 0.002) {
        const cx = W / 2

        // Quầng phễu: cam đậm ở trên, hội tụ & nhạt dần xuống
        const cone = ctx!.createLinearGradient(0, 0, 0, H)
        cone.addColorStop(0, `rgba(255,90,31,${0.06 * op})`)
        cone.addColorStop(0.55, `rgba(255,90,31,${0.03 * op})`)
        cone.addColorStop(1, 'rgba(255,90,31,0)')
        ctx!.fillStyle = cone
        ctx!.fillRect(0, 0, W, H)

        // Hạt rơi xuống + hội tụ về tâm (phễu)
        for (const p of pts) {
          if (!reduce) p.y += p.sp * dt * (0.5 + op)
          if (p.y > H + 12) p.y = -12
          const t = clamp(p.y / H) // 0 trên → 1 dưới
          const spread = (p.x0 - 0.5) * W * (1 - t * 0.82) // càng xuống càng tụ
          const x = cx + spread
          ctx!.beginPath()
          ctx!.arc(x, p.y, p.r * (1 - t * 0.3), 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(255,${90 + Math.round(t * 45)},31,${p.op * op})`
          ctx!.shadowColor = 'rgba(255,90,31,0.8)'
          ctx!.shadowBlur = 6
          ctx!.fill()
          ctx!.shadowBlur = 0
        }
      }
      if (wrap) wrap.style.opacity = String(op)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 3, opacity: 0, pointerEvents: 'none' }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
