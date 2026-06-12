import { getPrisma } from '../../../lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EscenariosPage() {
  const prisma = getPrisma()
  
  const escenarios = await prisma.practiceScenario.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { studentAssignments: true }
      }
    }
  })

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Gestión</span>
          <h1>Escenarios de Práctica</h1>
        </div>
      </header>

      <div className="workspace-grid" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <article className="workspace-panel">
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Listado de Escenarios</h2>
            <span>{escenarios.length} escenarios registrados</span>
          </div>

          {escenarios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-building" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
              <p>No hay escenarios registrados en el sistema.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Escenario</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Ciudad</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Capacidad</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Estudiantes</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Estado</th>
                    <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {escenarios.map((escenario) => (
                    <tr key={escenario.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                        {escenario.name}
                      </td>
                      <td style={{ padding: '1rem 0.5rem' }}>{escenario.city}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{escenario.capacity || 'N/A'}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <span style={{ 
                          background: escenario._count.studentAssignments > 0 ? '#dbeafe' : '#f1f5f9', 
                          color: escenario._count.studentAssignments > 0 ? '#1e40af' : '#64748b', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '999px', 
                          fontWeight: 'bold',
                          fontSize: '0.85rem'
                        }}>
                          {escenario._count.studentAssignments} asignados
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <span style={{ 
                          background: escenario.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2', 
                          color: escenario.status === 'ACTIVE' ? '#166534' : '#991b1b', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '999px', 
                          fontSize: '0.85rem' 
                        }}>
                          {escenario.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <Link 
                          href={`/admin/escenarios/${escenario.id}/estudiantes`} 
                          className="workspace-btn workspace-btn--ghost"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        >
                          Ver Estudiantes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </div>
    </>
  )
}