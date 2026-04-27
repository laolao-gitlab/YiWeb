import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

type FormState = 'idle' | 'success' | 'error'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function getLocalizedLabel(lang: Lang, labels: { en: string; de: string; 'zh-Hant': string }) {
  return labels[lang]
}

export function ContactPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.contact.title,
    description: ELINA_COPY.seo.contact.description,
    canonicalPath: `/${lang}/contact`
  })

  const createdAt = useRef<number>(0)
  useEffect(() => {
    createdAt.current = Date.now()
  }, [])

  const [status, setStatus] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    topic: ELINA_COPY.contact.form.topics[0].id,
    message: '',
    bot: ''
  })

  const email = ELINA_COPY.contact.email
  const instagramUrl = ELINA_COPY.contact.instagramUrl ?? `https://www.instagram.com/${ELINA_COPY.contact.instagram.replace('@', '')}/`
  const defaultSubject = getLocalizedLabel(lang, {
    en: 'Inquiry to Gemelli in Harmonia',
    de: 'Anfrage an Gemelli in Harmonia',
    'zh-Hant': '致 Gemelli in Harmonia 的詢問'
  })
  const emailButtonLabel = getLocalizedLabel(lang, {
    en: 'Contact by Email',
    de: 'Per E-Mail kontaktieren',
    'zh-Hant': '電郵聯絡'
  })
  const sendEmailLabel = getLocalizedLabel(lang, {
    en: 'Send Email',
    de: 'E-Mail senden',
    'zh-Hant': '發送電郵'
  })
  const directContactLabel = getLocalizedLabel(lang, {
    en: 'Direct contact',
    de: 'Direkter Kontakt',
    'zh-Hant': '直接聯絡'
  })
  const pageKicker = getLocalizedLabel(lang, {
    en: 'Contact',
    de: 'Kontakt',
    'zh-Hant': '聯絡'
  })

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(form.subject || defaultSubject)
    const body = encodeURIComponent(`Topic: ${form.topic}\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [defaultSubject, email, form])

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageKicker}</div>
          <h2>{ELINA_COPY.contact.heading[lang]}</h2>
          <p>{ELINA_COPY.contact.intro[lang]}</p>
          <p>{ELINA_COPY.contact.invitation[lang]}</p>
        </div>
      </section>

      <section className="section">
        <div className="contactGrid contactLayout">
          <div className="formPanel">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!form.name.trim() || !form.subject.trim() || !form.message.trim() || !isValidEmail(form.email)) {
                  setStatus('error')
                  setErrorMsg(ELINA_COPY.contact.form.requiredHint[lang])
                  return
                }
                if (form.bot.trim() || Date.now() - createdAt.current < 1200) {
                  setStatus('error')
                  setErrorMsg(ELINA_COPY.contact.form.errorBody[lang])
                  return
                }

                setStatus('success')
                window.location.href = mailtoHref
              }}
            >
              <div className="contactFormGrid">
                <Field label={ELINA_COPY.contact.form.name[lang]} value={form.name} onChange={(value) => setForm((state) => ({ ...state, name: value }))} />
                <Field label={ELINA_COPY.contact.form.email[lang]} value={form.email} onChange={(value) => setForm((state) => ({ ...state, email: value }))} type="email" />
                <Field label={ELINA_COPY.contact.form.subject[lang]} value={form.subject} onChange={(value) => setForm((state) => ({ ...state, subject: value }))} />
                <label className="fieldWrap">
                  <span className="kicker">{ELINA_COPY.contact.form.topic[lang]}</span>
                  <select value={form.topic} onChange={(e) => setForm((state) => ({ ...state, topic: e.target.value }))} style={fieldStyle}>
                    {ELINA_COPY.contact.form.topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.label[lang]}</option>)}
                  </select>
                </label>
                <label className="fieldWrap">
                  <span className="kicker">{ELINA_COPY.contact.form.message[lang]}</span>
                  <textarea value={form.message} onChange={(e) => setForm((state) => ({ ...state, message: e.target.value }))} rows={6} style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }} />
                </label>

                <input
                  type="text"
                  value={form.bot}
                  onChange={(e) => setForm((state) => ({ ...state, bot: e.target.value }))}
                  tabIndex={-1}
                  aria-hidden="true"
                  aria-label={ELINA_COPY.contact.form.honeypotLabel[lang]}
                  style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
                />

                {status === 'success' ? (
                  <div className="formMessage">
                    <div className="kicker">{ELINA_COPY.contact.form.successTitle[lang]}</div>
                    <p>{ELINA_COPY.contact.form.successBody[lang]}</p>
                  </div>
                ) : null}

                {status === 'error' ? (
                  <div className="formMessage">
                    <div className="kicker">{ELINA_COPY.contact.form.errorTitle[lang]}</div>
                    <p>{errorMsg}</p>
                  </div>
                ) : null}

                <div className="heroActions">
                  <button type="submit" className="btn btn-primary">
                    {emailButtonLabel}
                  </button>
                  <a className="btn btn-ghost" href={`mailto:${email}`}>{sendEmailLabel}</a>
                  <a className="btn btn-ghost" href={instagramUrl} target="_blank" rel="noreferrer noopener">Instagram</a>
                </div>
              </div>
            </form>
          </div>

          <aside className="contactAside">
            <div className="kicker">{directContactLabel}</div>
            <div className="footerContactBlock">
              <a className="underline" href={`mailto:${email}`}>{email}</a>
              <a className="underline" href={instagramUrl} target="_blank" rel="noreferrer noopener">Instagram</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

const fieldStyle = {
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: '13px 15px',
  background: 'rgba(255,255,255,0.46)',
  color: 'var(--ink)',
  outline: 'none'
} as const

function Field({
  label,
  value,
  onChange,
  type = 'text'
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="fieldWrap">
      <span className="kicker">{label}</span>
      <input value={value} type={type} onChange={(e) => onChange(e.target.value)} style={fieldStyle} />
    </label>
  )
}
