import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'
import { verifyAccessToken } from '../../../../lib/security/jwt'
import { authCookieName } from '../../../../lib/security/cookies'

/**
 * @fileoverview Endpoint para que un Asociado obtenga la lista de estudiantes
 * asignados a su escenario de práctica.
 * Autor: Colsabi AI
 * Dependencias: prisma, jwt
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene los estudiantes asignados al escenario gestionado por el usuario actual.
 */
export async function GET(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`asociado:list-students:${getClientIp(request)}`)

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    // 1. Autenticar al usuario y obtener su ID desde el token
    const token = request.cookies.get(authCookieName)?.value
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401, headers })
    }

    let session
    try {
      session = await verifyAccessToken(token)
    } catch {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401, headers })
    }

    if (session.role !== 'ASOCIADO') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403, headers })
    }

    const prisma = getPrisma()

    // 2. Encontrar el escenario que maneja este usuario
    const scenario = await prisma.practiceScenario.findFirst({
      where: { managerUserId: session.userId }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'No tienes un escenario asignado' }, { status: 404, headers })
    }

    // 3. Obtener los estudiantes asignados a este escenario
    const assignments = await prisma.studentScenarioAssignment.findMany({
      where: { scenarioId: scenario.id },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            studentCode: true,
            grade: true
          }
        }
      },
      orderBy: { student: { fullName: 'asc' } }
    })

    return NextResponse.json({ ok: true, items: assignments, scenario }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}
