import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { assertJsonRequest, enforceRateLimit, getClientIp, sanitizePayload } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'

const applicationSchema = z.object({
  organizationName: z.string().min(2).max(160),
  contactName: z.string().min(2).max(160),
  contactEmail: z.string().email().max(180),
  contactPhone: z.string().min(7).max(40),
  city: z.string().min(2).max(80),
  address: z.string().min(2).max(180).optional().or(z.literal('')),
  capacity: z.coerce.number().int().positive().max(500).optional(),
  description: z.string().min(30).max(2000)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

export async function POST(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`public:scenario-application:${getClientIp(request)}`)
    assertJsonRequest(request)

    const input = sanitizePayload(await request.json())
    const payload = applicationSchema.parse(input)

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    const created = await prisma.scenarioApplication.create({
      data: {
        organizationName: payload.organizationName,
        contactName: payload.contactName,
        contactEmail: payload.contactEmail,
        contactPhone: payload.contactPhone,
        city: payload.city,
        address: payload.address || null,
        capacity: payload.capacity ?? null,
        description: payload.description
      }
    })

    return NextResponse.json({ ok: true, id: created.id }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: message }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers })
  }
}

