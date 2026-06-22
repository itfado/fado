import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Về chúng tôi' }

export default function VeChungToi() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '80px' }}>
        <div className="text-center max-w-[480px] mx-auto px-6">
          <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-text-faint mb-4">
            Đang cập nhật
          </p>
          <h1 className="font-display font-semibold text-[32px] mb-4">Về chúng tôi</h1>
          <p className="text-text-muted text-[15px]">
            Trang này đang được xây dựng. Vui lòng quay lại sớm.
          </p>
          <a
            href="/"
            className="inline-flex mt-8 text-[14px] text-text-muted hover:text-white transition-colors underline underline-offset-4"
          >
            ← Quay về trang chủ
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
