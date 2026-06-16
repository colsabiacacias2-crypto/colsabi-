import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../lib/prisma'
import { verifyAccessToken } from '../../../../../lib/security/jwt'
import { authCookieName } from '../../../../../lib/security/cookies'

/**
 * @fileoverview Endpoint para que un Asociado vea el historial de horas de un estudiante.
 * Autor: Colsabi AI
 * Dependencias: prisma, jwt
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene el historial de registros de horas sociales de un estudiante específico.
 */
export async function GET(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`asociado:get-student-hours:${getClientIp(request)}`)

    const { studentId } = await params
    if (!studentId) {
      return NextResponse.json({ error: 'ID de estudiante requerido' }, { status: 400, headers })
    }

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    // 1. Autenticar al usuario
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
    const scenario = await prisma.escenarioPractica.findFirst({
      where: { managerUserId: session.userId }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'No tienes un escenario asignado' }, { status: 404, headers })
    }

    // 3. Obtener el historial de horas para este estudiante en este escenario
    const items = await prisma.registroHoraSocial.findMany({
      where: { 
        studentId: studentId,
        scenarioId: scenario.id
      },
      orderBy: { workDate: 'desc' }
    })

    // 4. Obtener la asignación para ver horas aprobadas vs requeridas
    const assignment = await prisma.asignacionEstudianteEscenario.findUnique({
      where: {
        studentId_scenarioId: {
          scenarioId: scenario.id,
          studentId: studentId
        }
      },
      select: {
        approvedHours: true,
        requiredHours: true
      }
    })

    return NextResponse.json({ ok: true, items, summary: assignment }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}
