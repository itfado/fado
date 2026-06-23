import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/ve-chung-toi': {
      vi: '/ve-chung-toi',
      en: '/about',
    },
    '/lien-he': {
      vi: '/lien-he',
      en: '/contact',
    },
    '/tuyen-dung': {
      vi: '/tuyen-dung',
      en: '/careers',
    },
    '/thuong-hieu/[slug]': {
      vi: '/thuong-hieu/[slug]',
      en: '/brands/[slug]',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
