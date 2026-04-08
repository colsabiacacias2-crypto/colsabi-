import { env } from '../env'

const store = globalThis.__rateLimitStore || new Map()

if (!globalThis.__rateLimitStore) {
  globalThis.__rateLimitStore = store
}

export function sanitizeText(value = '') {
  return String(value).replace(/[<>]/g, '').trim()
}

export function sanitizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => sanitizePayload(item))
  }

  if (payload && typeof payload === 'object') {
    return Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, sanitizePayload(value)]))
  }

  if (typeof payload === 'string') {
    return sanitizeText(payload)
  }

  return payload
}

export function getClientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export function assertJsonRequest(request) {
  const contentType = request.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error('Invalid content type')
  }
}

export function enforceRateLimit(key) {
  const now = Date.now()
  const windowStart = now - env.RATE_LIMIT_WINDOW_MS
  const current = store.get(key) || []
  const recent = current.filter((value) => value > windowStart)

  if (recent.length >= env.RATE_LIMIT_MAX_REQUESTS) {
    throw new Error('Too many requests')
  }

  recent.push(now)
  store.set(key, recent)
}
