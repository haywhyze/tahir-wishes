import { NextResponse } from 'next/server'
import { checkPassword, setAdminCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: { password?: unknown } = {}
  try {
    body = (await req.json()) as { password?: unknown }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  if (!password || !checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  await setAdminCookie()
  return NextResponse.json({ ok: true })
}
