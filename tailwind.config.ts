import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        'bg-elevated': '#0a0a0a',
        'bg-card': '#121212',
        'bg-card-hover': '#1a1a1a',
        line: 'rgba(255,255,255,0.10)',
        'line-strong': 'rgba(255,255,255,0.22)',
        text: '#ffffff',
        'text-muted': '#a3a3a3',
        'text-faint': '#5c5c5c',
        // Màu nhấn ember — điểm xuyết, chủ đạo vẫn đen-trắng
        accent: '#FF5A1F',
        'accent-soft': '#FF7A47',
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
