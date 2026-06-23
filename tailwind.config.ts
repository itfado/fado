import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Token ngữ nghĩa — giá trị thực nằm trong globals.css, đổi theo theme (light/dark)
        bg: 'var(--c-bg)',
        'bg-elevated': 'var(--c-bg-elevated)',
        'bg-card': 'var(--c-bg-card)',
        'bg-card-hover': 'var(--c-bg-card-hover)',
        line: 'var(--c-line)',
        'line-strong': 'var(--c-line-strong)',
        text: 'var(--c-text)',
        'text-muted': 'var(--c-text-muted)',
        'text-faint': 'var(--c-text-faint)',
        // Màu nhấn ember — điểm xuyết, giữ nguyên trên cả 2 theme
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        // Token "mực" động: đậm trên nền sáng, trắng trên nền tối — thay cho rgba(255,255,255,…) cứng
        ink: 'var(--c-ink)',
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'sans-serif'],
        ui: ['var(--font-space-grotesk)', 'Inter', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        wordmark: ['var(--font-montserrat)', 'sans-serif'],
      },
      maxWidth: {
        container: '1180px',
      },
      borderRadius: {
        card: '14px',
        'card-lg': '20px',
      },
    },
  },
  plugins: [],
}

export default config
