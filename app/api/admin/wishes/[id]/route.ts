import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { deleteWish, updateWishStatus } from '@/lib/kv'
import type { WishStatus } from '@/lib/types'

export const dynamic = 'force-dynamic'

const VALID: WishStatus[] = ['pending', 'approved', 'hidden']

interface Ctx {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  const { id } = await params
  let body: { status?: unknown } = {}
  try {
    body = (await req.json()) as { status?: unknown }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }
  const status = body.status
  if (typeof status !== 'string' || !VALID.includes(status as WishStatus)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  }
  const updated = await updateWishStatus(id, status as WishStatus)
  if (!updated) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  return NextResponse.json({ wish: updated })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  const { id } = await params
  const ok = await deleteWish(id)
  if (!ok) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
