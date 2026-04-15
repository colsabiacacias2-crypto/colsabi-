import { NextResponse } from 'next/server'
import { z } from 'zod'
import { env } from '../../../../lib/env'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { assertJsonRequest, enforceRateLimit, getClientIp, sanitizePayload } from '../../../../lib/security/request'
import { signAccessToken } from '../../../../lib/security/jwt'
import { authCookieName, buildAuthCookieOptions } from '../../../../lib/security/cookies'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'
import { verifyPassword } from '../../../../lib/security/password'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

export async function POST(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`auth:login:${getClientIp(request)}`)
    assertJsonRequest(request)

    const input = sanitizePayload(await request.json())
    const payload = loginSchema.parse(input)

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    const user = await prisma.user.findUnique({ where: { email: payload.email } })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401, headers })
    }

    const isValid = await verifyPassword(payload.password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401, headers })
    }

    if (user.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'User is not active' }, { status: 403, headers })
    }

    const token = await signAccessToken({ sub: user.id, role: user.role, email: user.email }, '8h')
    const response = NextResponse.json({ ok: true, role: user.role }, { headers })

    response.cookies.set(authCookieName, token, {
      ...buildAuthCookieOptions(),
      maxAge: 60 * 60 * 8
    })

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: message }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers })
  }
}

