import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'

type FormState = 'idle' | 'sending' | 'success' | 'error'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function pickLocalizedText(lang: Lang, labels: { en: string; de: string; 'zh-Hant': string }) {
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
    topic: ELINA_COPY.contact.form.topics[0]?.id ?? 'booking',
    message: '',
    bot: ''
  })

  const email = ELINA_COPY.contact.email
  const instagramUrl = ELINA_COPY.contact.instagramUrl ?? 'https://www.instagram.com/yi.earlymusic/'
  const isSending = status === 'sending'

  const pageKicker = pickLocalizedText(lang, {
    en: 'Contact',
    de: 'Kontakt',
    'zh-Hant': '聯絡'
  })
  const directContactLabel = pickLocalizedText(lang, {
    en: 'Direct contact',
    de: 'Direkter Kontakt',
    'zh-Hant': '直接聯絡'
  })
  const emailButtonLabel = pickLocalizedText(lang, {
    en: 'Send inquiry',
    de: 'Anfrage senden',
    'zh-Hant': '送出查詢'
  })
  const sendingLabel = pickLocalizedText(lang, {
    en: 'Sending...',
    de: 'Wird gesendet...',
    'zh-Hant': '正在送出……'
  })
  const successTitle = pickLocalizedText(lang, {
    en: 'Message sent',
    de: 'Nachricht gesendet',
    'zh-Hant': '訊息已送出'
  })
  const successBody = pickLocalizedText(lang, {
    en: 'Thank you. Your message has been sent successfully. A confirmation email has been sent to your address.',
    de: 'Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet. Eine Bestätigung wurde an Ihre E-Mail-Adresse geschickt.',
    'zh-Hant': '謝謝您。您的訊息已成功送出，確認郵件已寄送至您的電子郵箱。'
  })
  const errorTitle = pickLocalizedText(lang, {
    en: 'Could not send message',
    de: 'Nachricht konnte nicht gesendet werden',
    'zh-Hant': '訊息無法送出'
  })
  const defaultErrorBody = pickLocalizedText(lang, {
    en: 'Sorry, the message could not be sent. Please try again later or contact us directly by email.',
    de: 'Leider konnte die Nachricht nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.',
    'zh-Hant': '抱歉，訊息無法送出。請稍後再試，或直接透過電郵與我們聯絡。'
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name.trim() || !form.subject.trim() || !form.message.trim() || !isValidEmail(form.email)) {
      setStatus('error')
      setErrorMsg(ELINA_COPY.contact.form.requiredHint[lang])
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          topic: form.topic,
          message: form.message,
          lang,
          createdAt: createdAt.current,
          botField: form.bot
        })
      })

      const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'send-failed')
      }

      setStatus('success')
      setForm({
        name: '',
        email: '',
        subject: '',
        topic: ELINA_COPY.contact.form.topics[0]?.id ?? 'booking',
        message: '',
        bot: ''
      })
      createdAt.current = Date.now()
    } catch {
      setStatus('error')
      setErrorMsg(defaultErrorBody)
    }
  }

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
            <form onSubmit={handleSubmit}>
              <div className="contactFormGrid">
                <Field
                  label={ELINA_COPY.contact.form.name[lang]}
                  value={form.name}
                  disabled={isSending}
                  maxLength={120}
                  onChange={(value) => setForm((state) => ({ ...state, name: value }))}
                />
                <Field
                  label={ELINA_COPY.contact.form.email[lang]}
                  value={form.email}
                  disabled={isSending}
                  maxLength={180}
                  onChange={(value) => setForm((state) => ({ ...state, email: value }))}
                  type="email"
                />
                <Field
                  label={ELINA_COPY.contact.form.subject[lang]}
                  value={form.subject}
                  disabled={isSending}
                  maxLength={200}
                  onChange={(value) => setForm((state) => ({ ...state, subject: value }))}
                />

                <label className="fieldWrap">
                  <span className="kicker">{ELINA_COPY.contact.form.topic[lang]}</span>
                  <select
                    value={form.topic}
                    disabled={isSending}
                    onChange={(e) => setForm((state) => ({ ...state, topic: e.target.value }))}
                    style={fieldStyle}
                  >
                    {ELINA_COPY.contact.form.topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.label[lang]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="fieldWrap">
                  <span className="kicker">{ELINA_COPY.contact.form.message[lang]}</span>
                  <textarea
                    value={form.message}
                    disabled={isSending}
                    onChange={(e) => setForm((state) => ({ ...state, message: e.target.value }))}
                    rows={7}
                    maxLength={5000}
                    style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }}
                  />
                </label>

                <input
                  type="text"
                  value={form.bot}
                  onChange={(e) => setForm((state) => ({ ...state, bot: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  aria-label={ELINA_COPY.contact.form.honeypotLabel[lang]}
                  style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
                />

                {status === 'success' ? (
                  <div className="formMessage">
                    <div className="kicker">{successTitle}</div>
                    <p>{successBody}</p>
                  </div>
                ) : null}

                {status === 'error' ? (
                  <div className="formMessage">
                    <div className="kicker">{errorTitle}</div>
                    <p>{errorMsg || defaultErrorBody}</p>
                  </div>
                ) : null}

                <div className="heroActions">
                  <button type="submit" className="btn btn-primary" disabled={isSending}>
                    {isSending ? sendingLabel : emailButtonLabel}
                  </button>
                  <a className="btn btn-ghost" href={`mailto:${email}`}>
                    {pickLocalizedText(lang, {
                      en: 'Direct Email',
                      de: 'Direkte E-Mail',
                      'zh-Hant': '直接電郵'
                    })}
                  </a>
                  <a className="btn btn-ghost" href={instagramUrl} target="_blank" rel="noreferrer noopener">
                    Instagram
                  </a>
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
  disabled,
  maxLength,
  type = 'text'
}: {
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  maxLength?: number
  type?: string
}) {
  return (
    <label className="fieldWrap">
      <span className="kicker">{label}</span>
      <input
        value={value}
        type={type}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        style={fieldStyle}
      />
    </label>
  )
}
