import { getPrisma } from '../../../lib/prisma'
import DecisionButtons from './DecisionButtons'

export const dynamic = 'force-dynamic'

export default async function PostulacionesPage() {
  const prisma = getPrisma()
  
  // Buscar todas las postulaciones en estado PENDING ordenadas por la más reciente
  const postulaciones = await prisma.scenarioApplication.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Gestión</span>
          <h1>Postulaciones de escenarios</h1>
        </div>
      </header>

      <div className="workspace-grid" style={{ gridTemplateColumns: '1fr', marginTop: '2rem' }}>
        <article className="workspace-panel">
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Solicitudes Pendientes</h2>
            <span>{postulaciones.length} en espera de revisión</span>
          </div>

          {postulaciones.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
              <p>No hay postulaciones pendientes por revisar en este momento.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {postulaciones.map((app) => (
                <div key={app.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    
                    {/* Información de la organización */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-600)' }}>{app.organizationName}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--muted)' }}>
                        <div><strong>Contacto:</strong> {app.contactName}</div>
                        <div><strong>Email:</strong> {app.contactEmail}</div>
                        <div><strong>Teléfono:</strong> {app.contactPhone}</div>
                        <div><strong>Ubicación:</strong> {app.city} {app.address && `- ${app.address}`}</div>
                        <div><strong>Capacidad:</strong> {app.capacity || 'No especificada'} estudiantes</div>
                        <div><strong>Fecha:</strong> {new Date(app.createdAt).toLocaleDateString('es-CO')}</div>
                      </div>
                      
                      <div style={{ marginTop: '1rem', background: 'var(--bg-alt)', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                        <strong>Descripción de actividades:</strong>
                        <p style={{ margin: '0.5rem 0 0 0' }}>{app.description}</p>
                      </div>
                    </div>

                    {/* Botones de acción interactivos (Cliente) */}
                    <div style={{ minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <DecisionButtons applicationId={app.id} organizationName={app.organizationName} />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </>
  )
}