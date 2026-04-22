/**
 * @fileoverview Conexión y Gestión Centralizada de la Base de Datos (Prisma ORM)
 * 
 * Este archivo actúa como el núcleo de persistencia de datos de toda la plataforma COLSABI. 
 * Implementa un patrón de diseño conocido como "Singleton" para garantizar que la aplicación
 * no sature la base de datos (Supabase) abriendo múltiples conexiones simultáneas, un problema 
 * muy común y crítico en arquitecturas Serverless como Next.js.
 * 
 * Al utilizar este archivo, cualquier parte del sistema (API routes, Server Actions) puede 
 * solicitar acceso a la base de datos con la tranquilidad de que se está utilizando una conexión 
 * optimizada, validada y segura. Además, inyecta registros de logs según el entorno (Desarrollo/Producción).
 */

import { PrismaClient } from '@prisma/client'
import { env } from './env'

const globalForPrisma = globalThis

/**
 * Instancia un nuevo cliente de Prisma ORM tras validar las credenciales.
 * Verifica rigurosamente que exista una URL de conexión en las variables de entorno.
 * Si falta, bloquea la ejecución para prevenir errores silenciosos y fugas de datos.
 * 
 * @returns {PrismaClient} Una nueva instancia configurada del cliente Prisma conectada a PostgreSQL.
 */
function createPrismaClient() {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to use Prisma')
  }

  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  })
}

/**
 * Obtiene la instancia única global del cliente de Prisma (Singleton).
 * Si no existe una conexión activa en la memoria global de Node.js, llama a createPrismaClient() 
 * para crearla. Si ya existe, retorna la conexión actual, reciclando eficientemente los recursos
 * y evitando sobrecargar el "Pooler" de Supabase.
 * 
 * @returns {PrismaClient} La instancia activa de la base de datos para ejecutar consultas.
 */
export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }

  return globalForPrisma.prisma
}

/**
 * Valida rápidamente si el sistema tiene configurada una cadena de conexión a la base de datos.
 * Esta función es muy útil para hacer verificaciones tempranas de salud (Health Checks) 
 * durante el arranque de la aplicación o antes de montar interfaces críticas.
 * 
 * @returns {boolean} Verdadero si la variable de entorno DATABASE_URL está presente.
 */
export function hasDatabase() {
  return Boolean(env.DATABASE_URL)
}
