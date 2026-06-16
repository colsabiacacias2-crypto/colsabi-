import { getPrisma } from '../../../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StudentManager from './StudentManager'

export const dynamic = 'force-dynamic'

export default async function EstudiantesEscenarioPage({ params }) {
  const { id } = await params;
  const prisma = getPrisma()
  
  // Buscar el escenario
  const scenario = await prisma.escenarioPractica.findUnique({
    where: { id }
  })

  if (!scenario) {
    notFound()
  }

  // Buscar los estudiantes asignados
  const assignments = await prisma.asignacionEstudianteEscenario.findMany({
    where: { scenarioId: id },
    orderBy: { assignedAt: 'desc' },
    include: {
      student: {
        select: {
          id: true,
          studentCode: true,
          fullName: true,
          grade: true,
          section: true,
          email: true,
        }
      }
    }
  })

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">
            <Link href="/admin/escenarios" style={{ color: 'inherit', textDecoration: 'none', marginRight: '0.5rem' }}>&larr; Volver</Link>
            Detalle del Escenario
          </span>
          <h1>{scenario.name}</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            {scenario.city} {scenario.address && `- ${scenario.address}`}
          </p>
        </div>
      </header>

      <StudentManager scenario={scenario} initialAssignments={assignments} />
    </>
  )
}