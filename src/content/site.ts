import siteData from './data/site.json'
import type { NavigationItem } from './types'
import type { BrandContent, DuoContent } from './schema'

const data = siteData as {
  brand: BrandContent
  duo: DuoContent
}

export const siteBrand: BrandContent = data.brand

export const siteNavigation: NavigationItem[] = [
  { id: 'home', href: (lang) => `/${lang}`, label: { en: 'Home', de: 'Start', 'zh-Hant': '首頁' } },
  { id: 'duo', href: (lang) => `/${lang}/duo`, label: { en: 'Duo', de: 'Duo', 'zh-Hant': '二重奏' } },
  { id: 'artists', href: (lang) => `/${lang}/artists`, label: { en: 'Artists', de: 'Künstler', 'zh-Hant': '藝術家' } },
  { id: 'season', href: (lang) => `/${lang}/season`, label: { en: 'Season', de: 'Saison', 'zh-Hant': '樂季' } },
  { id: 'media', href: (lang) => `/${lang}/media`, label: { en: 'Media', de: 'Medien', 'zh-Hant': '媒體' } },
  { id: 'contact', href: (lang) => `/${lang}/contact`, label: { en: 'Contact', de: 'Kontakt', 'zh-Hant': '聯絡' } }
]

export const duoContent: DuoContent = data.duo
