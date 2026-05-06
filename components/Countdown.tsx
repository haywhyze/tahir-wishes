'use client'

import { useEffect, useState } from 'react'

const TARGET = new Date('2026-05-06T16:00:00+01:00').getTime()
const EVENT_DURATION_MS = 1000 * 60 * 60 * 6 // 6h window before "wrapping up"

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now === null) {
    return (
      <section className="countdown" aria-hidden="true">
        <div className="cd-eyebrow">
          <span className="line"></span>
          The big day arrives in
          <span className="line"></span>
        </div>
        <div className="cd-grid">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((l) => (
            <div key={l} className="cd-cell">
              <div className="cd-num">--</div>
              <div className="cd-lab">{l}</div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const diff = TARGET - now

  if (diff <= 0 && diff > -EVENT_DURATION_MS) {
    return (
      <section className="countdown">
        <div className="cd-eyebrow">
          <span className="line"></span>
          The day is here
          <span className="line"></span>
        </div>
        <div className="cd-live">It&apos;s Tahir&apos;s big day — happening right now ✦</div>
      </section>
    )
  }

  if (diff < 0) {
    return (
      <section className="countdown">
        <div className="cd-eyebrow">
          <span className="line"></span>
          With gratitude
          <span className="line"></span>
        </div>
        <div className="cd-live">Thank you for being part of Tahir&apos;s first year ✦</div>
      </section>
    )
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)

  const cells = [
    { v: days, l: 'Days' },
    { v: hours, l: 'Hours' },
    { v: mins, l: 'Minutes' },
    { v: secs, l: 'Seconds' },
  ]

  return (
    <section className="countdown">
      <div className="cd-eyebrow">
        <span className="line"></span>
        The big day arrives in
        <span className="line"></span>
      </div>
      <div className="cd-grid">
        {cells.map((c) => (
          <div key={c.l} className="cd-cell">
            <div className="cd-num">{String(c.v).padStart(2, '0')}</div>
            <div className="cd-lab">{c.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
