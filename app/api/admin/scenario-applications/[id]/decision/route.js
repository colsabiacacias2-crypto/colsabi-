import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../../../lib/security/cors'
import { assertJsonRequest, enforceRateLimit, getClientIp, sanitizePayload } from '../../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../../lib/prisma'
import { slugify } from '../../../../../../lib/slug'
import { hashPassword } from '../../../../../../lib/security/password'

const bodySchema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  notes: z.string().max(1000).optional()
})

function generateTempPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$'
  const bytes = Array.from({ length: 14 }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
  return bytes.join('')
}

export async function OPTIONS(request) {
  return corsPreflight(request)
}

export async function POST(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:decision:${getClientIp(request)}`)
    assertJsonRequest(request)

    const input = sanitizePayload(await request.json())
    const payload = bodySchema.parse(input)

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    const application = await prisma.scenarioApplication.findUnique({ where: { id: params.id } })

    if (!application) {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers })
    }

    if (application.status !== 'PENDING') {
      return NextResponse.json({ error: 'Application already reviewed' }, { status: 409, headers })
    }

    if (payload.decision === 'REJECT') {
      const updated = await prisma.scenarioApplication.update({
        where: { id: application.id },
        data: {
          status: 'REJECTED',
          reviewedAt: new Date(),
          notes: payload.notes || null
        }
      })

      return NextResponse.json({ ok: true, application: updated }, { headers })
    }

    const tempPassword = generateTempPassword()
    const passwordHash = await hashPassword(tempPassword)
    const scenarioName = application.organizationName
    const scenarioSlug = slugify(`${scenarioName}-${application.city}`)

    const result = await prisma.$transaction(async (tx) => {
      const associatedUser = await tx.user.create({
        data: {
          email: application.contactEmail,
          fullName: application.contactName,
          passwordHash,
          role: 'ASOCIADO',
          status: 'ACTIVE'
        }
      })

      const scenario = await tx.practiceScenario.create({
        data: {
          name: scenarioName,
          slug: scenarioSlug,
          description: application.description,
          city: application.city,
          address: application.address,
          capacity: application.capacity,
          status: 'ACTIVE',
          managerUserId: associatedUser.id
        }
      })

      const updatedApplication = await tx.scenarioApplication.update({
        where: { id: application.id },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
          notes: payload.notes || null,
          approvedScenarioId: scenario.id
        }
      })

      return { associatedUser, scenario, updatedApplication }
    })

    return NextResponse.json(
      {
        ok: true,
        scenario: result.scenario,
        asociado: { email: result.associatedUser.email, fullName: result.associatedUser.fullName, tempPassword }
      },
      { headers }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: message }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400, headers })
  }
}
