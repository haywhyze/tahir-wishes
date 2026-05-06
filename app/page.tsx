import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Wishes from '@/components/Wishes'
import { getApprovedWishes } from '@/lib/kv'
import type { PublicWish } from '@/lib/types'

export const dynamic = 'force-dynamic'

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
      <Details />
      <Wishes initialWishes={publicWishes} />
      <Footer />
    </div>
  )
}
