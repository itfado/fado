export type Office = {
  flag: string
  labelKey: string
}

export type OfficeGroup = {
  titleKey: string
  offices: Office[]
}

export const officeGroups: OfficeGroup[] = [
  {
    titleKey: 'group1Title', // Úc
    offices: [
      { flag: '🇦🇺', labelKey: 'hq_au' },
      { flag: '🇦🇺', labelKey: 'au_bk' },
    ],
  },
  {
    titleKey: 'group2Title', // Việt Nam
    offices: [
      { flag: '🇻🇳', labelKey: 'vn_hcm' },
      { flag: '🇻🇳', labelKey: 'vn_hn' },
      { flag: '🇻🇳', labelKey: 'vn_dn' },
      { flag: '🇻🇳', labelKey: 'vn_sw' },
    ],
  },
  {
    titleKey: 'group3Title', // Quốc tế (Mỹ trước)
    offices: [
      { flag: '🇺🇸', labelKey: 'us_or' },
      { flag: '🇺🇸', labelKey: 'us_tx' },
      { flag: '🇯🇵', labelKey: 'jp_tk' },
      { flag: '🇰🇷', labelKey: 'kr_sl' },
      { flag: '🇨🇳', labelKey: 'cn_gx' },
      { flag: '🇰🇭', labelKey: 'kh_pp' },
      { flag: '🇩🇪', labelKey: 'de_ff' },
      { flag: '🇬🇧', labelKey: 'gb' },
    ],
  },
]
