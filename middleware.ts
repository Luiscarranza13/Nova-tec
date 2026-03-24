import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = ['/admin']

// Routes only accessible when NOT authenticated
const AUTH_ROUTES = ['/login', '/recuperar-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are missing, only block admin routes
  if (!supabaseUrl || !supabaseKey) {
    if (PROTECTED_ROUTES.some(r => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh session — important for SSR
  const { data: { user } } = await supabase.auth.getUser()

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  const isAuthPage  = AUTH_ROUTES.some(r => pathname.startsWith(r))

  // Not authenticated → trying to access protected route
  if (!user && isProtected) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated → trying to access auth pages (login, etc.)
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Authenticated on admin → verify admin role
  if (user && isProtected) {
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single()

    // If DB error or no record, allow through (fail open for admins)
    if (error || !usuario) return response

    // Only 'admin' role allowed
    if (usuario.rol !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - public assets (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)',
  ],
}
