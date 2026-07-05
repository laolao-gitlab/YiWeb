import type { SiteContent } from './schema'
import { artistsContent } from './artists'
import { contactContent, legalContent } from './contact'
import { seasonContent } from './events'
import { mediaContent } from './media'
import { seoContent } from './seo'
import { siteBrand, siteNavigation, duoContent } from './site'

export type { SiteContent } from './schema'

export const ELINA_COPY: SiteContent = {
  brand: siteBrand,
  nav: siteNavigation,
  duo: duoContent,
  artists: artistsContent,
  season: seasonContent,
  media: mediaContent,
  contact: contactContent,
  legal: legalContent,
  seo: seoContent
}
