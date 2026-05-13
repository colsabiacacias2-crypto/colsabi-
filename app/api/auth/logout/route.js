import { NextResponse } from 'next/server'
import { authCookieName, refreshCookieName } from '../../../../lib/security/cookies'

export async function POST() {
  const response = NextResponse.json({ message: 'Sesión cerrada correctamente' })
  
  // Eliminar la cookie de sesión principal
  response.cookies.delete(authCookieName)
  
  // Eliminar la cookie de renovación (Refresh Token)
  response.cookies.delete(refreshCookieName)
  
  return response
}