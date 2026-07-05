import type { Lang, LocalizedText } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
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
  const modalCopy = ELINA_COPY.pages.legalModal

  return (
    <Modal open={open} onClose={onClose} ariaLabel={title[lang]}>
      <div style={{ display: 'grid', gap: 14 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {modalCopy.legalLabel[lang]}
          </div>
          <h2 style={{ marginTop: 0 }}>{title[lang]}</h2>
        </div>
        <div style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{body[lang]}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose} type="button">
            {modalCopy.closeLabel[lang]}
          </button>
        </div>
      </div>
    </Modal>
  )
}
