import { Link, useLocation } from 'react-router-dom'
import type { Lang } from '../content/types'

const languages: Array<{ id: Lang; label: string }> = [
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
  { id: 'zh-Hant', label: '繁中' }
]

function toLangPath(pathname: string, nextLang: Lang) {
  const nextPath = pathname.replace(/^\/(en|de|zh-Hant)(\/|$)/, `/${nextLang}$2`)
  return nextPath === pathname ? `/${nextLang}` : nextPath
}

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const location = useLocation()

  return (
    <div aria-label="Language" className="languageSwitcher">
      {languages.map((language) => {
        const active = language.id === lang
        return (
          <Link
            key={language.id}
            to={toLangPath(location.pathname, language.id)}
            aria-current={active ? 'page' : undefined}
            className={active ? 'languagePill is-active' : 'languagePill'}
            onClick={() => window.localStorage.setItem('gemelli-lang', language.id)}
          >
            {language.label}
          </Link>
        )
      })}
    </div>
  )
}
