export type WishStatus = 'pending' | 'approved' | 'hidden'

export interface Wish {
  id: string
  name: string
  rel: string
  msg: string
  ts: number
  status: WishStatus
}

export interface PublicWish {
  id: string
  name: string
  rel: string
  msg: string
  ts: number
}
