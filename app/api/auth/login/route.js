/**
 * @fileoverview API Route para el Inicio de Sesión (Login) y Emisión de JWT
 * 
 * Este archivo maneja el proceso crítico de autenticación de la plataforma. Recibe las credenciales
 * del usuario (correo y contraseña), las valida contra la base de datos de Supabase, y si son correctas,
 * genera un JSON Web Token (JWT) firmado. 
 * 
 * Además, implementa prácticas de seguridad clave:
 * - Sanitización de entrada utilizando Zod.
 * - Comparación de contraseñas usando Bcryptjs para evitar ataques de temporización.
 * - Envío del JWT exclusivamente a través de Cookies HttpOnly, protegiendo al sistema contra
 *   robos de sesión vía JavaScript (XSS).
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getPrisma } from '../../../../lib/prisma'
import { verifyPassword as comparePasswords } from '../../../../lib/security/password'
import { signAccessToken } from '../../../../lib/security/jwt'
import { authCookieName, buildAuthCookieOptions } from '../../../../lib/security/cookies'

// Esquema de validación para asegurar que los datos de entrada tengan el formato correcto
const loginSchema = z.object({
  email: z.string().email('Formato de correo inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
})

/**
 * Maneja las peticiones POST enviadas al endpoint `/api/auth/login`.
 * 
 * Flujo de ejecución:
 * 1. Parsea el cuerpo de la petición (body).
 * 2. Valida la estructura del correo y contraseña usando Zod.
 * 3. Consulta la base de datos (Prisma) para encontrar un usuario con ese correo.
 * 4. Si existe, verifica que esté activo (is_active) y compara la contraseña encriptada (Bcrypt).
 * 5. Si todo coincide, genera un token JWT ('signAccessToken').
 * 6. Envía el token al navegador en una cookie segura ('setAuthCookie').
 * 7. Responde con los datos básicos del usuario y su rol para que el frontend pueda redirigir.
 * 
 * @param {Request} request - La solicitud HTTP entrante con las credenciales del usuario.
 * @returns {NextResponse} Respuesta JSON con estado de éxito/error y la cookie de sesión inyectada.
 */
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validación de la entrada (evita inyecciones extrañas)
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = result.data
    const prisma = getPrisma()

    // Búsqueda del usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    // Validación de existencia y comparación segura de contraseñas
    if (!user || !user.passwordHash || !(await comparePasswords(password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar que la cuenta no haya sido deshabilitada por el administrador
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Cuenta inactiva. Contacte al administrador.' },
        { status: 403 }
      )
    }

    // Generar el token JWT con los datos vitales de la sesión
    const token = await signAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email
    })

    // Crear la respuesta y adjuntar la cookie HttpOnly
    const response = NextResponse.json({
      message: 'Login exitoso',
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }
    })

    response.cookies.set(authCookieName, token, {
      ...buildAuthCookieOptions(),
      maxAge: 60 * 60 * 8 // 8 horas de sesión
    })

    return response
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error.message || 'Error desconocido' 
      },
      { status: 500 }
    )
  }
}

