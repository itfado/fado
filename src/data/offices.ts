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
    titleKey: 'group1Title',
    offices: [
      { flag: '🇦🇺', labelKey: 'hq_au' },
      { flag: '🇻🇳', labelKey: 'vn_dn' },
      { flag: '🇻🇳', labelKey: 'vn_hcm' },
      { flag: '🇻🇳', labelKey: 'vn_sw' },
      { flag: '🇻🇳', labelKey: 'vn_hn' },
    ],
  },
  {
    titleKey: 'group2Title',
    offices: [
      { flag: '🇯🇵', labelKey: 'jp_tk' },
      { flag: '🇰🇷', labelKey: 'kr_sl' },
      { flag: '🇨🇳', labelKey: 'cn_gx' },
      { flag: '🇰🇭', labelKey: 'kh_pp' },
      { flag: '🇦🇺', labelKey: 'au_bk' },
    ],
  },
  {
    titleKey: 'group3Title',
    offices: [
      { flag: '🇩🇪', labelKey: 'de_ff' },
      { flag: '🇬🇧', labelKey: 'gb' },
      { flag: '🇺🇸', labelKey: 'us_or' },
      { flag: '🇺🇸', labelKey: 'us_tx' },
    ],
  },
]
