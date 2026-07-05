import { useState } from 'react'
import type { Lang } from '../content/types'
import { ELINA_COPY } from '../content/elinaContent'
import { useSeo } from '../lib/seo'
import { Modal } from '../app/Modal'

export function MediaPage({ lang }: { lang: Lang }) {
  useSeo({
    lang,
    title: ELINA_COPY.seo.media.title,
    description: ELINA_COPY.seo.media.description,
    canonicalPath: `/${lang}/media`
  })

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = selectedId ? ELINA_COPY.media.items.find((item) => item.id === selectedId) ?? null : null
  const pageCopy = ELINA_COPY.pages.media
  const mediaTypeLabel = (kind: 'image' | 'video') =>
    kind === 'video' ? pageCopy.videoKind[lang] : pageCopy.imageKind[lang]
  const photosHeading = ELINA_COPY.media.photosHeading[lang]
  const videosHeading = ELINA_COPY.media.videosHeading[lang]
  const videosIntro = ELINA_COPY.media.videosIntro[lang]
  const creditsNote = ELINA_COPY.media.creditsNote[lang]

  return (
    <main className="page">
      <section className="section">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageCopy.pageKicker[lang]}</div>
          <h2>{pageCopy.pageTitle[lang]}</h2>
          <p>{ELINA_COPY.media.intro[lang]}</p>
        </div>
      </section>

      <section className="section mediaSection">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{pageCopy.imagesKicker[lang]}</div>
          <h2>{photosHeading}</h2>
        </div>

        <div className="cardsGrid cardsGrid--three mediaGalleryGrid">
          {ELINA_COPY.media.items.map((item) => (
            <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className="mediaGalleryButton">
              <div className="mediaGalleryImageWrap">
                <img src={item.thumbnailSrc} alt={item.imageAlt[lang]} className="mediaGalleryImage" />
              </div>
              <div className="mediaGalleryMeta">
                <div className="kicker">{mediaTypeLabel(item.kind)}</div>
                <h3>{item.title[lang]}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section mediaSection">
        <div className="sectionHeadingBlock sectionHeadingBlock--narrow">
          <div className="kicker">{videosHeading}</div>
          <h2>{videosHeading}</h2>
          <p>{videosIntro}</p>
        </div>

        <div className="cardsGrid cardsGrid--two mediaVideoGrid">
          {ELINA_COPY.media.videos.map((video) => (
            <article key={video.id} className="videoCard">
              <div className="videoFrameWrap">
                <iframe
                  src={video.embedUrl}
                  title={video.title[lang]}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="mediaGalleryMeta">
                <div className="kicker">{videosHeading}</div>
                <h3>{video.title[lang]}</h3>
              </div>
            </article>
          ))}
        </div>

        {creditsNote ? <div className="caption mediaCreditsNote">{creditsNote}</div> : null}
      </section>

      <Modal open={!!selected} onClose={() => setSelectedId(null)} ariaLabel={selected ? selected.title[lang] : undefined}>
        {selected ? (
          <div className="modalMediaBody">
            <div className="kicker">{mediaTypeLabel(selected.kind)}</div>
            <h2>{selected.title[lang]}</h2>
            {selected.kind === 'image' ? (
              <img src={selected.thumbnailSrc} alt={selected.imageAlt[lang]} className="lightboxImg" />
            ) : (
              <video controls playsInline className="lightboxVideo" src={selected.videoUrl} />
            )}
            <div className="caption">{selected.caption[lang]}</div>
          </div>
        ) : null}
      </Modal>
    </main>
  )
}
