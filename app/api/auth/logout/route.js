import { NextResponse } from 'next/server'
import { authCookieName } from '../../../../lib/security/cookies'

export async function POST() {
  const response = NextResponse.json({ message: 'Sesión cerrada correctamente' })
  
  // Eliminar la cookie de sesión
  response.cookies.delete(authCookieName)
  
  return response
}