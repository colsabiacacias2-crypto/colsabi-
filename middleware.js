/**
 * @fileoverview Middleware Global de Seguridad y Enrutamiento (Edge Middleware)
 * 
 * Este archivo es la primera barrera de defensa de toda la aplicación COLSABI. Intercepta 
 * absolutamente todas las solicitudes HTTP que recibe el servidor antes de que lleguen a su 
 * destino final. 
 * 
 * Sus principales responsabilidades son:
 * 1. Verificación de JWT (Autenticación): Inspecciona las cookies en busca de un token válido 
 *    antes de permitir el acceso a rutas protegidas.
 * 2. Control de Acceso (Autorización): Verifica que el rol del usuario ('ADMIN' o 'ASOCIADO') 
 *    coincida con el nivel de permiso requerido por la URL (Rutas '/admin/...' y '/asociado/...').
 * 3. Cabeceras de Seguridad (Security Headers): Inyecta dinámicamente configuraciones estrictas 
 *    para prevenir ataques web comunes como Clickjacking, XSS (Cross-Site Scripting) y Sniffing.
 * 4. Gestión CORS: Configura los dominios permitidos para solicitudes cruzadas.
 */

import { NextResponse } from 'next/server'
import { verifyAccessToken } from './lib/security/jwt'
import { resolveCorsHeaders } from './lib/security/cors'

// Prefijos que dictan qué rutas del frontend o de la API requieren un rol específico
const adminPrefixes = ['/admin', '/api/admin']
const asociadoPrefixes = ['/asociado', '/api/asociado']

/**
 * Función utilitaria para determinar si la ruta solicitada requiere protección.
 * 
 * @param {string} pathname - La ruta actual que el usuario intenta visitar (ej. '/admin/dashboard').
 * @param {string[]} prefixes - Un arreglo de prefijos protegidos a comparar (ej. ['/admin']).
 * @returns {boolean} Verdadero si la ruta solicitada coincide o empieza con algún prefijo.
 */
function matchesPrefix(pathname, prefixes) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

/**
 * Inyecta un robusto conjunto de encabezados HTTP a la respuesta del servidor para blindar 
 * la aplicación contra vulnerabilidades OWASP comunes.
 * 
 * - X-Frame-Options (DENY): Evita que el sitio sea incrustado en un iframe malicioso (Clickjacking).
 * - Content-Security-Policy (CSP): Restringe de dónde pueden cargarse scripts, estilos e imágenes, 
 *   bloqueando ejecuciones no autorizadas (XSS).
 * 
 * @param {NextResponse} response - El objeto de respuesta de Next.js.
 * @param {string} origin - El origen (dominio) desde donde se hace la petición (útil para CORS).
 * @returns {NextResponse} La misma respuesta pero fortificada con cabeceras de seguridad.
 */
function applySecurityHeaders(response, origin) {
  const corsHeaders = resolveCorsHeaders(origin)

  Object.entries(corsHeaders).forEach(([key, value]) => response.headers.set(key, value))
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-src 'self' https://www.google.com https://maps.google.com https://forms.office.com; frame-ancestors 'none';")

  return response
}

/**
 * Función principal del Middleware que se ejecuta "en el borde" (Edge) por cada petición.
 * 
 * Flujo de ejecución:
 * 1. Responde a peticiones pre-flight (OPTIONS) inyectando cabeceras CORS.
 * 2. Extrae y decodifica el token de sesión ('colsabi_token') desde las cookies del navegador.
 * 3. Comprueba el rol del usuario (si el token es válido).
 * 4. Intercepta rutas de administrador: Si no hay token o el rol no es 'ADMIN', rechaza con 401 o redirige a '/ingreso'.
 * 5. Intercepta rutas de asociado: Si no hay token o el rol no es 'ASOCIADO', rechaza o redirige.
 * 6. Si todo está correcto o la ruta es pública, deja pasar la solicitud añadiendo cabeceras de seguridad.
 * 
 * @param {Request} request - El objeto que contiene la información de la petición HTTP entrante.
 * @returns {NextResponse} La respuesta del servidor (redirección, error, o paso autorizado).
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin') || ''

  if (request.method === 'OPTIONS') {
    return applySecurityHeaders(new NextResponse(null, { status: 204 }), origin)
  }

  if (pathname.startsWith('/api')) {
    return applySecurityHeaders(NextResponse.next(), origin)
  }

  const token = request.cookies.get('colsabi_token')?.value
  let session = null

  if (token) {
    try {
      session = await verifyAccessToken(token)
    } catch {
      session = null
    }
  }

  // Redirigir a usuarios ya autenticados que intenten entrar a la página de login
  if (pathname === '/ingreso' && session) {
    if (session.role === 'ADMIN') {
      return applySecurityHeaders(NextResponse.redirect(new URL('/admin', request.url)), origin)
    } else if (session.role === 'ASOCIADO') {
      return applySecurityHeaders(NextResponse.redirect(new URL('/asociado', request.url)), origin)
    }
  }

  if (matchesPrefix(pathname, adminPrefixes)) {
    if (!session || session.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return applySecurityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin)
      }

      return applySecurityHeaders(NextResponse.redirect(new URL('/ingreso', request.url)), origin)
    }
  }

  if (matchesPrefix(pathname, asociadoPrefixes)) {
    if (!session || session.role !== 'ASOCIADO') {
      if (pathname.startsWith('/api/')) {
        return applySecurityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin)
      }

      return applySecurityHeaders(NextResponse.redirect(new URL('/ingreso', request.url)), origin)
    }
  }

  return applySecurityHeaders(NextResponse.next(), origin)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img|js).*)']
}
