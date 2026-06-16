import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'
import { verifyAccessToken } from '../../../../lib/security/jwt'
import { authCookieName } from '../../../../lib/security/cookies'

/**
 * @fileoverview Endpoint para obtener las estadísticas reales del Dashboard del Asociado.
 * Autor: Colsabi AI
 * Dependencias: prisma, jwt
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene las estadísticas generales del escenario gestionado por el usuario actual.
 */
export async function GET(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`asociado:dashboard-stats:${getClientIp(request)}`)

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
      // Si no tiene escenario, devolvemos estadísticas en cero
      return NextResponse.json({ 
        ok: true, 
        stats: {
          totalStudents: 0,
          totalApprovedHours: 0,
          totalRequiredHours: 0,
          completionPercentage: 0,
          scenarioName: 'Sin escenario asignado'
        }
      }, { headers })
    }

    // 3. Calcular estadísticas reales desde la base de datos
    const assignments = await prisma.studentScenarioAssignment.findMany({
      where: { scenarioId: scenario.id },
      select: {
        approvedHours: true,
        requiredHours: true
      }
    })

    const totalStudents = assignments.length
    const totalApprovedHours = assignments.reduce((sum, a) => sum + a.approvedHours, 0)
    const totalRequiredHours = assignments.reduce((sum, a) => sum + a.requiredHours, 0)
    
    let completionPercentage = 0
    if (totalRequiredHours > 0) {
      completionPercentage = Math.round((totalApprovedHours / totalRequiredHours) * 100)
    }

    // Limitar el porcentaje al 100% por si se pasan de las horas
    if (completionPercentage > 100) completionPercentage = 100

    return NextResponse.json({ 
      ok: true, 
      stats: {
        totalStudents,
        totalApprovedHours,
        totalRequiredHours,
        completionPercentage,
        scenarioName: scenario.name,
        capacity: scenario.capacity || 0
      }
    }, { headers })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}
