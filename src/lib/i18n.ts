import type { Lang, Localized } from '../content/types'

export function pick<T>(lang: Lang, value: Localized<T>): T {
  return value[lang]
}

export function otherLang(lang: Lang): Lang {
  if (lang === 'en') return 'de'
  if (lang === 'de') return 'zh-Hant'
  return 'en'
}
