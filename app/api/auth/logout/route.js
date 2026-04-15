import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { authCookieName, buildAuthCookieOptions } from '../../../../lib/security/cookies'

export async function OPTIONS(request) {
  return corsPreflight(request)
}

export async function POST(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)
  const response = NextResponse.json({ ok: true }, { headers })

  response.cookies.set(authCookieName, '', {
    ...buildAuthCookieOptions(),
    maxAge: 0
  })

  return response
}

