import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

export function ContactPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.contact.title,
    description: ELINA_COPY.seo.contact.description,
    canonicalPath: `/${lang}/contact`
  })

  const email = ELINA_COPY.contact.email
  const instagramUrl = ELINA_COPY.contact.instagramUrl ?? 'https://www.instagram.com/yi.earlymusic/'
  const pageCopy = ELINA_COPY.pages.contact

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageCopy.pageKicker[lang]}</div>
          <h2>{ELINA_COPY.contact.heading[lang]}</h2>
          <p>{ELINA_COPY.contact.intro[lang]}</p>
        </div>
      </section>

      <section className="section">
        <div className="contactGrid contactLayout">
          <div className="contactDirectPanel">
            <div className="contactEmailBlock">
              <div>
                <div className="kicker">{pageCopy.generalLabel[lang]}</div>
                <a className="contactEmailLink" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>

              <div className="heroActions">
                <a className="btn btn-primary" href={`mailto:${email}`}>
                  {pageCopy.emailButtonLabel[lang]}
                </a>
                <a className="btn btn-ghost" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </div>

            <div className="cardsGrid cardsGrid--two contactCardsGrid">
              {ELINA_COPY.contact.directContacts.map((contact) => (
                <article key={contact.id} className="editorialCard contactArtistCard">
                  <div>
                    <div className="kicker">{pageCopy.directContactLabel[lang]}</div>
                    <h3>{contact.name[lang]}</h3>
                    <p>{contact.role[lang]}</p>
                  </div>

                  <a className="contactPhoneText" href={contact.phoneHref} aria-label={`${pageCopy.phoneButtonLabel[lang]} ${contact.name[lang]} ${contact.phone}`}>
                    {contact.phone}
                  </a>

                  <div className="heroActions">
                    <a className="btn btn-primary" href={contact.phoneHref} aria-label={`${pageCopy.phoneButtonLabel[lang]} ${contact.name[lang]}`}>
                      {pageCopy.phoneButtonLabel[lang]}
                    </a>
                    <a
                      className="btn btn-ghost"
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${pageCopy.whatsappLabel[lang]} ${contact.name[lang]}`}
                    >
                      {pageCopy.whatsappLabel[lang]}
                    </a>
                    <a className="btn btn-ghost" href={`mailto:${email}`}>
                      {pageCopy.emailButtonLabel[lang]}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="contactAside">
            <div className="kicker">{pageCopy.socialLabel[lang]}</div>
            <div className="footerContactBlock">
              <a className="underline" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="underline" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
            <div className="caption">{ELINA_COPY.legal.footerLine[lang]}</div>
          </aside>
        </div>
      </section>
    </main>
  )
}
