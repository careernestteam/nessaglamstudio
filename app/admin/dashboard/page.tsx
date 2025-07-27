import { requireAuth } from '@/lib/auth'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default async function DashboardPage() {
  await requireAuth()
  
  return <AdminDashboard />
}