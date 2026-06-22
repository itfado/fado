import FadeIn from './FadeIn'

export default function Contact() {
  return (
    <section id="contact" className="text-center" style={{ padding: '120px 24px' }}>
      <FadeIn>
        <div className="max-w-[680px] mx-auto">
          <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-text-faint mb-3.5">
            Hợp tác cùng FADO Group
          </p>
          <h2
            className="font-display font-semibold leading-[1.15] mb-[18px]"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Sẵn sàng mở rộng
            <br />
            chuỗi giá trị cùng chúng tôi?
          </h2>
          <p className="text-text-muted text-[16px] max-w-[560px] mx-auto mb-9">
            Dù bạn là nhà đầu tư, đối tác logistics hay ứng viên tài năng — chúng tôi luôn tìm
            kiếm những người đồng hành cho hành trình thương mại không biên giới.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:contact@fadogroup.com.au"
              className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(255,255,255,0.25)] transition-all duration-200"
            >
              contact@fadogroup.com.au
            </a>
            <a
              href="https://fadogroup.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-line-strong text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:border-text-muted hover:-translate-y-0.5 transition-all duration-200"
            >
              fadogroup.com.au
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
