import { getPrisma } from '../../../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EstudiantesEscenarioPage({ params }) {
  const { id } = await params;
  const prisma = getPrisma()
  
  // Buscar el escenario
  const scenario = await prisma.practiceScenario.findUnique({
    where: { id }
  })

  if (!scenario) {
    notFound()
  }

  // Buscar los estudiantes asignados
  const assignments = await prisma.studentScenarioAssignment.findMany({
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

      <div className="workspace-grid" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <article className="workspace-panel">
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Estudiantes Asignados</h2>
            <span>{assignments.length} estudiantes {scenario.capacity ? `de ${scenario.capacity} cupos` : ''}</span>
          </div>

          {assignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-users-slash" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
              <p>No hay estudiantes asignados a este escenario todavía.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Estudiante</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Código / Grado</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Horas Acumuladas</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Progreso</th>
                    <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => {
                    const student = assignment.student
                    const progress = Math.min(100, Math.round((assignment.approvedHours / assignment.requiredHours) * 100))
                    
                    return (
                      <tr key={assignment.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--primary-600)' }}>{student.fullName}</div>
                          {student.email && <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{student.email}</div>}
                        </td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <div>{student.studentCode}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Grado {student.grade} {student.section && ` - ${student.section}`}</div>
                        </td>
                        <td style={{ padding: '1rem 0.5rem', fontWeight: 'bold' }}>
                          {assignment.approvedHours} / {assignment.requiredHours} hrs
                        </td>
                        <td style={{ padding: '1rem 0.5rem', minWidth: '150px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ flex: 1, background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ 
                                background: progress >= 100 ? '#10b981' : 'var(--primary)', 
                                height: '100%', 
                                width: `${progress}%`,
                                borderRadius: '4px'
                              }}></div>
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: progress >= 100 ? '#10b981' : 'var(--muted)', minWidth: '40px' }}>
                              {progress}%
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                          <button className="workspace-btn workspace-btn--ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </div>
    </>
  )
}