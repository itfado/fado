'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'

type Cat = 'catProduct' | 'catCorporate' | 'catEvent' | 'catCareer'

type Post = {
  cat: Cat
  dateISO: string
  titleVi: string
  titleEn: string
  excerptVi: string
  excerptEn: string
  quoteVi?: string
  quoteEn?: string
  quoteAttrib?: string
  image?: string
  gradFrom: string
  gradTo: string
  source: string
  url: string
}

const CAT_COLORS: Record<Cat, string> = {
  catProduct:   '#f59e0b',
  catCorporate: '#3b82f6',
  catEvent:     '#a855f7',
  catCareer:    '#10b981',
}

const POSTS: Post[] = [
  {
    cat: 'catProduct',
    dateISO: '2024-10-25',
    titleVi: 'FADO iExport xuất khẩu lô hàng dừa tươi đầu tiên sang Trung Quốc bằng đường sắt',
    titleEn: 'FADO iExport Ships First Fresh Coconut Cargo to China by Rail',
    excerptVi: 'Ratraco và FADO iExport phối hợp xuất khẩu 3 container dừa tươi (67,5 tấn) qua ga đường sắt quốc tế Sóng Thần — lô hàng lịch sử đầu tiên theo đường sắt.',
    excerptEn: 'Ratraco and FADO iExport organized the first fresh coconut export to China via rail — 3 containers, 67.5 tons — through Song Than international railway station.',
    image: 'https://vnn.1cdn.vn/2024/10/25/uploads-2024-thang-10-ngay-25-huong-7.jpg',
    gradFrom: '#f59e0b',
    gradTo: '#10b981',
    source: 'VietnamNet',
    url: 'https://dantocphattrien.vietnamnet.vn/fado-iexport-xuat-khau-lo-hang-dua-tuoi-dau-tien-sang-trung-quoc-bang-duong-sat-59813.html',
  },
  {
    cat: 'catProduct',
    dateISO: '2024-10-24',
    titleVi: 'Tiền Giang: Xuất khẩu lô dừa tươi chính ngạch đầu tiên sang Trung Quốc',
    titleEn: 'Tien Giang Exports First Official Fresh Coconut Shipment to China',
    excerptVi: 'Sở Công Thương Tiền Giang phối hợp FADO iExport xuất khẩu lô dừa tươi chính ngạch đầu tiên — 3 container, khoảng 70 tấn — mở ra cột mốc thương mại quan trọng.',
    excerptEn: "Tien Giang's Department of Commerce and FADO iExport co-exported the province's first official fresh coconut shipment — 3 containers, approx. 70 tons.",
    image: 'https://media.vietnamplus.vn/images/a8a065741144e9a45b13148945811c8a8c4d698dd8aff308d06b202eb0904a2752af1efc5f09cff7305d98798dd9691ac322434dfa73e3e3f89748ded939af94b6bc3d8e12fdc5e09b626d393e29df3e/xuat-khau-dua-tuoi-tien-giang-8888.jpg.avif',
    gradFrom: '#10b981',
    gradTo: '#f59e0b',
    source: 'VietnamPlus',
    url: 'https://www.vietnamplus.vn/tien-giang-xuat-khau-lo-dua-tuoi-chinh-ngach-dau-tien-sang-trung-quoc-post987266.vnp',
  },
  {
    cat: 'catEvent',
    dateISO: '2019-07-12',
    titleVi: '600 chuyên gia, doanh nghiệp sắp bàn về cơ hội xuất khẩu trước căng thẳng Mỹ-Trung',
    titleEn: '600 Experts to Discuss Export Opportunities Amid US-China Trade Tensions',
    excerptVi: 'Với phương thức truyền thống, doanh nghiệp cần ít nhất 6 tháng từ lúc tiếp cận đến khi ký hợp đồng.',
    excerptEn: 'With traditional methods, businesses need at least 6 months from initial contact to signing contracts.',
    quoteVi: 'Với phương thức truyền thống, doanh nghiệp cần ít nhất 6 tháng từ lúc tiếp cận đến khi ký hợp đồng.',
    quoteEn: 'With traditional methods, businesses need at least 6 months from initial contact to signing contracts.',
    quoteAttrib: 'Phạm Tấn Đạt — CEO, FADO',
    gradFrom: '#a855f7',
    gradTo: '#3b82f6',
    source: 'VnExpress',
    url: 'https://vnexpress.net/600-chuyen-gia-doanh-nghiep-sa-p-ban-ve-co-hoi-xuat-khau-truoc-cang-thang-my-trung-3951285.html',
  },
  {
    cat: 'catCorporate',
    dateISO: '2024-08-06',
    titleVi: 'Ratraco Solutions tiếp nhận lô container lạnh phục vụ vận tải đường sắt',
    titleEn: 'Ratraco Solutions Receives Refrigerated Container Fleet for Rail Logistics',
    excerptVi: 'Ratraco Solutions — liên doanh giữa Ratraco và FADO Group — trở thành đơn vị duy nhất cung cấp dịch vụ vận tải container lạnh bằng đường sắt quốc gia Việt Nam.',
    excerptEn: "Ratraco Solutions — a joint venture between Ratraco and FADO Group — became Vietnam's sole provider of refrigerated container transport on the national railway network.",
    gradFrom: '#3b82f6',
    gradTo: '#06b6d4',
    source: 'Báo Pháp Luật',
    url: 'https://baophapluat.vn/ratraco-solutions-tiep-nhan-lo-container-lanh-phuc-vu-van-tai-duong-sat-post520893.html',
  },
  {
    cat: 'catCorporate',
    dateISO: '2019-01-22',
    titleVi: 'FADO hỗ trợ doanh nghiệp nhỏ tăng cạnh tranh xuất khẩu',
    titleEn: 'FADO Helps Small Businesses Boost Export Competitiveness',
    excerptVi: 'Là đối tác ủy quyền Alibaba tại Việt Nam, FADO cung cấp nền tảng TMĐT xuyên biên giới giúp doanh nghiệp vừa và nhỏ tiếp cận thị trường xuất khẩu toàn cầu.',
    excerptEn: 'As an Alibaba authorized partner in Vietnam, FADO provides a cross-border e-commerce platform helping SMEs reach global export markets.',
    gradFrom: '#06b6d4',
    gradTo: '#a855f7',
    source: 'VnExpress',
    url: 'https://vnexpress.net/fado-ho-tro-doanh-nghiep-nho-tang-canh-tranh-xuat-khau-3870266.html',
  },
]

function formatDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (locale === 'vi') {
    return `${d} tháng ${m}, ${y}`
  }
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function LatestBlogs() {
  const t = useTranslations('news')
  const locale = useLocale()
  const scroller = useRef<HTMLDivElement>(null)

  function scrollBy(dir: number) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section id="news" className="py-16 md:py-[120px] px-6">
      <div className="max-w-container mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
              {t('sectionLabel')}
            </p>
            <h2
              className="font-display font-semibold leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.025em' }}
            >
              {t('title')}
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-full text-[14px] hover:bg-accent hover:text-white transition-colors duration-200"
          >
            {t('viewAll')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
        >
          {POSTS.map((p, i) => {
            const accent = CAT_COLORS[p.cat]
            const title  = locale === 'vi' ? p.titleVi  : p.titleEn
            const quote  = locale === 'vi' ? p.quoteVi  : p.quoteEn
            const date   = formatDate(p.dateISO, locale)

            return (
              <article
                key={i}
                className="group flex-shrink-0 w-[300px] sm:w-[340px] flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Thumbnail */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-[18px] overflow-hidden mb-4 flex-shrink-0"
                  style={{ aspectRatio: '4/3' }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {p.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Bottom scrim for readability */}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                    </>
                  ) : (
                    <>
                      {/* Gradient bg */}
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})` }}
                      />
                      {/* Noise overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                        style={{
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                        }}
                      />
                      {/* Quote text on gradient */}
                      {quote && (
                        <div className="absolute inset-0 flex flex-col justify-center px-6">
                          <svg className="mb-3 opacity-50" width="28" height="20" viewBox="0 0 28 20" fill="white" aria-hidden="true">
                            <path d="M0 20V12.182C0 5.394 3.636 1.394 10.909 0L12.727 2.909C9.697 3.818 7.879 5.576 7.273 8.182H12.727V20H0ZM15.273 20V12.182C15.273 5.394 18.909 1.394 26.182 0L28 2.909C24.97 3.818 23.152 5.576 22.545 8.182H28V20H15.273Z"/>
                          </svg>
                          <p className="font-ui text-[13.5px] leading-[1.6] text-white font-medium line-clamp-4">
                            {quote}
                          </p>
                          {p.quoteAttrib && (
                            <p className="font-mono text-[11px] text-white/70 mt-3 tracking-[0.06em]">
                              — {p.quoteAttrib}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Category badge */}
                  <span
                    className="absolute top-4 left-4 font-mono text-[10.5px] tracking-[0.12em] uppercase text-white px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{ background: `${accent}cc` }}
                  >
                    {t(p.cat)}
                  </span>

                  {/* Source badge (bottom right) */}
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.06em] text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {p.source}
                  </span>
                </a>

                {/* Body */}
                <div className="flex flex-col flex-1">
                  <p className="font-mono text-[11.5px] text-text-faint mb-2.5 tracking-[0.04em]">
                    {date}
                  </p>
                  <h3
                    className="font-ui font-semibold text-[16px] leading-[1.4] mb-3 line-clamp-3 group-hover:text-accent transition-colors duration-200"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  </h3>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[13px] mt-auto pt-1"
                    style={{ color: accent }}
                  >
                    {t('readMore')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Arrows */}
        <div className="flex gap-3 mt-10">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Trước"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-text-faint text-text hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Sau"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-text-faint text-text hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
