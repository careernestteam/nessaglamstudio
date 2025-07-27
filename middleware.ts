import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if the route is an admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Skip auth check for login page
    if (req.nextUrl.pathname === '/admin/login') {
      return res
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Check if user is admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (session.user.email !== adminEmail) {
      return NextResponse.redirect(new URL('/admin/unauthorized', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}