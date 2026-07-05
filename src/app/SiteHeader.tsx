import { Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ELINA_COPY } from '../content/elinaContent'
import type { Lang } from '../content/types'
import { LanguageSwitcher } from './LanguageSwitcher'

function navHref(lang: Lang, id: (typeof ELINA_COPY.nav)[number]['id']) {
  const nav = ELINA_COPY.nav.find((item) => item.id === id)
  return nav ? nav.href(lang) : `/${lang}`
}

function activeFromPathname(pathname: string) {
  const clean = pathname.replace(/\/+$/, '')
  if (clean === '/en' || clean === '/de' || clean === '/zh-Hant' || clean === '') return 'home'
  if (clean.includes('/artists/')) return 'artists'
  const last = clean.split('/').pop()
  if (last === 'duo') return 'duo'
  if (last === 'artists') return 'artists'
  if (last === 'season') return 'season'
  if (last === 'media') return 'media'
  if (last === 'contact') return 'contact'
  return 'home'
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeId = useMemo(() => activeFromPathname(location.pathname), [location.pathname])
  const menuLabel = lang === 'de' ? 'Menü öffnen' : lang === 'zh-Hant' ? '開啟選單' : 'Open menu'

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
      const next = Math.max(0, Math.min(1, window.scrollY / max))
      setProgress(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => setMobileMenuOpen(false))
  }, [location.pathname])

  return (
    <header className="siteHeader">
      <img src="/image/music1.png" alt="" aria-hidden="true" className="headerMotif headerMotif--right" />
      <img src="/image/music2.png" alt="" aria-hidden="true" className="headerMotif headerMotif--left" />

      <div className="siteHeaderInner">
        <div className="siteHeaderPrimary">
          <Link to={`/${lang}`} aria-label={ELINA_COPY.brand.name} className="brandLockup">
            <span className="brandWordmark">GEMELLI</span>
            <span className="brandSubline">IN HARMONIA</span>
          </Link>

          <nav aria-label="Primary" className="navLinksDesktop">
            {ELINA_COPY.nav.map((item) => {
              const active = item.id === activeId
              return (
                <Link
                  key={item.id}
                  to={navHref(lang, item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'navLink is-active' : 'navLink'}
                >
                  {item.label[lang]}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="siteHeaderSecondary">
          <LanguageSwitcher lang={lang} />
          <button
            type="button"
            className="mobileMenuButton"
            aria-label={menuLabel}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <span className="mobileMenuIcon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          {mobileMenuOpen ? (
            <div className="mobileMenu" role="navigation" aria-label="Primary">
              {ELINA_COPY.nav.map((item) => {
                const active = item.id === activeId
                return (
                  <Link
                    key={item.id}
                    to={navHref(lang, item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={active ? 'mobileMenuLink is-active' : 'mobileMenuLink'}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label[lang]}</span>
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div aria-hidden="true" className="headerProgressTrack">
        <div className="headerProgressBar" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </header>
  )
}
