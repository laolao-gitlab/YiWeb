import { Link } from 'react-router-dom'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function HomePage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.home.title,
    description: ELINA_COPY.seo.home.description,
    canonicalPath: `/${lang}/`
  })

  const season = ELINA_COPY.season.highlights
  const artists = ELINA_COPY.artists

  const discoverLabel = lang === 'de' ? 'Zum Duo' : lang === 'zh-Hant' ? '認識二重奏' : 'Discover the duo'
  const seasonLabel = lang === 'de' ? 'Saison ansehen' : lang === 'zh-Hant' ? '查看樂季' : 'View season'
  const contactLabel = lang === 'de' ? 'Kontakt' : lang === 'zh-Hant' ? '聯絡' : 'Contact'
  const featuredLabel = lang === 'de' ? 'Ausgewählte Höhepunkte' : lang === 'zh-Hant' ? '精選亮點' : 'Featured highlights'
  const fullSeasonLabel = lang === 'de' ? 'Alle Termine' : lang === 'zh-Hant' ? '完整樂季' : 'Full season'
  const seasonKicker = lang === 'de' ? 'Saison 2025' : lang === 'zh-Hant' ? '2025 樂季' : 'Season 2025'
  const biographiesLabel = lang === 'de' ? 'Künstlerbiografien' : lang === 'zh-Hant' ? '藝術家簡介' : 'Artist biographies'
  const mediaLabel = lang === 'de' ? 'Medien' : lang === 'zh-Hant' ? '媒體' : 'Media'

  return (
    <main className="page pageHome">
      <section className="section sectionHero">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="kicker">{ELINA_COPY.brand.subtitle[lang]}</div>
            <h1 className="heroTitle">{ELINA_COPY.brand.name}</h1>
            <p className="heroLead">{ELINA_COPY.brand.shortIntro[lang]}</p>

            <div className="heroActions">
              <Link className="btn btn-primary" to={`/${lang}/duo`}>{discoverLabel}</Link>
              <Link className="btn" to={`/${lang}/season`}>{seasonLabel}</Link>
              <Link className="btn btn-ghost" to={`/${lang}/contact`}>{contactLabel}</Link>
            </div>

            <div className="heroMetaRow">
              <span className="pill">{ELINA_COPY.brand.base[lang]}</span>
            </div>
          </div>

          <div className="heroFrame">
            <img src="/image/hero.png" alt={ELINA_COPY.brand.portraitAlt[lang]} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeadingRow">
          <div className="sectionHeadingBlock">
            <div className="kicker">{seasonKicker}</div>
            <h2>{featuredLabel}</h2>
          </div>
          <Link className="btn" to={`/${lang}/season`}>{fullSeasonLabel}</Link>
        </div>

        <div className="cardsGrid cardsGrid--three seasonGrid">
          {season.map((item) => (
            <article key={item.id} className="editorialCard editorialCard--season">
              <div className="kicker">{item.monthLabel[lang]}</div>
              <h3>{item.title[lang]}</h3>
              <p>{item.location[lang]} - {item.descriptor[lang]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{biographiesLabel}</div>
          <h2>{lang === 'de' ? 'Persönliche Künstlerprofile' : lang === 'zh-Hant' ? '藝術家個人檔案' : 'Individual artist profiles'}</h2>
        </div>

        <div className="cardsGrid cardsGrid--two artistPreviewList">
          {artists.map((artist) => (
            <article key={artist.id} className="editorialCard artistPreviewCard">
              <div className="kicker">{artist.role[lang]}</div>
              <h3 className="artistPreviewName">{artist.displayName[lang]}</h3>
              {lang === 'zh-Hant' ? <div className="artistRomanizedName">{artist.name}</div> : null}
              <p className="artistPreviewText">{artist.intro[lang]}</p>
              <Link className="btn btn-primary" to={`/${lang}/artists/${artist.slug}`}>
                {artist.previewLabel[lang]}
              </Link>
            </article>
          ))}
        </div>

        <div className="homeLinkRow">
          <Link className="btn btn-primary" to={`/${lang}/artists`}>{biographiesLabel}</Link>
          <Link className="btn btn-ghost" to={`/${lang}/media`}>{mediaLabel}</Link>
        </div>
      </section>
    </main>
  )
}
