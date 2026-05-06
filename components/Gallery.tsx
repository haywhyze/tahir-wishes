'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface GalleryPhoto {
  src: string
  alt: string
}

const AUTO_INTERVAL = 4000
const SWIPE_THRESHOLD = 40

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const lastInteractionRef = useRef<number>(0)
  const total = photos.length

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total)
    },
    [total],
  )

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total])

  // Autoplay — always running. Manual interaction nudges the timer
  // forward so the user gets ~AUTO_INTERVAL ms after their click before
  // the next auto-advance, but we never fully stop.
  useEffect(() => {
    if (total <= 1) return
    const tick = () => {
      const sinceInteraction = Date.now() - lastInteractionRef.current
      if (sinceInteraction >= AUTO_INTERVAL) go(1)
    }
    const id = setInterval(tick, AUTO_INTERVAL)
    return () => clearInterval(id)
  }, [go, total])

  const nudge = useCallback(() => {
    lastInteractionRef.current = Date.now()
  }, [])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        nudge()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        nudge()
        go(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, nudge])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      nudge()
      go(dx < 0 ? 1 : -1)
    }
    touchStartX.current = null
  }

  if (total === 0) return null

  // Show small range of dots when there are many photos
  const dotIndices = total <= 10 ? photos.map((_, i) => i) : null

  return (
    <section className="gallery" id="gallery">
      <div className="g-eyebrow">
        <span className="line"></span>
        A year in pictures
        <span className="line"></span>
      </div>
      <h2 className="g-title">Tahir&apos;s first year</h2>
      <p className="g-sub">From his very first day to today — a little slideshow of our prince.</p>

      <div
        className="g-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos of Tahir"
      >
        <div className="g-frame">
          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`g-slide${i === index ? ' is-active' : ''}`}
              aria-hidden={i !== index}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                priority={i === 0}
                quality={82}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}

          <button
            type="button"
            className="g-nav g-prev"
            aria-label="Previous photo"
            onClick={() => { nudge(); go(-1); }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6 L 9 12 L 15 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="g-nav g-next"
            aria-label="Next photo"
            onClick={() => { nudge(); go(1); }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6 L 15 12 L 9 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="g-counter" aria-live="polite">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="g-counter-sep">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {dotIndices && (
          <div className="g-dots" role="tablist">
            {dotIndices.map((i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Photo ${i + 1}`}
                className={`g-dot${i === index ? ' is-active' : ''}`}
                onClick={() => { nudge(); goTo(i); }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
