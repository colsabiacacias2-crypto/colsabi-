const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando el seeding de la base de datos...')

  // Verificar si ya existe un admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  })

  if (existingAdmin) {
    console.log('Ya existe un usuario administrador. Saltando creación.')
    return
  }

  // Encriptar la contraseña
  // TODO: Puedes cambiar esta contraseña por una más segura o usar una variable de entorno
  const plainPassword = process.env.ADMIN_PASSWORD || 'Admin123!'
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds)

  // Crear el usuario administrador único
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@colsabi.edu.co', // Cambia este correo según necesites
      fullName: 'Administrador Principal',
      passwordHash: passwordHash,
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
