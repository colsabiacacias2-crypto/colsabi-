export default function IngresoPage() {
  return (
    <main className="workspace-auth">
      <section className="workspace-auth__panel">
        <div className="workspace-auth__content">
          <span className="workspace-auth__eyebrow">Acceso seguro</span>
          <h1>Plataforma de horas sociales</h1>
          <p>
            Accede al módulo administrativo para revisar postulaciones, aprobar escenarios de práctica y
            auditar el cumplimiento de horas sociales.
          </p>
          <div className="workspace-auth__actions">
            <a href="/admin" className="workspace-btn workspace-btn--primary">Ingreso administrador</a>
            <a href="/asociado" className="workspace-btn workspace-btn--ghost">Ingreso asociado</a>
          </div>
        </div>
        <div className="workspace-auth__card">
          <div className="workspace-stat">
            <strong>Arquitectura</strong>
            <span>Next.js + Prisma + Supabase</span>
          </div>
          <div className="workspace-stat">
            <strong>Seguridad</strong>
            <span>JWT, middleware, CORS y filtros</span>
          </div>
          <div className="workspace-stat">
            <strong>Operación</strong>
            <span>Admin y asociados con vistas separadas</span>
          </div>
        </div>
      </section>
    </main>
  )
}
