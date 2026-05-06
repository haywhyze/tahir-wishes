import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'tahir_admin'
const ONE_MONTH = 60 * 60 * 24 * 30

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'dev-secret-do-not-use-in-production'
  )
}

function token(): string {
  return createHmac('sha256', secret()).update('admin-v1').digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies()
  const value = c.get(COOKIE_NAME)?.value
  if (!value) return false
  return safeEqual(value, token())
}

export async function setAdminCookie(): Promise<void> {
  const c = await cookies()
  c.set(COOKIE_NAME, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_MONTH,
    path: '/',
  })
}

export async function clearAdminCookie(): Promise<void> {
  const c = await cookies()
  c.delete(COOKIE_NAME)
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  if (input.length !== expected.length) return false
  return safeEqual(input, expected)
}
