import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function RepertoirePage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.repertoire.title,
    description: ELINA_COPY.seo.repertoire.description,
    canonicalPath: `/${lang}/repertoire`
  })

  const pageTitle = lang === 'de' ? 'Programmschwerpunkte' : lang === 'zh-Hant' ? '節目方向' : 'Program focus'

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{lang === 'zh-Hant' ? '曲目' : 'Repertoire'}</div>
          <h2>{pageTitle}</h2>
          <p>{ELINA_COPY.repertoire.intro[lang]}</p>
        </div>
      </section>

      <section className="section">
        <div className="cardsGrid cardsGrid--two repertoireGrid">
          {ELINA_COPY.repertoire.themes[lang].map((theme) => (
            <article key={theme} className="editorialCard editorialCard--compact">
              <p>{theme}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
