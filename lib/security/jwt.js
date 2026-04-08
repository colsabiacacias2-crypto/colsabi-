import { SignJWT, jwtVerify } from 'jose'
import { env } from '../env'

const secret = new TextEncoder().encode(env.JWT_SECRET || 'colsabi-dev-secret-change-me-immediately')

export async function signAccessToken(payload, expiresIn = '8h') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
}

export async function verifyAccessToken(token) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}
