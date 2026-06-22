import Link from 'next/link'
import FadeIn from './FadeIn'
import { brands, segments } from '@/data/brands'

export default function Ecosystem() {
  return (
    <section id="ecosystem" style={{ padding: '120px 24px' }}>
      {/* Section header */}
      <div className="max-w-container mx-auto mb-16">
        <FadeIn>
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            Hệ sinh thái thương hiệu
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2
            className="font-serif font-medium leading-[1.08] mb-[18px] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            Năm mảng kinh doanh,
            <br />
            một <span className="italic text-accent">chuỗi giá trị</span> xuyên biên giới.
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-text-muted text-[16px] max-w-[560px]">
            Mỗi thương hiệu trong FADO Group giải quyết một mắt xích cụ thể của thương mại quốc
            tế — từ lúc đơn hàng được đặt đến khi sản phẩm có mặt trong tay người dùng cuối, ở
            bất kỳ quốc gia nào.
          </p>
        </FadeIn>
      </div>

      {/* Pillars */}
      <div className="max-w-container mx-auto border border-line rounded-[20px] overflow-hidden flex flex-col gap-px">
        {segments.map((seg, si) => {
          const segBrands = brands.filter((b) => b.segment === ((si + 1) as 1 | 2 | 3 | 4 | 5))
          return (
            <FadeIn key={seg.index} delay={si * 0.06}>
              <article className="bg-bg-elevated hover:bg-bg-card transition-colors duration-300 px-10 pt-10 pb-8 border-b border-line last:border-b-0">
                {/* Pillar header */}
                <header className="flex gap-6 items-start mb-7 flex-wrap">
                  <span className="font-mono text-[13px] text-accent border border-accent/40 rounded-full px-2.5 py-1 flex-shrink-0 mt-1">
                    {seg.index}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-[22px] mb-1.5">{seg.title}</h3>
                    <p className="text-text-muted text-[14.5px] max-w-[520px]">{seg.summary}</p>
                  </div>
                </header>

                {/* Brand cards */}
                <ul className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                  {segBrands.map((brand) => (
                    <li key={brand.slug}>
                      <Link
                        href={`/thuong-hieu/${brand.slug}`}
                        className="group flex flex-col gap-1.5 p-[18px_20px] rounded-card bg-bg-card border border-line hover:border-accent/50 hover:-translate-y-[3px] hover:bg-bg-card-hover transition-all duration-200 block"
                      >
                        <span className="font-display font-semibold text-[15.5px] group-hover:text-accent transition-colors duration-200">{brand.name}</span>
                        <span className="text-[13px] text-text-muted leading-[1.5]">{brand.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
