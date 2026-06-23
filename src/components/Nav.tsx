'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLocale() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: locale === 'vi' ? 'en' : 'vi' })
  }

  const links = [
    { href: '#ecosystem', label: t('ecosystem') },
    { href: '#global',    label: t('global') },
    { href: '#about',     label: t('about') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-md py-3'
          : 'border-b border-transparent py-[18px]'
      }`}
    >
      <div className="max-w-container mx-auto px-7 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center" aria-label={t('homeLabel')}>
          <Logo size={18} onDark />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-text transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="font-mono text-[12px] tracking-[0.08em] border border-line-strong px-3 py-1.5 rounded-full hover:border-accent/50 hover:text-text transition-all duration-200"
            aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
          >
            {locale === 'vi' ? 'EN' : 'VI'}
          </button>

          <a
            href="#contact"
            className="border border-accent text-accent font-semibold px-[18px] py-2 rounded-full hover:bg-accent hover:text-white transition-colors duration-200"
          >
            {t('contact')}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
        >
          <span className="w-[22px] h-0.5 bg-ink block" />
          <span className="w-[22px] h-0.5 bg-ink block" />
          <span className="w-[22px] h-0.5 bg-ink block" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-[18px] px-7 py-6 text-[15px]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-muted hover:text-text transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-text-muted hover:text-text transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {t('contact')}
          </a>
          <button
            onClick={() => { toggleLocale(); setMobileOpen(false) }}
            className="text-left font-mono text-[12px] tracking-[0.08em] text-text-muted hover:text-text transition-colors"
          >
            {locale === 'vi' ? '🌐 English' : '🌐 Tiếng Việt'}
          </button>
        </div>
      )}
    </header>
  )
}
