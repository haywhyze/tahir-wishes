'use client'

import { useEffect, useState } from 'react'
import Confetti from './Confetti'
import type { PublicWish } from '@/lib/types'

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default function Wishes({ initialWishes }: { initialWishes: PublicWish[] }) {
  const [wishes, setWishes] = useState<PublicWish[]>(initialWishes)
  const [name, setName] = useState('')
  const [rel, setRel] = useState('')
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confettiKey, setConfettiKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/wishes', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { wishes: PublicWish[] }
        if (!cancelled) setWishes(data.wishes)
      } catch {
        // ignore — we keep the SSR list
      }
    }
    const id = setInterval(load, 30_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || !msg.trim() || submitting) return

    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), rel: rel.trim(), msg: msg.trim() }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error || 'Could not send your wish — please try again.')
      }
      setName('')
      setRel('')
      setMsg('')
      setSubmitted(true)
      setConfettiKey((k) => k + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="wishes" id="wishes">
      <Confetti trigger={confettiKey} />

      <div className="w-eyebrow">
        <span className="line"></span>
        Send him a wish
        <span className="line"></span>
      </div>
      <h2 className="w-title">A note for Tahir&apos;s first year</h2>
      <p className="w-sub">
        Leave a wish, blessing, or memory below. We&apos;ll print every one of them into a keepsake book for him to read someday.
      </p>

      <form className="w-form" onSubmit={submit}>
        <div className="w-row">
          <label className="w-field">
            <span>Your name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aunty Aisha"
              maxLength={80}
              required
            />
          </label>
          <label className="w-field">
            <span>How do you know Tahir?</span>
            <input
              type="text"
              value={rel}
              onChange={(e) => setRel(e.target.value)}
              placeholder="e.g. Auntie, Family friend"
              maxLength={80}
            />
          </label>
        </div>
        <label className="w-field">
          <span>Your wish</span>
          <textarea
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Write a short blessing, memory, or hope for Tahir's year ahead…"
            maxLength={1000}
            required
          />
        </label>
        <button type="submit" className="w-submit" disabled={submitting}>
          {submitting ? 'Sending…' : submitted ? 'Send another wish' : 'Send my wish'}
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 5 H 14 M 10 1 L 14 5 L 10 9" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {submitted && !error && (
          <div className="w-thanks">
            Thank you — your wish has been received and will appear after a parent approves it. ✦
          </div>
        )}
        {error && <div className="w-error">{error}</div>}
      </form>

      <div className="w-wall-head">
        <div className="w-wall-count">
          <span className="num">{wishes.length}</span> {wishes.length === 1 ? 'wish so far' : 'wishes so far'}
        </div>
        <div className="w-wall-line"></div>
      </div>

      {wishes.length === 0 ? (
        <div className="w-empty">No wishes have been shared yet — be the first to leave one for Tahir.</div>
      ) : (
        <div className="w-wall wall-stack">
          {wishes.map((w, i) => (
            <article key={w.id} className="wish-card" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
              <div className="wc-quote">&ldquo;</div>
              <p className="wc-msg">{w.msg}</p>
              <div className="wc-foot">
                <div>
                  <div className="wc-name">{w.name}</div>
                  {w.rel && <div className="wc-rel">{w.rel}</div>}
                </div>
                <div className="wc-when">{timeAgo(w.ts)}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
