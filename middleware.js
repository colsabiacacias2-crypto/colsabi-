import { NextResponse } from 'next/server'
import { verifyAccessToken } from './lib/security/jwt'
import { resolveCorsHeaders } from './lib/security/cors'

const adminPrefixes = ['/admin', '/api/admin']
const asociadoPrefixes = ['/asociado', '/api/asociado']

function matchesPrefix(pathname, prefixes) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

function applySecurityHeaders(response, origin) {
  const corsHeaders = resolveCorsHeaders(origin)

  Object.entries(corsHeaders).forEach(([key, value]) => response.headers.set(key, value))
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-ancestors 'none';")

  return response
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin') || ''

  if (request.method === 'OPTIONS') {
    return applySecurityHeaders(new NextResponse(null, { status: 204 }), origin)
  }

  if (pathname.startsWith('/api')) {
    return applySecurityHeaders(NextResponse.next(), origin)
  }

  const token = request.cookies.get('colsabi_token')?.value
  let session = null

  if (token) {
    try {
      session = await verifyAccessToken(token)
    } catch {
      session = null
    }
  }

  if (matchesPrefix(pathname, adminPrefixes)) {
    if (!session || session.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return applySecurityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin)
      }

      return applySecurityHeaders(NextResponse.redirect(new URL('/ingreso', request.url)), origin)
    }
  }

  if (matchesPrefix(pathname, asociadoPrefixes)) {
    if (!session || session.role !== 'ASOCIADO') {
      if (pathname.startsWith('/api/')) {
        return applySecurityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin)
      }

      return applySecurityHeaders(NextResponse.redirect(new URL('/ingreso', request.url)), origin)
    }
  }

  return applySecurityHeaders(NextResponse.next(), origin)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img|js).*)']
}
