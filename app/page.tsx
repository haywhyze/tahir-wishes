import Countdown from '@/components/Countdown'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import QRCode from '@/components/QRCode'
import Wishes from '@/components/Wishes'
import { getApprovedWishes } from '@/lib/kv'
import { PHOTOS } from '@/lib/photos'
import type { PublicWish } from '@/lib/types'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tahir-wishes.vercel.app'

export default async function Home() {
  const wishes = await getApprovedWishes()
  const publicWishes: PublicWish[] = wishes.map((w) => ({
    id: w.id,
    name: w.name,
    rel: w.rel,
    msg: w.msg,
    ts: w.ts,
  }))

  return (
    <div className="page">
      <Hero />
      <Countdown />
      <Gallery photos={PHOTOS} />
      <Wishes initialWishes={publicWishes} />
      <QRCode url={SITE_URL} />
      <Footer />
    </div>
  )
}
