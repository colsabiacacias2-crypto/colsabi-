import { NextResponse } from 'next/server'
import { corsPreflight, resolveCorsHeaders } from '../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp } from '../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../lib/prisma'

/**
 * @fileoverview Endpoints para obtener detalles y eliminar un escenario de práctica.
 * Autor: Colsabi AI
 * Dependencias: prisma
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Obtiene los detalles completos de un escenario, incluyendo la información
 * de la solicitud original (formulario) y el usuario administrador.
 */
export async function GET(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:get-scenario-details:${getClientIp(request)}`)

    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'ID de escenario requerido' }, { status: 400, headers })
    }

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    const scenario = await prisma.practiceScenario.findUnique({
      where: { id },
      include: {
        application: true, // Incluye toda la información del formulario original
        manager: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        _count: {
          select: { studentAssignments: true, hourEntries: true }
        }
      }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'Escenario no encontrado' }, { status: 404, headers })
    }

    return NextResponse.json({ ok: true, item: scenario }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}

/**
 * Elimina un escenario de práctica de forma segura.
 * Desvincula la solicitud original antes de eliminar para mantener integridad.
 */
export async function DELETE(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:delete-scenario:${getClientIp(request)}`)

    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'ID de escenario requerido' }, { status: 400, headers })
    }

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    const scenario = await prisma.practiceScenario.findUnique({
      where: { id }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'Escenario no encontrado' }, { status: 404, headers })
    }

    // Transacción para garantizar la integridad de la base de datos
    await prisma.$transaction(async (tx) => {
      // 1. Desvincular la solicitud (application) para que no rompa la llave foránea
      await tx.scenarioApplication.updateMany({
        where: { approvedScenarioId: id },
        data: { 
          approvedScenarioId: null, 
          status: 'REJECTED', // Se marca como rechazada ya que el escenario dejó de existir
          notes: 'El escenario fue eliminado por el administrador.'
        }
      })

      // 2. Eliminar el escenario (las asignaciones de estudiantes y horas se borrarán en cascada)
      await tx.practiceScenario.delete({
        where: { id }
      })

      // 3. Eliminar al usuario "Asociado" que administraba este escenario (si existe)
      if (scenario.managerUserId) {
        // Primero limpiar posibles registros de auditoría vinculados al usuario para evitar errores de llave foránea
        await tx.auditLog.deleteMany({
          where: { userId: scenario.managerUserId }
        })
        
        await tx.user.delete({
          where: { id: scenario.managerUserId }
        })
      }
    })

    return NextResponse.json({ ok: true, message: 'Escenario eliminado correctamente' }, { headers })
  } catch (error) {
    console.error('Error al eliminar escenario:', error)
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500, headers })
  }
}
