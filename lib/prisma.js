import { PrismaClient } from '@prisma/client'
import { env } from './env'

const globalForPrisma = globalThis

function createPrismaClient() {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to use Prisma')
  }

  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  })
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }

  return globalForPrisma.prisma
}
