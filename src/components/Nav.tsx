'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#ecosystem', label: 'Hệ sinh thái' },
    { href: '#global', label: 'Toàn cầu' },
    { href: '#about', label: 'Về chúng tôi' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'border-b border-line bg-black/80 backdrop-blur-md py-3'
          : 'border-b border-transparent py-[18px]'
      }`}
    >
      <div className="max-w-container mx-auto px-7 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="FADO Group — Trang chủ">
          <Logo size={18} onDark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent text-white font-semibold px-[18px] py-2 rounded-full hover:bg-accent-soft transition-colors duration-200"
          >
            Liên hệ
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <span className="w-[22px] h-0.5 bg-white block" />
          <span className="w-[22px] h-0.5 bg-white block" />
          <span className="w-[22px] h-0.5 bg-white block" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-[18px] px-7 py-6 text-[15px]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-text-muted hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Liên hệ
          </a>
        </div>
      )}
    </header>
  )
}
