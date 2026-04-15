import Link from 'next/link'

export default function PostularEscenarioPage() {
  return (
    <main className="workspace-page workspace-page--public">
      <section className="workspace-public-hero">
        <div className="container workspace-public-hero__wrap">
          <div>
            <span className="workspace-topbar__eyebrow">Nuevo apartado público</span>
            <h1>Postulación de escenarios de práctica</h1>
            <p>
              Las instituciones o responsables podrán postular espacios de práctica para horas sociales.
              Cada solicitud será revisada por administración antes de activar el escenario y crear el
              acceso del asociado.
            </p>
          </div>
          <Link href="/ingreso" className="workspace-btn workspace-btn--ghost">Ingreso administrativo</Link>
        </div>
      </section>
      <section className="container workspace-public-grid">
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Formulario inicial</h2>
            <span>MVP</span>
          </div>
          <form className="workspace-form">
            <div className="workspace-form__grid">
              <label>
                <span>Nombre de la institución</span>
                <input type="text" placeholder="Ej. Fundación Social Acacías" />
              </label>
              <label>
                <span>Responsable del escenario</span>
                <input type="text" placeholder="Nombre completo" />
              </label>
              <label>
                <span>Correo electrónico</span>
                <input type="email" placeholder="correo@dominio.com" />
              </label>
              <label>
                <span>Teléfono</span>
                <input type="text" placeholder="300 000 0000" />
              </label>
              <label>
                <span>Ciudad</span>
                <input type="text" placeholder="Acacías" />
              </label>
              <label>
                <span>Cupos estimados</span>
                <input type="number" placeholder="10" />
              </label>
            </div>
            <label>
              <span>Descripción del escenario</span>
              <textarea rows="6" placeholder="Describe las actividades, horario y alcance del escenario"></textarea>
            </label>
            <button type="button" className="workspace-btn workspace-btn--primary">Guardar diseño inicial</button>
          </form>
        </article>
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Flujo de aprobación</h2>
            <span>Automatización</span>
          </div>
          <ol className="workspace-timeline">
            <li>La entidad postula el escenario</li>
            <li>Administración recibe y valida la información</li>
            <li>Si es aprobado, se activa el escenario</li>
            <li>Se crea automáticamente el usuario asociado</li>
            <li>El asociado audita estudiantes y horas</li>
          </ol>
        </article>
      </section>
    </main>
  )
}
