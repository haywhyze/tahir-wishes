import { NextResponse } from 'next/server'
import { addWish, getApprovedWishes } from '@/lib/kv'
import type { PublicWish, Wish } from '@/lib/types'

export const dynamic = 'force-dynamic'

const NAME_MAX = 80
const REL_MAX = 80
const MSG_MAX = 1000
const MSG_MIN = 2

function clean(input: unknown, max: number): string {
  if (typeof input !== 'string') return ''
  return input.replace(/\s+/g, ' ').trim().slice(0, max)
}

function toPublic(w: Wish): PublicWish {
  return { id: w.id, name: w.name, rel: w.rel, msg: w.msg, ts: w.ts }
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export async function GET() {
  const wishes = await getApprovedWishes()
  return NextResponse.json({ wishes: wishes.map(toPublic) })
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const data = (body ?? {}) as Record<string, unknown>
  const name = clean(data.name, NAME_MAX)
  const rel = clean(data.rel, REL_MAX)
  const msg = clean(data.msg, MSG_MAX)

  if (!name) return NextResponse.json({ error: 'Please share your name.' }, { status: 400 })
  if (msg.length < MSG_MIN) {
    return NextResponse.json({ error: 'Please write a wish before sending.' }, { status: 400 })
  }

  const wish: Wish = {
    id: newId(),
    name,
    rel,
    msg,
    ts: Date.now(),
    status: 'pending',
  }

  await addWish(wish)
  return NextResponse.json({ ok: true, wish: toPublic(wish) }, { status: 201 })
}
