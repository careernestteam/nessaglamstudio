import { createServerSupabaseClient } from './supabase'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const supabase = createServerSupabaseClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  // Check if user is admin
  const adminEmail = process.env.ADMIN_EMAIL
  if (session.user.email !== adminEmail) {
    redirect('/admin/unauthorized')
  }

  return session
}

export async function getSession() {
  const supabase = createServerSupabaseClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}