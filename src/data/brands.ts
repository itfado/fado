export type Brand = {
  slug: string
  name: string
  segment: 1 | 2 | 3 | 4 | 5
  url: string
  country?: 'vn' | 'au'
}

export type Segment = {
  index: string // số thứ tự hiển thị (01..05) theo thứ tự mới
  key: 1 | 2 | 3 | 4 | 5 // nhóm gốc của brand (brand.segment) để lọc
  titleKey: string // khóa i18n tiêu đề (gốc)
  color: string
}

// Thứ tự mới: mảng kinh doanh Úc lên trước, rồi Logistics & TMĐT xuyên biên giới
export const segments: Segment[] = [
  { index: '01', key: 4, titleKey: '04', color: '#f59e0b' }, // Bán lẻ Gia đình — Úc
  { index: '02', key: 5, titleKey: '05', color: '#06b6d4' }, // Hàng hải & Ngoài trời — Úc
  { index: '03', key: 1, titleKey: '01', color: '#3b82f6' }, // Logistics & TMĐT xuyên biên giới
  { index: '04', key: 2, titleKey: '02', color: '#a855f7' }, // Công nghệ Logistics
  { index: '05', key: 3, titleKey: '03', color: '#10b981' }, // Nông nghiệp, Thương mại & B2B VN
]

export const brands: Brand[] = [
  { slug: 'fado-vn',           name: 'FADO.VN',           segment: 1, country: 'vn', url: 'https://fado.vn' },
  { slug: 'proship',           name: 'Proship',            segment: 1, country: 'vn', url: 'https://proship.vn' },
  { slug: 'ratraco-solutions', name: 'Ratraco Solutions',  segment: 1, country: 'vn', url: 'https://ratracosolutions.com' },
  { slug: 'fado-solutions',    name: 'FADO Solutions',     segment: 1, country: 'vn', url: 'https://fadosolution.com' },
  { slug: 'woka',              name: 'Woka',               segment: 2, country: 'vn', url: 'https://woka.io' },
  { slug: 'fado-agri',         name: 'FADO Agri',          segment: 3, country: 'vn', url: 'https://fadoagri.com' },
  { slug: 'goprint',           name: 'GoPrint',            segment: 3, country: 'vn', url: 'https://goprint.vn' },
  { slug: 'fanaro-solutions',  name: 'Fanaro Solutions',   segment: 3, country: 'vn', url: 'https://www.fanarosolutions.com' },
  { slug: 'baby-train',        name: 'Baby Train',         segment: 4, country: 'au', url: 'https://www.babytrain.com.au' },
  { slug: 'star-kidz',         name: 'Star Kidz',          segment: 4, country: 'au', url: 'https://www.starkidz.com.au' },
  { slug: 'nanny-annie',       name: 'Nanny Annie',        segment: 4, country: 'au', url: 'https://www.nanny-annie.com' },
  { slug: 'ch-smith-marine',   name: 'C.H. Smith Marine',  segment: 5, country: 'au', url: 'https://chsmith.com.au' },
  { slug: 'kayaks2fish',       name: 'Kayaks2Fish',        segment: 5, country: 'au', url: 'https://www.kayaks2fish.com' },
]
