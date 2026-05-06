import { Redis } from '@upstash/redis'
import type { Wish } from './types'

const WISHES_KEY = 'tahir:wishes:v1'

let _redis: Redis | null | undefined

function client(): Redis | null {
  if (_redis !== undefined) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN in your environment.',
      )
    }
    _redis = null
    return null
  }
  _redis = new Redis({ url, token })
  return _redis
}

let memoryStore: Wish[] = []

async function readAll(): Promise<Wish[]> {
  const r = client()
  if (!r) return memoryStore
  const data = await r.get<Wish[] | string>(WISHES_KEY)
  if (!data) return []
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as Wish[]
    } catch {
      return []
    }
  }
  return data
}

async function writeAll(wishes: Wish[]): Promise<void> {
  const r = client()
  if (!r) {
    memoryStore = wishes
    return
  }
  await r.set(WISHES_KEY, JSON.stringify(wishes))
}

export async function getAllWishes(): Promise<Wish[]> {
  const all = await readAll()
  return [...all].sort((a, b) => b.ts - a.ts)
}

export async function getApprovedWishes(): Promise<Wish[]> {
  const all = await readAll()
  return all.filter((w) => w.status === 'approved').sort((a, b) => b.ts - a.ts)
}

export async function addWish(wish: Wish): Promise<Wish> {
  const all = await readAll()
  await writeAll([wish, ...all])
  return wish
}

export async function updateWishStatus(
  id: string,
  status: Wish['status'],
): Promise<Wish | null> {
  const all = await readAll()
  const idx = all.findIndex((w) => w.id === id)
  if (idx === -1) return null
  const updated = { ...all[idx], status }
  all[idx] = updated
  await writeAll(all)
  return updated
}

export async function deleteWish(id: string): Promise<boolean> {
  const all = await readAll()
  const next = all.filter((w) => w.id !== id)
  if (next.length === all.length) return false
  await writeAll(next)
  return true
}
