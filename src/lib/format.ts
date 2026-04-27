import type { Lang } from '../content/types'

export function formatDate(lang: Lang, dateISO: string) {
  const d = new Date(dateISO + 'T00:00:00')
  const locale = lang === 'de' ? 'de-DE' : lang === 'zh-Hant' ? 'zh-Hant' : 'en-GB'
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(d)
}
