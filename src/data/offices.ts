export type Office = {
  flag: string
  label: string
}

export type OfficeGroup = {
  title: string
  offices: Office[]
}

export const officeGroups: OfficeGroup[] = [
  {
    title: 'Trụ sở & Việt Nam',
    offices: [
      { flag: '🇦🇺', label: 'Trụ sở chính — Ultimo, New South Wales, Australia' },
      { flag: '🇻🇳', label: 'Chi nhánh Đà Nẵng' },
      { flag: '🇻🇳', label: 'Văn phòng TP. Hồ Chí Minh — 3 cơ sở' },
      { flag: '🇻🇳', label: 'Trung tâm phát triển phần mềm — Quang Trung Software City' },
      { flag: '🇻🇳', label: 'Chi nhánh Hà Nội' },
    ],
  },
  {
    title: 'Châu Á – Thái Bình Dương',
    offices: [
      { flag: '🇯🇵', label: 'Tokyo, Nhật Bản' },
      { flag: '🇰🇷', label: 'Seoul, Hàn Quốc' },
      { flag: '🇨🇳', label: 'Đông Hưng, Quảng Tây, Trung Quốc' },
      { flag: '🇰🇭', label: 'Phnom Penh, Campuchia' },
      { flag: '🇦🇺', label: 'Bankstown, Úc' },
    ],
  },
  {
    title: 'Châu Âu & Bắc Mỹ',
    offices: [
      { flag: '🇩🇪', label: 'Frankfurt, Đức' },
      { flag: '🇬🇧', label: 'Vương quốc Anh' },
      { flag: '🇺🇸', label: 'Portland, Oregon, Hoa Kỳ' },
      { flag: '🇺🇸', label: 'Houston, Texas, Hoa Kỳ' },
    ],
  },
]
