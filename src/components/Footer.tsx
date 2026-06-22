import Logo from './Logo'

const currentYear = new Date().getFullYear()

const cols = [
  {
    title: 'Về chúng tôi',
    links: [
      { label: 'Tổng quan công ty', href: '#about' },
      { label: 'Lĩnh vực hoạt động', href: '#ecosystem' },
      { label: 'Văn phòng & chi nhánh', href: '#global' },
    ],
  },
  {
    title: 'Quan hệ nhà đầu tư',
    links: [
      { label: 'Hồ sơ doanh nghiệp', href: '#contact' },
      { label: 'Chính sách đầu tư', href: '#contact' },
    ],
  },
  {
    title: 'Gia nhập',
    links: [
      { label: 'Tuyển dụng FADO', href: '/tuyen-dung' },
      { label: 'Tuyển dụng toàn cầu', href: '/tuyen-dung' },
    ],
  },
  {
    title: 'Liên hệ',
    links: [
      { label: 'contact@fadogroup.com.au', href: 'mailto:contact@fadogroup.com.au' },
      { label: 'fadogroup.com.au', href: 'https://fadogroup.com.au' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line" style={{ padding: '72px 24px 32px' }}>
      <div className="max-w-container mx-auto flex justify-between gap-12 flex-wrap mb-12">
        {/* Brand */}
        <div>
          <Logo size={18} onDark />
          <p className="text-text-muted text-[14px] mt-2.5 max-w-[240px]">
            Hệ sinh thái thương mại & logistics xuyên biên giới.
          </p>
        </div>

        {/* Columns */}
        <div className="flex gap-12 flex-wrap">
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 min-w-[140px]">
              <h5 className="text-[12.5px] tracking-[0.08em] uppercase text-text-faint font-semibold mb-1">
                {col.title}
              </h5>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-text-muted hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-container mx-auto pt-6 border-t border-line flex justify-between flex-wrap gap-3 text-[12.5px] text-text-faint">
        <span>© {currentYear} FADO GROUP. ALL RIGHTS RESERVED.</span>
        <span>
          <a href="/chinh-sach-bao-mat" className="hover:text-text-muted transition-colors">
            Chính sách bảo mật
          </a>
          {' · '}
          <a href="/dieu-khoan" className="hover:text-text-muted transition-colors">
            Điều khoản sử dụng
          </a>
        </span>
      </div>
    </footer>
  )
}
