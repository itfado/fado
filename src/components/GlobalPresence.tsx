import FadeIn from './FadeIn'
import { officeGroups } from '@/data/offices'

export default function GlobalPresence() {
  return (
    <section
      id="global"
      className="bg-bg-elevated border-t border-line border-b border-b-line"
      style={{ padding: '120px 24px' }}
    >
      {/* Section header */}
      <div className="max-w-container mx-auto mb-16">
        <FadeIn>
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            Hiện diện toàn cầu
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2
            className="font-serif font-medium leading-[1.08] mb-[18px] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            Một chuỗi cung ứng,
            <br />
            <span className="italic text-accent">chín quốc gia.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-text-muted text-[16px] max-w-[560px]">
            Văn phòng và kho vận của FADO Group trải dài từ trụ sở tại Úc, các trung tâm vận hành
            ở Việt Nam, đến các điểm kết nối tại châu Âu, Bắc Mỹ và Đông Á.
          </p>
        </FadeIn>
      </div>

      {/* Office grid */}
      <FadeIn delay={0.18}>
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {officeGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-mono text-[13px] tracking-[0.08em] uppercase text-accent font-medium mb-4">
                {group.title}
              </h4>
              <ul>
                {group.offices.map((office, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[14px] text-text-muted py-2 border-t border-line first:border-t-0"
                  >
                    <span className="text-[16px] leading-[1.4] flex-shrink-0">{office.flag}</span>
                    {office.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
