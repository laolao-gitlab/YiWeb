import { Link } from 'react-router-dom'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function ArtistsPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.artists.title,
    description: ELINA_COPY.seo.artists.description,
    canonicalPath: `/${lang}/artists`
  })

  const pageKicker = lang === 'de' ? 'Künstler' : lang === 'zh-Hant' ? '藝術家' : 'Artists'
  const pageTitle = lang === 'de' ? 'Künstlerische Profile' : lang === 'zh-Hant' ? '藝術家檔案' : 'Artist profiles'
  const pageIntro =
    lang === 'de'
      ? 'Ausführliche Biografien von Yi Liu und Kelvin Tsui für Veranstalter, Institutionen und künstlerische Partner.'
      : lang === 'zh-Hant'
        ? '為主辦單位、機構與藝術合作夥伴整理的劉一與徐錦輝完整藝術家簡介。'
        : 'Extended biographies of Yi Liu and Kelvin Tsui for presenters, institutions, and artistic partners.'

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageKicker}</div>
          <h2>{pageTitle}</h2>
          <p>{pageIntro}</p>
        </div>
      </section>

      <section className="section">
        <div className="artistOverviewList">
          {ELINA_COPY.artists.map((artist) => (
            <article key={artist.id} className="artistPreviewGrid artistOverviewEntry">
              <div className="artistOverviewPortrait">
                <img src={artist.portraitSrc} alt={artist.portraitAlt[lang]} className="artistPortraitImage" />
              </div>
              <div className="artistOverviewBody">
                <div className="kicker">{artist.role[lang]}</div>
                <h3 className="artistPreviewName">{artist.displayName[lang]}</h3>
                {lang === 'zh-Hant' ? <div className="artistRomanizedName">{artist.name}</div> : null}
                <p className="artistPreviewText">{artist.intro[lang]}</p>

                <div className="artistOverviewExcerptList">
                  {artist.sections.slice(1, 3).map((section) => (
                    <div key={section.id} className="artistOverviewExcerpt">
                      <div className="kicker">{section.heading[lang]}</div>
                      <p>{section.paragraphs[lang][0]}</p>
                    </div>
                  ))}
                </div>

                <Link className="btn btn-primary" to={`/${lang}/artists/${artist.slug}`}>
                  {artist.previewLabel[lang]}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
