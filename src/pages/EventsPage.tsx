import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'
import { formatDate } from '../lib/format'

export function SeasonPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.season.title,
    description: ELINA_COPY.seo.season.description,
    canonicalPath: `/${lang}/season`
  })

  const pageTitle = lang === 'de' ? 'Saisonhöhepunkte' : lang === 'zh-Hant' ? '樂季重點' : 'Season highlights'

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{lang === 'de' ? 'Saison' : lang === 'zh-Hant' ? '樂季' : 'Season'}</div>
          <h2>{pageTitle}</h2>
          <p>{ELINA_COPY.season.intro[lang]}</p>
        </div>
      </section>

      <section className="section">
        <div className="seasonList">
          {ELINA_COPY.season.highlights.map((item) => (
            <article key={item.id} className="editorialCard seasonEntry">
              <div className="seasonEntryHeader">
                <div>
                  <div className="kicker">{item.kind[lang]}</div>
                  <h3>{item.title[lang]}</h3>
                </div>
                <div className="seasonEntryMeta">
                  <div className="kicker">{item.monthLabel[lang]}</div>
                  <div className="seasonEntryDate">{formatDate(lang, item.dateISO)}</div>
                </div>
              </div>
              <p>{item.location[lang]} - {item.descriptor[lang]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
