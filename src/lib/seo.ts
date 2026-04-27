import { useEffect } from 'react'
import type { Lang, LocalizedText } from '../content/types'
import { pick } from './i18n'

function upsertMeta(nameOrProperty: string, value: string, kind: 'name' | 'property') {
  const selector = kind === 'name' ? `meta[name="${nameOrProperty}"]` : `meta[property="${nameOrProperty}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(kind, nameOrProperty)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`
  let el = document.head.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function localizedPath(canonicalPath: string, nextLang: Lang) {
  return canonicalPath.replace(/^\/(en|de|zh-Hant)(\/|$)/, `/${nextLang}$2`)
}

export function useSeo(opts: {
  lang: Lang
  title: LocalizedText
  description: LocalizedText
  canonicalPath: string
}) {
  const resolvedTitle = pick(opts.lang, opts.title)
  const resolvedDescription = pick(opts.lang, opts.description)

  useEffect(() => {
    document.title = resolvedTitle

    upsertMeta('description', resolvedDescription, 'name')
    upsertMeta('og:title', resolvedTitle, 'property')
    upsertMeta('og:description', resolvedDescription, 'property')
    upsertMeta('og:type', 'website', 'property')

    upsertMeta('twitter:card', 'summary_large_image', 'name')
    upsertMeta('twitter:title', resolvedTitle, 'name')
    upsertMeta('twitter:description', resolvedDescription, 'name')

    const origin = window.location.origin
    upsertLink('canonical', origin + opts.canonicalPath)

    const ensureHreflang = (hreflang: string, href: string) => {
      const selector = `link[rel="alternate"][hreflang="${hreflang}"]`
      let el = document.head.querySelector(selector) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'alternate')
        el.setAttribute('hreflang', hreflang)
        document.head.appendChild(el)
      }
      el.setAttribute('href', origin + href)
    }

    ensureHreflang('en', localizedPath(opts.canonicalPath, 'en'))
    ensureHreflang('de', localizedPath(opts.canonicalPath, 'de'))
    ensureHreflang('zh-Hant', localizedPath(opts.canonicalPath, 'zh-Hant'))
    ensureHreflang('x-default', localizedPath(opts.canonicalPath, 'en'))
  }, [opts.canonicalPath, resolvedDescription, resolvedTitle, opts.lang])
}
