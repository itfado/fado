type LogoProps = {
  /** Kích thước chữ "FADO" (px). */
  size?: number
  /** true: nền tối → chữ trắng (mặc định). false: nền sáng → chữ navy. */
  onDark?: boolean
  className?: string
}

/**
 * Wordmark FADO.
 * "FADO" — Montserrat 400 (mảnh), giãn chữ rộng (0.177em) là điểm nhận diện chính.
 * Là chữ thật render bằng font (không phải path), nên màu/cỡ/giãn chữ đều
 * chỉnh được trực tiếp và luôn sắc nét ở mọi kích thước.
 * (Chữ "GROUP" tạm bỏ — chỉ thêm lại khi có yêu cầu.)
 */
export default function Logo({ size = 18, onDark = true, className }: LogoProps) {
  // Mặc định bám token theme (trắng ở dark, đậm ở light). onDark={false} ép navy.
  const ink = onDark === false ? '#0a1f44' : 'var(--c-ink)'

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
        fontWeight: 400,
        fontSize: size,
        letterSpacing: '0.177em',
      }}
      aria-label="FADO"
      role="img"
    >
      FADO
    </span>
  )
}
