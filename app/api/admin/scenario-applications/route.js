import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp, sanitizePayload } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'

const querySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  take: z.coerce.number().int().positive().max(100).default(25),
  skip: z.coerce.number().int().min(0).default(0)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

export async function GET(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:list-applications:${getClientIp(request)}`)

    const url = new URL(request.url)
    const query = querySchema.parse({
      status: url.searchParams.get('status') || undefined,
      take: url.searchParams.get('take') || undefined,
      skip: url.searchParams.get('skip') || undefined
    })

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    const items = await prisma.scenarioApplication.findMany({
      where: query.status ? { status: query.status } : undefined,
      orderBy: { submittedAt: 'desc' },
      take: query.take,
      skip: query.skip
    })

    return NextResponse.json({ ok: true, items }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: message }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers })
  }
}

