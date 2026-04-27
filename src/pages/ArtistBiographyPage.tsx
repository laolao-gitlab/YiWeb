import { Link } from 'react-router-dom'
import type { ArtistId, Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function ArtistBiographyPage({
  lang,
  artistId
}: {
  lang: Lang
  artistId: ArtistId
}) {
  const artist = ELINA_COPY.artists.find((entry) => entry.id === artistId) ?? null
  const resolvedArtist = artist ?? ELINA_COPY.artists[0]

  useSeo({
    lang,
    title: {
      en: `${resolvedArtist.name} | Gemelli in Harmonia`,
      de: `${resolvedArtist.name} | Gemelli in Harmonia`,
      'zh-Hant': `${resolvedArtist.displayName['zh-Hant']} | Gemelli in Harmonia`
    },
    description: {
      en: resolvedArtist.intro.en,
      de: resolvedArtist.intro.de,
      'zh-Hant': resolvedArtist.intro['zh-Hant']
    },
    canonicalPath: `/${lang}/artists/${resolvedArtist.slug}`
  })

  if (!artist) return null

  const overviewLabel = lang === 'de' ? 'Künstlerübersicht' : lang === 'zh-Hant' ? '藝術家總覽' : 'Artists overview'
  const contactLabel = lang === 'de' ? 'Kontakt aufnehmen' : lang === 'zh-Hant' ? '聯絡邀約' : 'Make contact'
  const dossierLabel = lang === 'de' ? 'Künstlerdossier' : lang === 'zh-Hant' ? '藝術家檔案' : 'Artist dossier'

  return (
    <main className="page artistPage">
      <section className="section">
        <div className="kicker">{dossierLabel}</div>
        <div className="artistDossierGrid artistDossierHero">
          <div className="artistPortraitPanel">
            <img src={artist.portraitSrc} alt={artist.portraitAlt[lang]} className="artistPortraitImage" />
          </div>

          <div className="artistIntroPanel">
            <div className="kicker">{artist.role[lang]}</div>
            <h1 className="artistHeroName">{artist.displayName[lang]}</h1>
            {lang === 'zh-Hant' ? <div className="artistRomanizedName">{artist.name}</div> : null}
            <p className="artistHeroLead">{artist.intro[lang]}</p>

            <div className="heroActions">
              <Link className="btn btn-primary" to={`/${lang}/contact`}>
                {contactLabel}
              </Link>
              <Link className="btn" to={`/${lang}/artists`}>
                {overviewLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="artistBioPanel">
          {artist.sections.map((section, index) => (
            <section key={section.id} className={index === 0 ? 'artistBioSection artistBioSection--first' : 'artistBioSection'}>
              <div className="kicker">{section.heading[lang]}</div>
              <div className="artistBioText">
                {section.paragraphs[lang].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
