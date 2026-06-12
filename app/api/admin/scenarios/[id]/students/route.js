import { NextResponse } from 'next/server'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../../../lib/security/cors'
import { enforceRateLimit, getClientIp, assertJsonRequest, sanitizePayload } from '../../../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../../../lib/prisma'

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

    const { id } = await params
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

const assignSchema = z.object({
  studentId: z.string().optional(),
  fullName: z.string().optional(),
  grade: z.string().optional(),
  requiredHours: z.coerce.number().int().positive().default(80)
}).refine(data => data.studentId || (data.fullName && data.grade), {
  message: "Debe proporcionar un ID de estudiante, o bien el nombre y grado para registrar uno nuevo."
})

/**
 * Asigna un estudiante a un escenario de práctica verificando la capacidad.
 * Si no se proporciona un ID de estudiante, se crea uno nuevo con el nombre y grado.
 */
export async function POST(request, { params }) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    enforceRateLimit(`admin:assign-student:${getClientIp(request)}`)
    assertJsonRequest(request)

    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'ID de escenario requerido' }, { status: 400, headers })
    }

    const rawInput = await request.json()
    const payload = assignSchema.parse(sanitizePayload(rawInput))

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    const prisma = getPrisma()

    // 1. Validar escenario y su capacidad actual
    const scenario = await prisma.practiceScenario.findUnique({
      where: { id },
      include: {
        _count: {
          select: { studentAssignments: true }
        }
      }
    })

    if (!scenario) {
      return NextResponse.json({ error: 'Escenario no encontrado' }, { status: 404, headers })
    }

    if (scenario.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'El escenario no está activo para recibir estudiantes' }, { status: 400, headers })
    }

    if (scenario.capacity && scenario._count.studentAssignments >= scenario.capacity) {
      return NextResponse.json({ error: 'El escenario ha alcanzado su capacidad máxima' }, { status: 400, headers })
    }

    // 2. Resolver el ID del estudiante (buscarlo o crearlo)
    let finalStudentId = payload.studentId

    if (finalStudentId) {
      const student = await prisma.student.findUnique({
        where: { id: finalStudentId }
      })

      if (!student || !student.isActive) {
        return NextResponse.json({ error: 'Estudiante no encontrado o inactivo' }, { status: 404, headers })
      }
    } else {
      // Crear al estudiante sobre la marcha
      // Se autogenera un studentCode ya que es requerido en la base de datos
      const newStudent = await prisma.student.create({
        data: {
          fullName: payload.fullName,
          grade: payload.grade,
          studentCode: `STU-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
        }
      })
      finalStudentId = newStudent.id
    }

    // 3. Crear la asignación (fallará automáticamente si ya existe gracias a @@unique en Prisma)
    const assignment = await prisma.studentScenarioAssignment.create({
      data: {
        scenarioId: id,
        studentId: finalStudentId,
        requiredHours: payload.requiredHours,
        status: 'ACTIVE'
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            studentCode: true,
            grade: true
          }
        }
      }
    })

    return NextResponse.json({ ok: true, item: assignment }, { headers, status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'

    // Error de clave única de Prisma (el estudiante ya está asignado a este escenario)
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'El estudiante ya está asignado a este escenario' }, { status: 409, headers })
    }

    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers })
    }

    return NextResponse.json({ error: message }, { status: 400, headers })
  }
}

