'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  // null cho tới khi mount → tránh hydration mismatch (server không biết theme)
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    // Re-apply theme on every mount (locale navigation wipes data-theme from DOM)
    let current: Theme = 'dark'
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') {
        current = stored
      } else {
        current = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
      }
    } catch {
      current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
    }
    document.documentElement.setAttribute('data-theme', current)
    setTheme(current)
  }, [])

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }

  const isLight = theme === 'light'

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center justify-center rounded-full border border-line-strong text-text-muted hover:border-accent/50 hover:text-text transition-all duration-200 ${className}`}
      style={{ width: 34, height: 34 }}
      aria-label={isLight ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng'}
      title={isLight ? 'Nền tối' : 'Nền sáng'}
    >
      {/* Giữ chỗ cố định trước khi mount để layout không nhảy */}
      <span aria-hidden="true" className="block transition-opacity duration-200" style={{ opacity: theme ? 1 : 0 }}>
        {isLight ? (
          // Moon → bấm để sang tối
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun → bấm để sang sáng
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  )
}
