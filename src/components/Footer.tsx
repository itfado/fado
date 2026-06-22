import { getTranslations } from 'next-intl/server'
import Logo from './Logo'

export default async function Footer() {
  const t = await getTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line" style={{ padding: '72px 24px 32px' }}>
      <div className="max-w-container mx-auto mb-12">
        {/* Brand — full width on mobile */}
        <div className="mb-10">
          <Logo size={18} onDark />
          <p className="text-text-muted text-[14px] mt-2.5 max-w-[260px]">{t('tagline')}</p>
        </div>

        {/* Columns — 2×2 on mobile, 4 across on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          <div className="flex flex-col gap-3">
            <h5 className="text-[11.5px] tracking-[0.08em] uppercase text-text-faint font-semibold mb-1">
              {t('col1Title')}
            </h5>
            <a href="#about" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col1Link1')}</a>
            <a href="#ecosystem" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col1Link2')}</a>
            <a href="#global" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col1Link3')}</a>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-[11.5px] tracking-[0.08em] uppercase text-text-faint font-semibold mb-1">
              {t('col2Title')}
            </h5>
            <a href="#contact" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col2Link1')}</a>
            <a href="#contact" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col2Link2')}</a>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-[11.5px] tracking-[0.08em] uppercase text-text-faint font-semibold mb-1">
              {t('col3Title')}
            </h5>
            <a href="/tuyen-dung" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col3Link1')}</a>
            <a href="/tuyen-dung" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">{t('col3Link2')}</a>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-[11.5px] tracking-[0.08em] uppercase text-text-faint font-semibold mb-1">
              {t('col4Title')}
            </h5>
            <a href="mailto:contact@fadogroup.com.au" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200 break-all">contact@fadogroup.com.au</a>
            <a href="https://fadogroup.com.au" className="text-[14px] text-text-muted hover:text-white transition-colors duration-200">fadogroup.com.au</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-container mx-auto pt-6 border-t border-line flex justify-between flex-wrap gap-3 text-[12.5px] text-text-faint">
        <span>{t('copyright', { year })}</span>
        <span>
          <a href="/chinh-sach-bao-mat" className="hover:text-text-muted transition-colors">{t('privacyPolicy')}</a>
          {' · '}
          <a href="/dieu-khoan" className="hover:text-text-muted transition-colors">{t('terms')}</a>
        </span>
      </div>
    </footer>
  )
}
