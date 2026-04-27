import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lang } from '../content/types'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { LegalModal } from '../components/LegalModal'
import { ELINA_COPY } from '../content/elinaContent'

export function AppLayout({
  lang,
  children
}: {
  lang: Lang
  children: ReactNode
}) {
  const [imprintOpen, setImprintOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('gemelli-lang', lang)
  }, [lang])

  return (
    <>
      <SiteHeader lang={lang} />
      
      <div className="siteShell">{children}</div>
      <SiteFooter
        lang={lang}
        onOpenImprint={() => setImprintOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      <LegalModal
        open={imprintOpen}
        onClose={() => setImprintOpen(false)}
        lang={lang}
        title={ELINA_COPY.legal.imprint}
        body={ELINA_COPY.legal.imprintBody}
      />
      <LegalModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        lang={lang}
        title={ELINA_COPY.legal.privacy}
        body={ELINA_COPY.legal.privacyBody}
      />
    </>
  )
}
