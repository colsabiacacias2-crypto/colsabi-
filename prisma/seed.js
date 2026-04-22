/**
 * @fileoverview Script de Semilla (Seed) para la Base de Datos
 * 
 * Este archivo se encarga de inyectar datos iniciales críticos en la base de datos recién creada.
 * Su función principal y más importante es crear el "Usuario Administrador Único" del sistema.
 * 
 * Flujo de ejecución:
 * 1. Conecta con la base de datos usando Prisma.
 * 2. Verifica si ya existe algún usuario con el rol 'ADMIN'. Si existe, detiene el proceso
 *    para no crear duplicados accidentalmente.
 * 3. Si no existe, lee la contraseña desde las variables de entorno (.env) o usa una por defecto.
 * 4. Aplica un proceso de HASHING (encriptación) a la contraseña usando bcryptjs.
 * 5. Guarda el usuario en la base de datos de Supabase con la contraseña ya encriptada.
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando el seeding de la base de datos...')

  // Verificar si ya existe un admin en la tabla de usuarios
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  })

  if (existingAdmin) {
    console.log('Ya existe un usuario administrador. Saltando creación.')
    return
  }

  /**
   * SECCIÓN CRÍTICA: Encriptación de la contraseña del Administrador.
   * 
   * Nunca se guarda la contraseña en texto plano en la base de datos.
   * Aquí utilizamos bcryptjs para generar un "hash" seguro.
   * 
   * @param {string} plainPassword - La contraseña legible que el admin usará para entrar.
   * @param {number} saltRounds - El "costo" del algoritmo. 10 es el estándar de la industria.
   *                              Hace que la encriptación sea lo suficientemente lenta para
   *                              evitar ataques de fuerza bruta.
   */
  const plainPassword = process.env.ADMIN_PASSWORD || 'Admin123!'
  const saltRounds = 10
  
  // bcrypt.hash toma la contraseña y el costo, y devuelve una cadena ilegible y segura
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds)

  // Crear el usuario administrador único e insertarlo en Supabase
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@colsabi.edu.co', // El correo con el que se inicia sesión
      fullName: 'Administrador Principal',
      passwordHash: passwordHash, // Guardamos la versión ENCRIPTADA, nunca la original
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })

  console.log('✅ Usuario administrador creado con éxito:', adminUser.email)
}

main()
  .catch((e) => {
    console.error('Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
