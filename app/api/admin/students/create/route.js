import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp, assertJsonRequest, sanitizePayload } from '../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../lib/prisma'

/**
 * @fileoverview Endpoint para la creación directa de estudiantes en el sistema.
 * Autor: Colsabi AI
 * Dependencias: prisma, zod
 */

const studentSchema = z.object({
  fullName: z.string().min(3, 'El nombre es muy corto').max(100),
  grade: z.string().min(1, 'El grado es requerido').max(20),
  studentCode: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
})

export async function OPTIONS(request) {
  return corsPreflight(request)
}

/**
 * Crea un nuevo estudiante en la base de datos.
 */
export async function POST(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:create-student:${getClientIp(request)}`)
    assertJsonRequest(request)

    const rawInput = await request.json()
    const payload = studentSchema.parse(sanitizePayload(rawInput))

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()
    
    // Autogenerar un código de estudiante si no fue proveído (es requerido por BD)
    const code = payload.studentCode || `STU-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`

    const newStudent = await prisma.student.create({
      data: {
        fullName: payload.fullName,
        grade: payload.grade,
        studentCode: code,
        email: payload.email || undefined
      }
    })

    return NextResponse.json({ ok: true, item: newStudent }, { headers, status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe un estudiante con ese código o documento' }, { status: 409, headers })
    }

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: message }, { status: 400, headers })
  }
}
