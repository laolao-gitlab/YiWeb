export type Lang = 'en' | 'de' | 'zh-Hant'

export type Localized<T> = {
  en: T
  de: T
  'zh-Hant': T
}

export type LocalizedText = Localized<string>

export type NavigationItem = {
  id: 'home' | 'duo' | 'artists' | 'repertoire' | 'season' | 'media' | 'contact'
  href: (lang: Lang) => string
  label: LocalizedText
}

export type ArtistId = 'liu-yi' | 'kelvin-tsui'
