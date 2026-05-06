import { redirect } from 'next/navigation'
import AdminClient from '@/components/AdminClient'
import { isAdmin } from '@/lib/auth'
import { getAllWishes } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login')
  const wishes = await getAllWishes()
  return <AdminClient initialWishes={wishes} />
}
