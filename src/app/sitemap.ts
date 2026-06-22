import type { MetadataRoute } from 'next'
import { brands } from '@/data/brands'

const BASE = 'https://fadogroup.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const brandPages = brands.map((b) => ({
    url: `${BASE}/thuong-hieu/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/ve-chung-toi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tuyen-dung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...brandPages,
  ]
}
