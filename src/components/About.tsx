import FadeIn from './FadeIn'

const values = [
  {
    num: '01',
    title: 'Vận hành đa quốc gia',
    body: 'Một hệ thống kho bãi, vận tải và công nghệ chạy đồng bộ trên nhiều thị trường.',
  },
  {
    num: '02',
    title: 'Công nghệ làm gốc',
    body: 'Mọi thương hiệu thành viên đều được số hoá bởi nền tảng Woka do chính tập đoàn phát triển.',
  },
  {
    num: '03',
    title: 'Tăng trưởng theo chuỗi',
    body: 'Mỗi thương hiệu mới mở ra lấp đầy một mắt xích còn thiếu trong chuỗi giá trị chung.',
  },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 24px' }}>
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        {/* Text side */}
        <div>
          <FadeIn>
            <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-text-faint mb-3.5">
              Về chúng tôi
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2
              className="font-display font-semibold leading-[1.15] mb-[18px]"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              Một hệ sinh thái,
              <br />
              được xây từ niềm tin xuyên biên giới.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-text-muted text-[15.5px] mb-[18px]">
              FADO Group khởi đầu từ FADO.VN năm 2011 — nền tảng giúp người Việt tiếp cận hàng
              hoá chính hãng từ Mỹ, Nhật, Đức và Anh. Từ một nền tảng thương mại điện tử xuyên
              biên giới, chúng tôi mở rộng dần sang logistics, công nghệ và bán lẻ quốc tế, để
              mỗi mắt xích trong chuỗi cung ứng đều do chính hệ sinh thái của mình vận hành.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-text-muted text-[15.5px] mb-7">
              Hôm nay, FADO Group là tập đoàn đa ngành với các thương hiệu hoạt động độc lập
              nhưng chia sẻ chung một hạ tầng công nghệ, dữ liệu và vận hành — phục vụ khách
              hàng cá nhân tại Việt Nam, gia đình trẻ tại Úc, và doanh nghiệp xuất nhập khẩu
              trên toàn thế giới.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(255,255,255,0.25)] transition-all duration-200"
            >
              Trở thành đối tác
            </a>
          </FadeIn>
        </div>

        {/* Value cards */}
        <div className="flex flex-col gap-[18px]">
          {values.map((v, i) => (
            <FadeIn key={v.num} delay={i * 0.08}>
              <div className="p-[26px_28px] rounded-[16px] bg-bg-elevated border border-line">
                <span className="font-mono text-[13px] text-text-faint">{v.num}</span>
                <h4 className="font-display font-semibold text-[17px] mt-2.5 mb-2">{v.title}</h4>
                <p className="text-[14px] text-text-muted">{v.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
