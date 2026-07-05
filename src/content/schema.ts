import type { ArtistId, LocalizedText, NavigationItem } from './types'

export type LocalizedArray = { en: string[]; de: string[]; 'zh-Hant': string[] }

export type NavigationContentItem = {
  id: NavigationItem['id']
  label: LocalizedText
}

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
  photosHeading: LocalizedText
  videosHeading: LocalizedText
  videosIntro: LocalizedText
  creditsNote: LocalizedText
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
  directContacts: DirectContactContent[]
}

export type DirectContactContent = {
  id: string
  name: LocalizedText
  role: LocalizedText
  phone: string
  phoneHref: string
  whatsappHref: string
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

export type PageLabelContent = {
  header: {
    menuLabel: LocalizedText
    primaryNavAria: LocalizedText
  }
  home: {
    discoverDuoLabel: LocalizedText
    seasonLabel: LocalizedText
    contactLabel: LocalizedText
    seasonKicker: LocalizedText
    featuredHeading: LocalizedText
    fullSeasonLabel: LocalizedText
    biographiesLabel: LocalizedText
    artistProfilesHeading: LocalizedText
    mediaLabel: LocalizedText
  }
  duo: {
    kicker: LocalizedText
    foundedPrefix: LocalizedText
    footprintLabel: LocalizedText
    formatsLabel: LocalizedText
    artistsLabel: LocalizedText
  }
  artists: {
    pageKicker: LocalizedText
    pageTitle: LocalizedText
    pageIntro: LocalizedText
  }
  artist: {
    overviewLabel: LocalizedText
    contactLabel: LocalizedText
    dossierLabel: LocalizedText
  }
  season: {
    pageKicker: LocalizedText
    pageTitle: LocalizedText
  }
  media: {
    pageKicker: LocalizedText
    pageTitle: LocalizedText
    imagesKicker: LocalizedText
    imageKind: LocalizedText
    videoKind: LocalizedText
  }
  contact: {
    pageKicker: LocalizedText
    generalLabel: LocalizedText
    emailButtonLabel: LocalizedText
    phoneButtonLabel: LocalizedText
    whatsappLabel: LocalizedText
    socialLabel: LocalizedText
    directContactLabel: LocalizedText
  }
  footer: {
    inquiriesLabel: LocalizedText
    contactLabel: LocalizedText
  }
  legalModal: {
    legalLabel: LocalizedText
    closeLabel: LocalizedText
  }
}

export type SiteContent = {
  brand: BrandContent
  nav: NavigationItem[]
  pages: PageLabelContent
  duo: DuoContent
  artists: ArtistContentEntry[]
  season: SeasonContent
  media: MediaContent
  contact: ContactContent
  legal: LegalContent
  seo: SeoContent
}

export type SiteJsonContent = Omit<SiteContent, 'nav'> & {
  nav: NavigationContentItem[]
}
