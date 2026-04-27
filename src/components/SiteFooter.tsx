import { Link } from 'react-router-dom'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'

export function SiteFooter({
  lang,
  onOpenImprint,
  onOpenPrivacy
}: {
  lang: Lang
  onOpenImprint: () => void
  onOpenPrivacy: () => void
}) {
  const inquiriesLabel = lang === 'de' ? 'Anfragen' : lang === 'zh-Hant' ? '洽詢' : 'Inquiries'
  const contactFormLabel = lang === 'de' ? 'Kontaktformular' : lang === 'zh-Hant' ? '聯絡表單' : 'Contact form'
  const instagramUrl = ELINA_COPY.contact.instagramUrl ?? `https://www.instagram.com/${ELINA_COPY.contact.instagram.replace('@', '')}/`

  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <div className="siteFooterMain">
          <div className="kicker">{inquiriesLabel}</div>
          <div className="footerContactBlock">
            <div>
              <a className="underline" href={`mailto:${ELINA_COPY.contact.email}`}>
                {ELINA_COPY.contact.email}
              </a>
            </div>
            <div>{ELINA_COPY.contact.invitation[lang]}</div>
          </div>
          <div className="footerLinks">
            <a className="underline" href={instagramUrl} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <Link className="underline" to={`/${lang}/contact`}>
              {contactFormLabel}
            </Link>
          </div>
        </div>

        <div className="siteFooterMeta">
          <div className="footerActions">
            <button type="button" className="btn btn-ghost" onClick={onOpenImprint}>
              {ELINA_COPY.legal.imprint[lang]}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onOpenPrivacy}>
              {ELINA_COPY.legal.privacy[lang]}
            </button>
          </div>
          <div className="footerLine">{ELINA_COPY.legal.footerLine[lang]}</div>
        </div>
      </div>
    </footer>
  )
}
