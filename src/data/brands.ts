export type Brand = {
  slug: string
  name: string
  segment: 1 | 2 | 3 | 4 | 5
  description: string
  url: string
}

export type Segment = {
  index: string
  title: string
  summary: string
}

export const segments: Segment[] = [
  {
    index: '01',
    title: 'Logistics & Thương mại xuyên biên giới',
    summary: 'Lõi vận hành của FADO Group — mua hộ, vận chuyển, hải quan và giao nhận quốc tế.',
  },
  {
    index: '02',
    title: 'Công nghệ Logistics',
    summary: 'Hạ tầng phần mềm đứng sau toàn bộ hệ sinh thái vận hành.',
  },
  {
    index: '03',
    title: 'Thương mại & Xuất khẩu',
    summary: 'Đưa giá trị Việt Nam ra thị trường thế giới.',
  },
  {
    index: '04',
    title: 'Bán lẻ Gia đình — Úc',
    summary: 'Sản phẩm và dịch vụ cho gia đình trẻ tại thị trường Úc.',
  },
  {
    index: '05',
    title: 'Hàng hải & Ngoài trời — Úc',
    summary: 'Hơn một thế kỷ phục vụ cộng đồng đam mê biển và câu cá tại Úc.',
  },
]

export const brands: Brand[] = [
  {
    slug: 'fado-vn',
    name: 'FADO.VN',
    segment: 1,
    url: 'https://fado.vn',
    description: 'Nền tảng mua hàng quốc tế từ Mỹ, Nhật, Đức, Anh cho người tiêu dùng Việt Nam',
  },
  {
    slug: 'fado-express',
    name: 'FADO Express',
    segment: 1,
    url: '#',
    description: 'Chuyển phát nhanh hai chiều Việt Nam – Quốc tế',
  },
  {
    slug: 'proship',
    name: 'Proship',
    segment: 1,
    url: 'https://proship.vn',
    description: 'Vận tải đa phương thức: container, đường bộ, đường biển, hải quan, kho bãi',
  },
  {
    slug: 'ratraco-solutions',
    name: 'Ratraco Solutions',
    segment: 1,
    url: 'https://ratracosolutions.com',
    description: 'Liên doanh logistics đường sắt liên vận quốc tế Việt Nam – Trung Quốc – Nga – EU',
  },
  {
    slug: 'fado-solutions',
    name: 'FADO Solutions',
    segment: 1,
    url: 'https://fadosolutions.com',
    description:
      'Giải pháp logistics trọn gói: đường biển, hàng không, đường bộ, IOR, môi giới hải quan',
  },
  {
    slug: 'woka',
    name: 'Woka',
    segment: 2,
    url: 'https://woka.io',
    description:
      'Bộ phần mềm logistics tích hợp AI cho đường bộ, đường sắt, last-mile, forwarding & fulfilment',
  },
  {
    slug: 'fado-agri',
    name: 'FADO Agri',
    segment: 3,
    url: 'https://fadoagri.com',
    description: 'Xuất khẩu nông sản Việt Nam ra thị trường quốc tế',
  },
  {
    slug: 'goprint',
    name: 'GoPrint',
    segment: 3,
    url: 'https://goprint.vn',
    description: 'Giải pháp in ấn & bao bì cho doanh nghiệp',
  },
  {
    slug: 'fanaro-solutions',
    name: 'Fanaro Solutions',
    segment: 3,
    url: '#',
    description: 'Giải pháp thương mại & dịch vụ hỗ trợ doanh nghiệp',
  },
  {
    slug: 'baby-train',
    name: 'Baby Train',
    segment: 4,
    url: 'https://www.babytrain.com.au',
    description: 'Xe đẩy, ghế ô tô & đồ sơ sinh hàng đầu tại Melbourne',
  },
  {
    slug: 'star-kidz',
    name: 'Star Kidz',
    segment: 4,
    url: 'https://www.starkidz.com.au',
    description: 'Thương hiệu nội thất & đồ dùng em bé',
  },
  {
    slug: 'nanny-annie',
    name: 'Nanny Annie',
    segment: 4,
    url: 'https://www.nanny-annie.com',
    description: 'Nền tảng bán lẻ trực tuyến đồ sơ sinh trên toàn nước Úc',
  },
  {
    slug: 'ch-smith-marine',
    name: 'C.H. Smith Marine',
    segment: 5,
    url: 'https://chsmith.com.au',
    description: 'Từ 1884 — thiết bị hàng hải, điện tử tàu thuyền & đồ câu cá tại Melbourne',
  },
  {
    slug: 'kayaks2fish',
    name: 'Kayaks2Fish',
    segment: 5,
    url: 'https://www.kayaks2fish.com',
    description: 'Kayak câu cá & phụ kiện trên toàn nước Úc',
  },
]
