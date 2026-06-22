import FadeIn from './FadeIn'

export default function Contact() {
  return (
    <section id="contact" className="text-center relative overflow-hidden" style={{ padding: '120px 24px' }}>
      {/* Subtle ember glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,31,0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <FadeIn>
        <div className="max-w-[680px] mx-auto">
          <p className="font-mono text-[12.5px] tracking-[0.16em] uppercase text-accent mb-4">
            Hợp tác cùng FADO Group
          </p>
          <h2
            className="font-serif font-medium leading-[1.08] mb-[18px] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}
          >
            Sẵn sàng mở rộng
            <br />
            <span className="italic text-accent">chuỗi giá trị</span> cùng chúng tôi?
          </h2>
          <p className="text-text-muted text-[16px] max-w-[560px] mx-auto mb-9">
            Dù bạn là nhà đầu tư, đối tác logistics hay ứng viên tài năng — chúng tôi luôn tìm
            kiếm những người đồng hành cho hành trình thương mại không biên giới.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:contact@fadogroup.com.au"
              className="inline-flex items-center justify-center bg-accent text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(255,90,31,0.5)] transition-all duration-200"
            >
              contact@fadogroup.com.au
            </a>
            <a
              href="https://fadogroup.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-line-strong text-white font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
            >
              fadogroup.com.au
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
