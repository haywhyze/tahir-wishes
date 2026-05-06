'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import type { Wish, WishStatus } from '@/lib/types'

type Filter = 'all' | WishStatus

const TABS: { key: Filter; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'hidden', label: 'Hidden' },
  { key: 'all', label: 'All' },
]

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminClient({ initialWishes }: { initialWishes: Wish[] }) {
  const router = useRouter()
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [filter, setFilter] = useState<Filter>('pending')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const counts = useMemo(() => {
    const c = { all: wishes.length, pending: 0, approved: 0, hidden: 0 }
    for (const w of wishes) c[w.status] += 1
    return c
  }, [wishes])

  const visible = useMemo(() => {
    if (filter === 'all') return wishes
    return wishes.filter((w) => w.status === filter)
  }, [filter, wishes])

  const setStatus = async (id: string, status: WishStatus) => {
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/wishes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Update failed.')
      const data = (await res.json()) as { wish: Wish }
      setWishes((list) => list.map((w) => (w.id === id ? data.wish : w)))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Permanently delete this wish? This cannot be undone.')) return
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/wishes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed.')
      setWishes((list) => list.filter((w) => w.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusyId(null)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    startTransition(() => {
      router.replace('/admin/login')
      router.refresh()
    })
  }

  return (
    <div className="admin-wrap">
      <div className="admin-head">
        <div>
          <div className="admin-eyebrow">Tahir Wishes — moderation</div>
          <h1 className="admin-title">Parent Console</h1>
        </div>
        <button className="admin-btn admin-btn-ghost" onClick={logout} type="button">
          Sign out
        </button>
      </div>

      <div className="admin-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={filter === t.key}
            className={`admin-tab${filter === t.key ? ' is-active' : ''}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
            <span className="count">{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="admin-empty">
          {filter === 'pending'
            ? 'No wishes are waiting for approval.'
            : filter === 'approved'
              ? 'No approved wishes yet.'
              : filter === 'hidden'
                ? 'No hidden wishes.'
                : 'No wishes have been received yet.'}
        </div>
      ) : (
        <div className="admin-list">
          {visible.map((w) => {
            const busy = busyId === w.id
            return (
              <article key={w.id} className="admin-card" data-status={w.status}>
                <p className="admin-card-msg">{w.msg}</p>
                <div className="admin-card-meta">
                  <div>
                    <div className="admin-card-name">{w.name}</div>
                    {w.rel && <div className="admin-card-rel">{w.rel}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="admin-card-status" data-status={w.status}>
                      {w.status}
                    </div>
                    <div style={{ marginTop: 4 }}>{formatDate(w.ts)}</div>
                  </div>
                </div>
                <div className="admin-actions">
                  {w.status !== 'approved' && (
                    <button
                      type="button"
                      className="admin-btn"
                      disabled={busy}
                      onClick={() => setStatus(w.id, 'approved')}
                    >
                      Approve
                    </button>
                  )}
                  {w.status !== 'hidden' && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost"
                      disabled={busy}
                      onClick={() => setStatus(w.id, 'hidden')}
                    >
                      Hide
                    </button>
                  )}
                  {w.status !== 'pending' && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost"
                      disabled={busy}
                      onClick={() => setStatus(w.id, 'pending')}
                    >
                      Mark pending
                    </button>
                  )}
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    disabled={busy}
                    onClick={() => remove(w.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
