import { NextResponse } from 'next/server'
import { getAllowedOrigins } from '../env'

export function resolveCorsHeaders(origin) {
  const allowedOrigins = getAllowedOrigins()
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin'
  }
}

export function withCors(data, init = {}, origin = '') {
  const headers = new Headers(init.headers || {})
  const corsHeaders = resolveCorsHeaders(origin)

  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value))

  return NextResponse.json(data, {
    ...init,
    headers
  })
}

export function corsPreflight(request) {
  return new NextResponse(null, {
    status: 204,
    headers: resolveCorsHeaders(request.headers.get('origin') || '')
  })
}
