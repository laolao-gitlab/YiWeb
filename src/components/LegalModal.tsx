import type { Lang, LocalizedText } from '../content/types'
import { Modal } from '../app/Modal'

export function LegalModal({
  open,
  onClose,
  lang,
  title,
  body
}: {
  open: boolean
  onClose: () => void
  lang: Lang
  title: LocalizedText
  body: LocalizedText
}) {
  const legalLabel = lang === 'de' ? 'Rechtliches' : lang === 'zh-Hant' ? '法律資訊' : 'Legal'
  const closeLabel = lang === 'de' ? 'Schließen' : lang === 'zh-Hant' ? '關閉' : 'Close'

  return (
    <Modal open={open} onClose={onClose} ariaLabel={title[lang]}>
      <div style={{ display: 'grid', gap: 14 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {legalLabel}
          </div>
          <h2 style={{ marginTop: 0 }}>{title[lang]}</h2>
        </div>
        <div style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{body[lang]}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose} type="button">
            {closeLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
