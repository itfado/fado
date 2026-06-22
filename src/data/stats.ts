export type Stat = {
  value: number
  suffix: string
  labelKey: 'brands' | 'countries' | 'continents' | 'years'
}

export const stats: Stat[] = [
  { value: 14, suffix: '+', labelKey: 'brands' },
  { value: 9,  suffix: '',  labelKey: 'countries' },
  { value: 4,  suffix: '',  labelKey: 'continents' },
  { value: 15, suffix: '+', labelKey: 'years' },
]
