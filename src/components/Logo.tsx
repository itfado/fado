type LogoProps = {
  /** Kích thước chữ "FADO" (px). "GROUP" tự co theo tỉ lệ. */
  size?: number
  /** true: nền tối → chữ trắng (mặc định). false: nền sáng → chữ navy. */
  onDark?: boolean
  className?: string
}

/**
 * Wordmark FADO GROUP.
 * "FADO" — Montserrat 400 (mảnh), giãn chữ rộng (0.177em) là điểm nhận diện chính.
 * "GROUP" — Montserrat 600 (đậm), tương phản nét, đặt cạnh để tạo lockup.
 * Là chữ thật render bằng font (không phải path), nên màu/cỡ/giãn chữ đều
 * chỉnh được trực tiếp và luôn sắc nét ở mọi kích thước.
 */
export default function Logo({ size = 18, onDark = true, className }: LogoProps) {
  const ink = onDark ? '#ffffff' : '#0a1f44'

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-montserrat), sans-serif',
        color: ink,
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
      aria-label="FADO Group"
      role="img"
    >
      <span
        style={{
          fontWeight: 400,
          fontSize: size,
          letterSpacing: '0.177em',
        }}
      >
        FADO
      </span>
      <span
        style={{
          fontWeight: 600,
          fontSize: size,
          letterSpacing: '0.06em',
          marginLeft: '0.42em',
        }}
      >
        GROUP
      </span>
    </span>
  )
}
