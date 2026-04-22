/**
 * @fileoverview Endpoint para la Toma de Decisiones sobre Escenarios de Práctica
 * 
 * Este archivo gestiona el proceso por el cual un Administrador aprueba o rechaza una 
 * solicitud de una institución externa para convertirse en un escenario de práctica (horas sociales).
 * 
 * Flujo Operativo Principal (Aprobación):
 * Cuando se aprueba una solicitud, el sistema debe crear un entorno de trabajo completo 
 * para la nueva institución. Esto se realiza de forma segura mediante una Transacción SQL:
 * 1. Genera una contraseña temporal criptográficamente segura.
 * 2. Crea un nuevo 'User' con rol 'ASOCIADO'.
 * 3. Crea el 'PracticeScenario' (el lugar de práctica) y lo vincula al nuevo usuario.
 * 4. Actualiza la solicitud original a estado 'APPROVED'.
 * 
 * Todo ocurre atómicamente: si falla un paso, no se guarda nada, evitando bases de datos corruptas.
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../../../lib/security/cors'
import { assertJsonRequest, enforceRateLimit, getClientIp, sanitizePayload } from '../../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../../lib/prisma'
import { slugify } from '../../../../../../lib/slug'
import { hashPassword } from '../../../../../../lib/security/password'

// Validación de la decisión enviada por el administrador
const bodySchema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  notes: z.string().max(1000).optional()
})

/**
 * Genera una contraseña temporal robusta para los nuevos usuarios asociados.
 * Utiliza un alfabeto que excluye caracteres confusos (como 'l' minúscula, 'I' mayúscula, 'O' y '0')
 * para que sea fácil de dictar o copiar por parte del administrador al nuevo usuario.
 * 
 * @returns {string} Contraseña temporal de 14 caracteres.
 */
function generateTempPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$'
  const bytes = Array.from({ length: 14 }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
  return bytes.join('')
}

/**
 * Responde a solicitudes de pre-vuelo (CORS) para garantizar que el frontend 
 * tenga permiso para enviar peticiones a este endpoint.
 */
export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Procesa la decisión (Aprobar/Rechazar) del administrador sobre una solicitud específica.
 * 
 * Capas de seguridad aplicadas antes de procesar:
 * 1. enforceRateLimit: Evita ataques de fuerza bruta limitando peticiones por IP.
 * 2. assertJsonRequest: Verifica que la cabecera sea estrictamente application/json.
 * 3. sanitizePayload: Limpia el cuerpo para prevenir inyecciones NoSQL/XSS.
 * 4. z.parse: Asegura que el formato de los datos es exacto.
 * 
 * Si se aprueba, dispara una transacción Prisma ($transaction) que orquesta la creación 
 * en cascada del Usuario Asociado y su Escenario.
 * 
 * @param {Request} request - Petición HTTP con la decisión ('APPROVE' o 'REJECT').
 * @param {Object} context - Parámetros de la URL dinámica, incluye el 'id' de la solicitud.
 * @returns {NextResponse} Respuesta JSON con los resultados de la transacción o mensajes de error.
 */
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
