import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../lib/prisma'

/**
 * @fileoverview Endpoint para listar los estudiantes asignados a un escenario específico 
 * y sus horas sociales acumuladas.
 * Autor: Colsabi AI
 * Dependencias: prisma, zod
 */

const querySchema = z.object({
  take: z.coerce.number().int().positive().max(100).default(25),
  skip: z.coerce.number().int().min(0).default(0)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene la lista de estudiantes asignados a un escenario específico.
 * @param {Request} request 
 * @param {Object} context
 * @param {Object} context.params
 * @param {string} context.params.id - El ID del escenario
 * @returns {Promise<NextResponse>} Lista de asignaciones de estudiantes
 */
export async function GET(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:list-scenario-students:${getClientIp(request)}`)

    const { id } = params
    if (!id) {
      return NextResponse.json({ error: 'ID de escenario requerido' }, { status: 400, headers })
    }

    const url = new URL(request.url)
    const query = querySchema.parse({
      take: url.searchParams.get('take') || undefined,
      skip: url.searchParams.get('skip') || undefined
    })

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    // Validar que el escenario exista
    const scenario = await prisma.practiceScenario.findUnique({
      where: { id }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'Escenario no encontrado' }, { status: 404, headers })
    }

    // Obtener los estudiantes asignados a este escenario
    const items = await prisma.studentScenarioAssignment.findMany({
      where: { scenarioId: id },
      orderBy: { assignedAt: 'desc' },
      take: query.take,
      skip: query.skip,
      include: {
        student: {
          select: {
            id: true,
            studentCode: true,
            fullName: true,
            grade: true,
            section: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json({ ok: true, items, scenario }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}
