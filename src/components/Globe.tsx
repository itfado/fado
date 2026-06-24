'use client'

import { useEffect, useRef } from 'react'

/* Địa cầu wireframe xoay chậm + điểm sáng & LÁ CỜ tại các trụ sở.
   Cờ là ảnh thật (flagcdn) phủ HTML lên canvas, vị trí bám theo phép chiếu 3D
   (ẩn khi điểm xoay ra mặt sau). Canvas vẽ thân cầu + quầng sáng cho "nổi". */

type City = { code: string; lat: number; lon: number; label: string }

const CITIES: City[] = [
  { code: 'au', lat: -27.47, lon: 153.02, label: 'Brisbane' },
  { code: 'vn', lat: 21.03, lon: 105.85, label: 'Hà Nội' },
  { code: 'vn', lat: 10.82, lon: 106.63, label: 'TP.HCM' },
  { code: 'vn', lat: 16.05, lon: 108.2, label: 'Đà Nẵng' },
  { code: 'jp', lat: 35.68, lon: 139.69, label: 'Tokyo' },
  { code: 'kr', lat: 37.57, lon: 126.98, label: 'Seoul' },
  { code: 'cn', lat: 22.82, lon: 108.32, label: 'Nam Ninh' },
  { code: 'kh', lat: 11.56, lon: 104.92, label: 'Phnom Penh' },
  { code: 'de', lat: 50.11, lon: 8.68, label: 'Frankfurt' },
  { code: 'gb', lat: 51.51, lon: -0.13, label: 'London' },
  { code: 'us', lat: 44.0, lon: -120.5, label: 'Oregon' },
  { code: 'us', lat: 31.0, lon: -99.0, label: 'Texas' },
]

function inkRGB(): string {
  const hex = getComputedStyle(document.documentElement).getPropertyValue('--c-ink').trim()
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const r = parseInt(h.slice(0, 2), 16) || 255
  const g = parseInt(h.slice(2, 4), 16) || 255
  const b = parseInt(h.slice(4, 6), 16) || 255
  return `${r},${g},${b}`
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let ink = inkRGB()
    const obs = new MutationObserver(() => (ink = inkRGB()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let size = 0, R = 0, cx = 0, cy = 0, dpr = 1
    function resize() {
      const box = wrap!.parentElement!
      size = Math.min(box.clientWidth, 480)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = size * dpr
      canvas!.height = size * dpr
      canvas!.style.width = size + 'px'
      canvas!.style.height = size + 'px'
      wrap!.style.width = size + 'px'
      wrap!.style.height = size + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = size * 0.4
      cx = size / 2
      cy = size / 2
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let rot = 0
    let raf = 0
    let last = performance.now()

    function project(lat: number, lon: number) {
      const phi = (lat * Math.PI) / 180
      const theta = (lon * Math.PI) / 180 + rot
      const x = Math.cos(phi) * Math.sin(theta)
      const y = Math.sin(phi)
      const z = Math.cos(phi) * Math.cos(theta)
      return { sx: cx + x * R, sy: cy - y * R, z }
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, size, size)
      rot += dt * 0.16

      // Quầng sáng ngoài → cầu "nổi"
      const outer = ctx!.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35)
      outer.addColorStop(0, 'rgba(255,90,31,0.20)')
      outer.addColorStop(1, 'rgba(255,90,31,0)')
      ctx!.beginPath()
      ctx!.arc(cx, cy, R * 1.35, 0, Math.PI * 2)
      ctx!.fillStyle = outer
      ctx!.fill()

      // Thân cầu — gradient cho cảm giác khối
      const body = ctx!.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R)
      body.addColorStop(0, `rgba(${ink},0.10)`)
      body.addColorStop(0.7, `rgba(${ink},0.04)`)
      body.addColorStop(1, 'rgba(255,90,31,0.10)')
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.fillStyle = body
      ctx!.fill()

      // Vành đĩa
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.strokeStyle = `rgba(${ink},0.28)`
      ctx!.lineWidth = 1.2
      ctx!.stroke()

      // Kinh tuyến
      for (let k = 0; k < 12; k++) {
        const lon0 = (k / 12) * 360 - 180
        ctx!.beginPath()
        let started = false
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (lat * Math.PI) / 180
          const theta = (lon0 * Math.PI) / 180 + rot
          const x = Math.cos(phi) * Math.sin(theta)
          const y = Math.sin(phi)
          const z = Math.cos(phi) * Math.cos(theta)
          if (z < 0) { started = false; continue }
          const sx = cx + x * R, sy = cy - y * R
          if (!started) { ctx!.moveTo(sx, sy); started = true } else ctx!.lineTo(sx, sy)
        }
        ctx!.strokeStyle = `rgba(${ink},0.13)`
        ctx!.lineWidth = 0.7
        ctx!.stroke()
      }
      // Vĩ tuyến
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx!.beginPath()
        let started = false
        for (let lon = -180; lon <= 180; lon += 5) {
          const phi = (lat * Math.PI) / 180
          const theta = (lon * Math.PI) / 180 + rot
          const x = Math.cos(phi) * Math.sin(theta)
          const y = Math.sin(phi)
          const z = Math.cos(phi) * Math.cos(theta)
          if (z < 0) { started = false; continue }
          const sx = cx + x * R, sy = cy - y * R
          if (!started) { ctx!.moveTo(sx, sy); started = true } else ctx!.lineTo(sx, sy)
        }
        ctx!.strokeStyle = `rgba(${ink},0.13)`
        ctx!.lineWidth = 0.7
        ctx!.stroke()
      }

      // Điểm + cập nhật vị trí cờ
      const tnow = performance.now() / 1000
      for (let i = 0; i < CITIES.length; i++) {
        const c = CITIES[i]
        const p = project(c.lat, c.lon)
        const front = p.z > 0.02
        const marker = markerRefs.current[i]
        if (marker) {
          marker.style.transform = `translate(${p.sx}px, ${p.sy}px) translate(-50%, -150%)`
          marker.style.opacity = front ? '1' : '0'
        }
        if (!front) continue
        const pulse = 0.5 + 0.5 * Math.sin(tnow * 2 + i)
        ctx!.beginPath()
        ctx!.arc(p.sx, p.sy, 5 + pulse * 5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,90,31,${0.14 + pulse * 0.14})`
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(p.sx, p.sy, 2.6, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255,90,31,1)'
        ctx!.shadowColor = 'rgba(255,90,31,0.9)'
        ctx!.shadowBlur = 10
        ctx!.fill()
        ctx!.shadowBlur = 0
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (document.visibilityState === 'visible') draw(dt)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      obs.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative w-full flex items-center justify-center">
      <div ref={wrapRef} className="relative">
        <canvas ref={canvasRef} aria-hidden="true" className="block" />
        {CITIES.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              markerRefs.current[i] = el
            }}
            className="absolute left-0 top-0 pointer-events-none will-change-transform"
            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/w40/${c.code}.png`}
              alt={c.label}
              width={22}
              height={16}
              className="rounded-[2px]"
              style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.45)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
