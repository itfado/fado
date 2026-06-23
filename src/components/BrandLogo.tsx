'use client'

import { useState } from 'react'

/* Hiện logo /brands/<slug>.svg nếu có; chưa có thì fallback về tên thương hiệu.
   Khi bạn thả file logo vào public/brands/, card tự nâng cấp — không cần đổi code. */
export default function BrandLogo({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="font-ui font-semibold text-[14.5px] text-text group-hover:text-text transition-colors">
        {name}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brands/${slug}.svg`}
      alt={name}
      onError={() => setFailed(true)}
      className="h-7 w-auto max-w-[140px] object-contain object-left"
      loading="lazy"
    />
  )
}
