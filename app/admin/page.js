import Link from 'next/link'
import { getPrisma } from '../../lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const prisma = getPrisma()
  
  // Consultar datos reales de la base de datos
  const [pendientes, escenarios, asociados, horas] = await Promise.all([
    prisma.postulacionEscenario.count({ where: { status: 'PENDING' } }),
    prisma.escenarioPractica.count({ where: { status: 'ACTIVE' } }),
    prisma.usuario.count({ where: { role: 'ASOCIADO', status: 'ACTIVE' } }),
    // En un futuro sumaremos las horas, por ahora dejamos un placeholder 0
    prisma.registroHoraSocial ? prisma.registroHoraSocial.count() : 0 
  ])

  const summaryCards = [
    { label: 'Postulaciones pendientes', value: pendientes.toString(), accent: 'blue', href: '/admin/postulaciones' },
    { label: 'Escenarios activos', value: escenarios.toString(), accent: 'green', href: '/admin/escenarios' },
    { label: 'Asociados habilitados', value: asociados.toString(), accent: 'yellow', href: '/admin' },
    { label: 'Horas auditadas', value: horas.toString(), accent: 'blue', href: '/admin' }
  ]

  const pipeline = [
    'Recepción de postulaciones de escenarios',
    'Validación y aprobación por administrador',
    'Creación automática de usuario asociado',
    'Asignación de estudiantes al escenario',
    'Auditoría de horas y seguimiento'
  ]

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Administrador único</span>
          <h1>Control central del sistema</h1>
        </div>
      </header>
      <div className="workspace-grid workspace-grid--cards">
        {summaryCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: 'none', display: 'block' }}>
            <article className={`workspace-card workspace-card--${card.accent}`} style={{ height: '100%', cursor: 'pointer' }}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          </Link>
        ))}
      </div>
      <div className="workspace-grid workspace-grid--main">
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Pipeline operativo</h2>
            <span>MVP inicial</span>
          </div>
          <ol className="workspace-timeline">
            {pipeline.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Base técnica</h2>
            <span>Seguridad y escalabilidad</span>
          </div>
          <ul className="workspace-checks">
            <li>Middleware para rutas protegidas</li>
            <li>JWT para sesiones seguras</li>
            <li>CORS parametrizable</li>
            <li>Modelo Prisma optimizado para Supabase</li>
            <li>Bitácora de auditoría y registros por estudiante</li>
          </ul>
        </article>
      </div>
    </>
  )
}
