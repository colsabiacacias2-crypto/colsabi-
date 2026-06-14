import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../lib/security/cors'
import { enforceRateLimit, getClientIp, assertJsonRequest, sanitizePayload } from '../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../lib/prisma'
import { verifyAccessToken } from '../../../lib/security/jwt'
import { authCookieName } from '../../../lib/security/cookies'

/**
 * @fileoverview Endpoint para que un Asociado registre horas sociales a un estudiante.
 * Autor: Colsabi AI
 * Dependencias: prisma, jwt, zod
 */

const hourEntrySchema = z.object({
  studentId: z.string().min(1, 'ID de estudiante requerido'),
  workDate: z.string().datetime({ message: 'Fecha inválida' }),
  hours: z.coerce.number().positive('Las horas deben ser mayor a 0').max(24, 'No puedes registrar más de 24 horas en un día'),
  activityTitle: z.string().min(3, 'El título es muy corto').max(100),
  description: z.string().min(5, 'La descripción es muy corta').max(500)
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Registra una nueva entrada de horas para un estudiante y actualiza sus horas acumuladas.
 * A diferencia del administrador, el asociado no necesita "aprobar" las horas, 
 * ya que él es la autoridad en el escenario. Las horas entran directamente como APPROVED.
 */
export async function POST(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`asociado:register-hours:${getClientIp(request)}`)
    assertJsonRequest(request)

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

    const rawInput = await request.json()
    const payload = hourEntrySchema.parse(sanitizePayload(rawInput))

    const prisma = getPrisma()

    // 2. Validar que el usuario maneja un escenario y que el estudiante está asignado a él
    const scenario = await prisma.practiceScenario.findFirst({
      where: { managerUserId: session.userId }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'No tienes un escenario asignado' }, { status: 404, headers })
    }

    const assignment = await prisma.studentScenarioAssignment.findUnique({
      where: {
        studentId_scenarioId: {
          scenarioId: scenario.id,
          studentId: payload.studentId
        }
      }
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Este estudiante no está asignado a tu escenario' }, { status: 403, headers })
    }

    // 3. Crear el registro de horas y actualizar las horas acumuladas (en una transacción)
    const result = await prisma.$transaction(async (tx) => {
      // Crear el registro en el historial
      const entry = await tx.socialHourEntry.create({
        data: {
          studentId: payload.studentId,
          scenarioId: scenario.id,
          reviewedByUserId: session.userId, // El mismo asociado es el revisor
          workDate: new Date(payload.workDate),
          hours: payload.hours,
          activityTitle: payload.activityTitle,
          description: payload.description,
          status: 'APPROVED', // Aprobado automáticamente
          reviewedAt: new Date()
        }
      })

      // Sumar las horas al contador principal del estudiante en este escenario
      const updatedAssignment = await tx.studentScenarioAssignment.update({
        where: { id: assignment.id },
        data: {
          approvedHours: {
            increment: Math.floor(payload.hours) // Sumamos las horas enteras (prisma Decimal to Int)
          }
        }
      })

      return { entry, updatedAssignment }
    })

    return NextResponse.json({ ok: true, item: result.entry, updatedHours: result.updatedAssignment.approvedHours }, { headers, status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: message }, { status: 400, headers })
  }
}
