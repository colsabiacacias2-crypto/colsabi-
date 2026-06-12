import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../../../lib/prisma'

/**
 * @fileoverview Endpoint para eliminar (desasignar) a un estudiante de un escenario de práctica.
 * Autor: Colsabi AI
 * Dependencias: prisma
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Elimina la asignación de un estudiante a un escenario específico.
 */
export async function DELETE(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:remove-student-assignment:${getClientIp(request)}`)

    const { id, studentId } = await params
    
    if (!id || !studentId) {
      return NextResponse.json({ error: 'ID de escenario y de estudiante requeridos' }, { status: 400, headers })
    }

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    // Buscar la asignación usando los dos IDs (ya que la tabla tiene una llave compuesta única)
    const assignment = await prisma.studentScenarioAssignment.findUnique({
      where: {
        studentId_scenarioId: {
          scenarioId: id,
          studentId: studentId
        }
      }
    })

    if (!assignment) {
      return NextResponse.json({ error: 'El estudiante no está asignado a este escenario' }, { status: 404, headers })
    }

    // Eliminar la asignación
    await prisma.studentScenarioAssignment.delete({
      where: {
        id: assignment.id
      }
    })

    return NextResponse.json({ ok: true, message: 'Estudiante desasignado correctamente' }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500, headers })
  }
}
