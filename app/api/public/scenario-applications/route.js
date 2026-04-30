import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../lib/prisma'
import { z } from 'zod'

// Esquema de validación para los datos entrantes
const applicationSchema = z.object({
  organizationName: z.string().min(3, "El nombre de la institución es muy corto"),
  contactName: z.string().min(3, "El nombre del responsable es muy corto"),
  contactEmail: z.string().email("Correo electrónico inválido"),
  contactPhone: z.string().min(7, "El teléfono no es válido"),
  city: z.string().min(3, "La ciudad es muy corta"),
  capacity: z.coerce.number().int().min(1, "Debe haber al menos 1 cupo").optional().default(10),
  description: z.string().min(20, "La descripción debe ser más detallada")
})

export async function POST(req) {
  try {
    const body = await req.json()
    
    // 1. Validar los datos con Zod
    const result = applicationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // 2. Conectar a la base de datos y guardar la postulación
    const prisma = getPrisma()
    
    const newApplication = await prisma.scenarioApplication.create({
      data: {
        organizationName: data.organizationName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        city: data.city,
        capacity: data.capacity,
        description: data.description,
        status: 'PENDING'
      }
    })

    // 3. Devolver respuesta exitosa
    return NextResponse.json(
      { message: 'Postulación enviada con éxito', id: newApplication.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error al guardar la postulación:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la solicitud' },
      { status: 500 }
    )
  }
}