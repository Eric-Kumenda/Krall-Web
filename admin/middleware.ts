import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 1. Supabase Auth Refresh
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response.cookies.set(name, value, options)
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 2. IP Restriction for API Routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Allow if authenticated user (Admin App)
    if (user) {
      return response
    }

    // Check IP for Client App
    const clientIp = request.headers.get('x-forwarded-for') || request.ip
    const allowedIp = process.env.CLIENT_APP_IP

    // If we have an allowed IP set, and the request IP doesn't match, block it
    // Note: In development, IP might be ::1 or 127.0.0.1, so we might want to skip this check locally if CLIENT_APP_IP is not set
    if (allowedIp && clientIp && !clientIp.includes(allowedIp)) {
      return NextResponse.json({ error: 'Unauthorized IP' }, { status: 403 })
    }
  }

  // 3. Protected Routes (Dashboard)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // Feel free to modify this pattern to include more paths.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
