import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import type { Lang } from '../content/types'
import { HomePage } from '../pages/HomePage'
import { DuoPage } from '../pages/ProfilePage'
import { ArtistsPage } from '../pages/ArtistsPage'
import { ArtistBiographyPage } from '../pages/ArtistBiographyPage'
import { SeasonPage } from '../pages/EventsPage'
import { MediaPage } from '../pages/MediaPage'
import { ContactPage } from '../pages/ContactPage'

function browserPreferredLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('gemelli-lang')
  if (saved === 'en' || saved === 'de' || saved === 'zh-Hant') return saved
  const raw = window.navigator.language.toLowerCase()
  if (raw.startsWith('de')) return 'de'
  if (raw.includes('zh') || raw.includes('hant') || raw.includes('hk') || raw.includes('tw')) return 'zh-Hant'
  return 'en'
}

function LangOutlet({ lang }: { lang: Lang }) {
  return (
    <AppLayout lang={lang}>
      <Routes>
        <Route index element={<HomePage lang={lang} />} />
        <Route path="duo" element={<DuoPage lang={lang} />} />
        <Route path="artists" element={<ArtistsPage lang={lang} />} />
        <Route path="artists/yi-liu" element={<ArtistBiographyPage lang={lang} artistId="liu-yi" />} />
        <Route path="artists/kelvin-tsui" element={<ArtistBiographyPage lang={lang} artistId="kelvin-tsui" />} />
        <Route path="season" element={<SeasonPage lang={lang} />} />
        <Route path="media" element={<MediaPage lang={lang} />} />
        <Route path="contact" element={<ContactPage lang={lang} />} />
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>
    </AppLayout>
  )
}

function AdminRedirect() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/admin/')
    }
  }, [])

  return null
}

export default function AppRouter() {
  const preferred = browserPreferredLang()
  return (
    <Routes>
      <Route path="/admin" element={<AdminRedirect />} />
      <Route path="/admin/*" element={<AdminRedirect />} />
      <Route path="/" element={<Navigate to={`/${preferred}`} replace />} />
      <Route path="/season" element={<Navigate to={`/${preferred}/season`} replace />} />
      <Route path="/media" element={<Navigate to={`/${preferred}/media`} replace />} />
      <Route path="/en/*" element={<LangOutlet lang="en" />} />
      <Route path="/de/*" element={<LangOutlet lang="de" />} />
      <Route path="/zh-Hant/*" element={<LangOutlet lang="zh-Hant" />} />
      <Route path="*" element={<Navigate to={`/${preferred}`} replace />} />
    </Routes>
  )
}
