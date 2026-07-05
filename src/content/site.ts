import siteData from './data/site.json'
import type { NavigationItem } from './types'
import type { BrandContent, DuoContent, SiteContent, SiteJsonContent } from './schema'

const data = siteData as SiteJsonContent

function hrefForNavItem(id: NavigationItem['id']): NavigationItem['href'] {
  switch (id) {
    case 'home':
      return (lang) => `/${lang}`
    case 'duo':
      return (lang) => `/${lang}/duo`
    case 'artists':
      return (lang) => `/${lang}/artists`
    case 'season':
      return (lang) => `/${lang}/season`
    case 'media':
      return (lang) => `/${lang}/media`
    case 'contact':
      return (lang) => `/${lang}/contact`
  }
}

export const siteNavigation: NavigationItem[] = data.nav.map((item) => ({
  ...item,
  href: hrefForNavItem(item.id)
}))

export const siteContent: SiteContent = {
  ...data,
  nav: siteNavigation
}

export const siteBrand: BrandContent = siteContent.brand
export const duoContent: DuoContent = siteContent.duo
