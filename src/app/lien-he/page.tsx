import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Liên hệ' }

export default function LienHe() {
  return (
    <>
      <Nav />
      <main className="min-h-screen" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-container mx-auto px-6">
          <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-text-faint mb-4">
            Liên hệ
          </p>
          <h1
            className="font-display font-semibold leading-[1.1] mb-12"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Hợp tác cùng FADO Group.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-semibold text-[20px] mb-6">Thông tin liên hệ</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:contact@fadogroup.com.au"
                    className="text-[15px] text-text-muted hover:text-white transition-colors"
                  >
                    contact@fadogroup.com.au
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    Website
                  </p>
                  <a
                    href="https://fadogroup.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-text-muted hover:text-white transition-colors"
                  >
                    fadogroup.com.au
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-faint mb-1.5">
                    Trụ sở chính
                  </p>
                  <p className="text-[15px] text-text-muted">
                    Ultimo, New South Wales, Australia
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display font-semibold text-[20px] mb-6">Gửi yêu cầu</h2>
              <p className="text-text-muted text-[15px] mb-6">
                Dù bạn là nhà đầu tư, đối tác logistics hay ứng viên tài năng, hãy liên hệ
                trực tiếp qua email — chúng tôi phản hồi trong vòng 24 giờ.
              </p>
              <a
                href="mailto:contact@fadogroup.com.au"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-full text-[14.5px] hover:-translate-y-0.5 transition-all duration-200"
              >
                Gửi email ngay
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
