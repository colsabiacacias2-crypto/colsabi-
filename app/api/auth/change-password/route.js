import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { corsPreflight, resolveCorsHeaders } from '../../../../lib/security/cors'
import { enforceRateLimit, getClientIp, assertJsonRequest } from '../../../../lib/security/request'
import { hasDatabase, getPrisma } from '../../../../lib/prisma'
import { verifyAccessToken } from '../../../../lib/security/jwt'
import { authCookieName } from '../../../../lib/security/cookies'

/**
 * @fileoverview Endpoint para que cualquier usuario autenticado (incluyendo Asociados) pueda cambiar su contraseña.
 * Autor: Colsabi AI
 * Dependencias: prisma, bcryptjs, zod
 */

export async function OPTIONS(request) {
  return corsPreflight(request)
}

// Esquema estricto de validación para la nueva contraseña
const schema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres")
})

/**
 * Permite cambiar la contraseña verificando primero la contraseña actual.
 */
export async function PUT(request) {
  const origin = request.headers.get('origin') || ''
  const headers = resolveCorsHeaders(origin)

  try {
    // Protección estricta contra ataques de fuerza bruta en este endpoint
    enforceRateLimit(`auth:change-password:${getClientIp(request)}`)

    if (!hasDatabase()) {
      return NextResponse.json({ error: 'Base de datos no configurada' }, { status: 503, headers })
    }

    // 1. Verificar sesión activa
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

    // 2. Validar JSON de entrada
    await assertJsonRequest(request)
    const body = await request.json()
    
    const validation = schema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400, headers })
    }

    const { currentPassword, newPassword } = validation.data

    const prisma = getPrisma()

    // 3. Obtener el usuario de la base de datos
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404, headers })
    }

    // 4. Verificar la contraseña actual (Seguridad obligatoria)
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'La contraseña actual es incorrecta' }, { status: 401, headers })
    }

    // 5. Encriptar y guardar la nueva contraseña (Mínimo 12 rondas de hashing por seguridad)
    const newPasswordHash = await bcrypt.hash(newPassword, 12)

    await prisma.usuario.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash }
    })

    // 6. Registro de auditoría
    await prisma.bitacoraAuditoria.create({
      data: {
        userId: user.id,
        action: 'CHANGE_PASSWORD',
        entity: 'Usuario',
        entityId: user.id,
        details: 'El usuario cambió sus credenciales exitosamente',
        ipAddress: getClientIp(request)
      }
    }).catch(() => {}) // Ignoramos silenciosamente si el log falla para no interrumpir la experiencia del usuario

    return NextResponse.json({ ok: true, message: 'Contraseña actualizada exitosamente' }, { headers })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Solicitud inválida'
    if (message === 'Too many requests') {
      return NextResponse.json({ error: 'Demasiados intentos. Por favor, espera un momento.' }, { status: 429, headers })
    }
    return NextResponse.json({ error: 'Solicitud incorrecta' }, { status: 400, headers })
  }
}