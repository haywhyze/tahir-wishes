import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getAllWishes } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  const wishes = await getAllWishes()
  return NextResponse.json({ wishes })
}
