'use client'

const BRAND_NAMES = [
  'FADO.VN', 'Proship', 'Woka', 'Ratraco Solutions', 'Baby Train',
  'Star Kidz', 'Nanny Annie', 'FADO Agri', 'Kayaks2Fish',
  'C.H. Smith Marine', 'GoPrint', 'FADO Solutions',
]

const SEP = '·'

export default function BrandMarquee() {
  const items = [...BRAND_NAMES, ...BRAND_NAMES] // doubled for seamless loop

  return (
    <div
      className="relative overflow-hidden border-t border-b border-line py-4"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center whitespace-nowrap will-change-transform">
        {items.map((name, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-text-faint hover:text-text-muted transition-colors duration-200">
              {name}
            </span>
            <span className="text-accent/50 text-[10px]">{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
