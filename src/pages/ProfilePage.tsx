import { Link } from 'react-router-dom'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function DuoPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.duo.title,
    description: ELINA_COPY.seo.duo.description,
    canonicalPath: `/${lang}/duo`
  })

  const foundedLabel = lang === 'de' ? `Gegründet ${ELINA_COPY.duo.founded}` : lang === 'zh-Hant' ? `創立於 ${ELINA_COPY.duo.founded}` : `Founded ${ELINA_COPY.duo.founded}`
  const footprintLabel = lang === 'de' ? 'Konzertorte' : lang === 'zh-Hant' ? '演出足跡' : 'Concert footprint'
  const formatsLabel = lang === 'de' ? 'Aufführungsformate' : lang === 'zh-Hant' ? '演出形式' : 'Performance formats'
  const artistsLabel = lang === 'de' ? 'Künstler' : lang === 'zh-Hant' ? '藝術家' : 'Artists'

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{lang === 'zh-Hant' ? '二重奏' : 'Duo'}</div>
          <h2>{ELINA_COPY.brand.name}</h2>
          <p>{ELINA_COPY.duo.meaningBody[lang]}</p>
        </div>
        <div className="pillRow">
          <span className="pill">{foundedLabel}</span>
          <span className="pill">{ELINA_COPY.duo.mission[lang]}</span>
        </div>
      </section>

      <section className="section">
        <div className="grid-2 duoGrid">
          <div className="prosePanel prosePanel--plain">
            {ELINA_COPY.duo.longIntro[lang].map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <aside className="stackPanel">
            <div className="editorialCard">
              <div className="kicker">{footprintLabel}</div>
              <div className="pillCluster">
                {ELINA_COPY.duo.geographies[lang].map((place) => <span key={place} className="pill">{place}</span>)}
              </div>
            </div>

            <div className="editorialCard">
              <div className="kicker">{formatsLabel}</div>
              <ul className="refinedList">
                {ELINA_COPY.duo.formats[lang].map((format) => <li key={format}>{format}</li>)}
              </ul>
            </div>
          </aside>
        </div>

        <div className="homeLinkRow">
          <Link className="btn btn-primary" to={`/${lang}/artists`}>{artistsLabel}</Link>
          <Link className="btn" to={`/${lang}/repertoire`}>Repertoire</Link>
        </div>
      </section>
    </main>
  )
}
