import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'

/**
 * @fileoverview Endpoint para listar los escenarios de práctica (horas sociales).
 * Autor: Colsabi AI
 * Dependencias: prisma, zod
 */

const querySchema = z.object({
  status: z.enum(['PENDING', 'ACTIVE', 'REJECTED', 'INACTIVE']).optional(),
  take: z.coerce.number().int().positive().max(100).default(25),
  skip: z.coerce.number().int().min(0).default(0)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene la lista de escenarios de práctica junto con el conteo de estudiantes asignados.
 * @param {Request} request 
 * @returns {Promise<NextResponse>} Lista de escenarios
 */
export async function GET(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:list-scenarios:${getClientIp(request)}`)

    const url = new URL(request.url)
    const query = querySchema.parse({
      status: url.searchParams.get('status') || undefined,
      take: url.searchParams.get('take') || undefined,
      skip: url.searchParams.get('skip') || undefined
    })

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    // Obtenemos los escenarios con el conteo de estudiantes asignados
    const items = await prisma.practiceScenario.findMany({
      where: query.status ? { status: query.status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: query.take,
      skip: query.skip,
      include: {
        _count: {
          select: { studentAssignments: true }
        }
      }
    })

    return NextResponse.json({ ok: true, items }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}
