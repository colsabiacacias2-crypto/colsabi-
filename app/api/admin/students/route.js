import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'

/**
 * @fileoverview Endpoint para listar y buscar estudiantes en el sistema.
 * Autor: Colsabi AI
 * Dependencias: prisma, zod
 */

const querySchema = z.object({
  search: z.string().optional(), // Búsqueda por nombre o código
  grade: z.string().optional(),
  take: z.coerce.number().int().positive().max(100).default(50),
  skip: z.coerce.number().int().min(0).default(0)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene la lista de estudiantes registrados. Útil para que el administrador
 * busque estudiantes y los asigne a un escenario.
 */
export async function GET(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:list-students:${getClientIp(request)}`)

    const url = new URL(request.url)
    const query = querySchema.parse({
      search: url.searchParams.get('search') || undefined,
      grade: url.searchParams.get('grade') || undefined,
      take: url.searchParams.get('take') || undefined,
      skip: url.searchParams.get('skip') || undefined
    })

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    // Construir los filtros
    const where = {
      isActive: true
    }

    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { studentCode: { contains: query.search, mode: 'insensitive' } }
      ]
    }

    if (query.grade) {
      where.grade = query.grade
    }

    const items = await prisma.student.findMany({
      where,
      orderBy: { fullName: 'asc' },
      take: query.take,
      skip: query.skip,
      include: {
        _count: {
          select: { assignments: true }
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
