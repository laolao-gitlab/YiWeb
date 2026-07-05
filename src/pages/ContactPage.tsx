import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

type DirectContact = {
  id: string
  name: Record<Lang, string>
  role: Record<Lang, string>
  phone: string
  phoneHref: string
  whatsappHref: string
}

const directContacts: DirectContact[] = [
  {
    id: 'liu-yi',
    name: {
      en: 'Liu Yi',
      de: 'Liu Yi',
      'zh-Hant': '劉一'
    },
    role: {
      en: 'Countertenor',
      de: 'Countertenor',
      'zh-Hant': '假聲男高音'
    },
    phone: '+49 176 32866265',
    phoneHref: 'tel:+4917632866265',
    whatsappHref: 'https://wa.me/4917632866265'
  },
  {
    id: 'kelvin-tsui',
    name: {
      en: 'Kelvin Tsui',
      de: 'Kelvin Tsui',
      'zh-Hant': '徐錦輝'
    },
    role: {
      en: 'Harpsichordist / Early Music Conductor / Vocal Coach',
      de: 'Cembalist / Dirigent für Alte Musik / Gesangspädagoge',
      'zh-Hant': '古鍵琴家／古樂指揮／聲樂指導'
    },
    phone: '+49 176 65534751',
    phoneHref: 'tel:+4917665534751',
    whatsappHref: 'https://wa.me/4917665534751'
  }
]

function pickLocalizedText(lang: Lang, labels: Record<Lang, string>) {
  return labels[lang]
}

export function ContactPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.contact.title,
    description: ELINA_COPY.seo.contact.description,
    canonicalPath: `/${lang}/contact`
  })

  const email = ELINA_COPY.contact.email
  const instagramUrl = ELINA_COPY.contact.instagramUrl ?? 'https://www.instagram.com/yi.earlymusic/'

  const pageKicker = pickLocalizedText(lang, {
    en: 'Contact',
    de: 'Kontakt',
    'zh-Hant': '聯絡'
  })
  const generalLabel = pickLocalizedText(lang, {
    en: 'General inquiries',
    de: 'Allgemeine Anfragen',
    'zh-Hant': '一般洽詢'
  })
  const emailButtonLabel = pickLocalizedText(lang, {
    en: 'Send Email',
    de: 'E-Mail senden',
    'zh-Hant': '發送電郵'
  })
  const phoneButtonLabel = pickLocalizedText(lang, {
    en: 'Call',
    de: 'Anrufen',
    'zh-Hant': '電話聯絡'
  })
  const socialLabel = pickLocalizedText(lang, {
    en: 'Social',
    de: 'Social Media',
    'zh-Hant': '社群'
  })
  const directContactLabel = pickLocalizedText(lang, {
    en: 'Direct contact',
    de: 'Direkter Kontakt',
    'zh-Hant': '直接聯絡'
  })

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageKicker}</div>
          <h2>{ELINA_COPY.contact.heading[lang]}</h2>
          <p>{ELINA_COPY.contact.intro[lang]}</p>
        </div>
      </section>

      <section className="section">
        <div className="contactGrid contactLayout">
          <div className="contactDirectPanel">
            <div className="contactEmailBlock">
              <div>
                <div className="kicker">{generalLabel}</div>
                <a className="contactEmailLink" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>

              <div className="heroActions">
                <a className="btn btn-primary" href={`mailto:${email}`}>
                  {emailButtonLabel}
                </a>
                <a className="btn btn-ghost" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </div>

            <div className="cardsGrid cardsGrid--two contactCardsGrid">
              {directContacts.map((contact) => (
                <article key={contact.id} className="editorialCard contactArtistCard">
                  <div>
                    <div className="kicker">{directContactLabel}</div>
                    <h3>{contact.name[lang]}</h3>
                    <p>{contact.role[lang]}</p>
                  </div>

                  <a className="contactPhoneText" href={contact.phoneHref} aria-label={`${phoneButtonLabel} ${contact.name[lang]} ${contact.phone}`}>
                    {contact.phone}
                  </a>

                  <div className="heroActions">
                    <a className="btn btn-primary" href={contact.phoneHref} aria-label={`${phoneButtonLabel} ${contact.name[lang]}`}>
                      {phoneButtonLabel}
                    </a>
                    <a
                      className="btn btn-ghost"
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${contact.name[lang]}`}
                    >
                      WhatsApp
                    </a>
                    <a className="btn btn-ghost" href={`mailto:${email}`}>
                      {emailButtonLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="contactAside">
            <div className="kicker">{socialLabel}</div>
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
