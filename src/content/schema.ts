import type { ArtistId, LocalizedText, NavigationItem } from './types'

export type LocalizedArray = { en: string[]; de: string[]; 'zh-Hant': string[] }

export type ArtistSection = {
  id: string
  heading: LocalizedText
  paragraphs: LocalizedArray
}

export type ArtistContentEntry = {
  id: ArtistId
  slug: 'yi-liu' | 'kelvin-tsui'
  role: LocalizedText
  name: string
  displayName: LocalizedText
  intro: LocalizedText
  previewLabel: LocalizedText
  portraitSrc: string
  portraitAlt: LocalizedText
  sections: ArtistSection[]
}

export type BrandContent = {
  name: string
  subtitle: LocalizedText
  shortIntro: LocalizedText
  portraitAlt: LocalizedText
  base: LocalizedText
}

export type DuoContent = {
  meaningTitle: LocalizedText
  meaningBody: LocalizedText
  founded: string
  geographies: LocalizedArray
  longIntro: LocalizedArray
  mission: LocalizedText
  formats: LocalizedArray
}

export type SeasonHighlight = {
  id: string
  monthLabel: LocalizedText
  title: LocalizedText
  location: LocalizedText
  descriptor: LocalizedText
  kind: LocalizedText
  dateISO: string
}

export type SeasonContent = {
  intro: LocalizedText
  highlights: SeasonHighlight[]
}

export type MediaItem = {
  id: string
  kind: 'image' | 'video'
  title: LocalizedText
  caption: LocalizedText
  thumbnailSrc: string
  imageAlt: LocalizedText
  videoUrl?: string
}

export type MediaVideoEmbed = {
  id: string
  embedUrl: string
  title: LocalizedText
}

export type MediaContent = {
  intro: LocalizedText
  photosHeading?: LocalizedText
  videosHeading?: LocalizedText
  videosIntro?: LocalizedText
  creditsNote?: LocalizedText
  items: MediaItem[]
  videos: MediaVideoEmbed[]
}

export type ContactContent = {
  heading: LocalizedText
  intro: LocalizedText
  invitation: LocalizedText
  email: string
  instagram: string
  instagramUrl?: string
}

export type LegalContent = {
  imprint: LocalizedText
  privacy: LocalizedText
  imprintBody: LocalizedText
  privacyBody: LocalizedText
  footerLine: LocalizedText
}

export type SeoContent = {
  home: { title: LocalizedText; description: LocalizedText }
  duo: { title: LocalizedText; description: LocalizedText }
  artists: { title: LocalizedText; description: LocalizedText }
  season: { title: LocalizedText; description: LocalizedText }
  media: { title: LocalizedText; description: LocalizedText }
  contact: { title: LocalizedText; description: LocalizedText }
}

export type SiteContent = {
  brand: BrandContent
  nav: NavigationItem[]
  duo: DuoContent
  artists: ArtistContentEntry[]
  season: SeasonContent
  media: MediaContent
  contact: ContactContent
  legal: LegalContent
  seo: SeoContent
}
