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
  const homeCopy = ELINA_COPY.pages.home

  return (
    <main className="page pageHome">
      <section className="section sectionHero">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="kicker">{ELINA_COPY.brand.subtitle[lang]}</div>
            <h1 className="heroTitle">{ELINA_COPY.brand.name}</h1>
            <p className="heroLead">{ELINA_COPY.brand.shortIntro[lang]}</p>

            <div className="heroActions">
              <Link className="btn btn-primary" to={`/${lang}/duo`}>{homeCopy.discoverDuoLabel[lang]}</Link>
              <Link className="btn" to={`/${lang}/season`}>{homeCopy.seasonLabel[lang]}</Link>
              <Link className="btn btn-ghost" to={`/${lang}/contact`}>{homeCopy.contactLabel[lang]}</Link>
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
            <div className="kicker">{homeCopy.seasonKicker[lang]}</div>
            <h2>{homeCopy.featuredHeading[lang]}</h2>
          </div>
          <Link className="btn" to={`/${lang}/season`}>{homeCopy.fullSeasonLabel[lang]}</Link>
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
          <div className="kicker">{homeCopy.biographiesLabel[lang]}</div>
          <h2>{homeCopy.artistProfilesHeading[lang]}</h2>
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
          <Link className="btn btn-primary" to={`/${lang}/artists`}>{homeCopy.biographiesLabel[lang]}</Link>
          <Link className="btn btn-ghost" to={`/${lang}/media`}>{homeCopy.mediaLabel[lang]}</Link>
        </div>
      </section>
    </main>
  )
}
