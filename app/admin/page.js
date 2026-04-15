import Link from 'next/link'

const summaryCards = [
  { label: 'Postulaciones pendientes', value: '12', accent: 'blue' },
  { label: 'Escenarios activos', value: '08', accent: 'green' },
  { label: 'Asociados habilitados', value: '08', accent: 'yellow' },
  { label: 'Horas auditadas', value: '1.240', accent: 'blue' }
]

const pipeline = [
  'Recepción de postulaciones de escenarios',
  'Validación y aprobación por administrador',
  'Creación automática de usuario asociado',
  'Asignación de estudiantes al escenario',
  'Auditoría de horas y seguimiento'
]

export default function AdminPage() {
  return (
    <main className="workspace-page">
      <section className="workspace-shell">
        <aside className="workspace-sidebar">
          <div className="workspace-brand">
            <img src="/img/aaa/logo.png" alt="Logo COLSABI" />
            <div>
              <strong>COLSABI Admin</strong>
              <span>Horas sociales</span>
            </div>
          </div>
          <nav className="workspace-nav">
            <Link href="/admin" className="active">Dashboard</Link>
            <Link href="/postular-escenario">Postulaciones públicas</Link>
            <Link href="/ingreso">Centro de acceso</Link>
          </nav>
        </aside>
        <section className="workspace-main">
          <header className="workspace-topbar">
            <div>
              <span className="workspace-topbar__eyebrow">Administrador único</span>
              <h1>Control central del sistema</h1>
            </div>
            <Link href="/" className="workspace-btn workspace-btn--ghost">Volver al sitio</Link>
          </header>
          <div className="workspace-grid workspace-grid--cards">
            {summaryCards.map((card) => (
              <article key={card.label} className={`workspace-card workspace-card--${card.accent}`}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
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
        </section>
      </section>
    </main>
  )
}
