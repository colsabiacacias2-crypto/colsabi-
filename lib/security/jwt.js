import { SignJWT, jwtVerify } from 'jose'
import { env } from '../env'

const secret = new TextEncoder().encode(env.JWT_SECRET || 'colsabi-dev-secret-change-me-immediately')
const refreshSecret = new TextEncoder().encode((env.JWT_SECRET || 'colsabi-dev-secret') + '-refresh')

export async function signAccessToken(payload, expiresIn = '15m') {
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

export async function signRefreshToken(payload, expiresIn = '7d') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(refreshSecret)
}

export async function verifyRefreshToken(token) {
  const { payload } = await jwtVerify(token, refreshSecret)
  return payload
}
