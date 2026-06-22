import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Tuyển dụng' }

export default function TuyenDung() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <div className="text-center max-w-[480px] mx-auto px-6">
          <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-text-faint mb-4">
            Đang cập nhật
          </p>
          <h1 className="font-display font-semibold text-[32px] mb-4">Tuyển dụng</h1>
          <p className="text-text-muted text-[15px]">
            Cơ hội nghề nghiệp tại FADO Group sẽ được cập nhật tại đây.
          </p>
          <a
            href="mailto:contact@fadogroup.com.au"
            className="inline-flex mt-8 bg-white text-black font-semibold px-6 py-3 rounded-full text-[14px] hover:-translate-y-0.5 transition-transform"
          >
            Gửi CV cho chúng tôi
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
