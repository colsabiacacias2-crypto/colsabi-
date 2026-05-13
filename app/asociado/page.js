import Link from 'next/link'

const associatedStats = [
  { label: 'Escenario asignado', value: '01' },
  { label: 'Estudiantes activos', value: '24' },
  { label: 'Horas pendientes', value: '38' },
  { label: 'Horas aprobadas', value: '412' }
]

export default function AsociadoPage() {
  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Asociado</span>
          <h1>Auditoría y seguimiento del escenario</h1>
        </div>
      </header>
      <div className="workspace-grid workspace-grid--cards">
        {associatedStats.map((card) => (
          <article key={card.label} className="workspace-card workspace-card--neutral">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>
      <div className="workspace-grid workspace-grid--main">
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Tareas prioritarias</h2>
            <span>Operación diaria</span>
          </div>
          <ul className="workspace-checks">
            <li>Revisar evidencias pendientes</li>
            <li>Aprobar o rechazar registros de horas</li>
            <li>Registrar observaciones por estudiante</li>
            <li>Monitorear avance frente a horas requeridas</li>
          </ul>
        </article>
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Seguridad operativa</h2>
            <span>Buenas prácticas</span>
          </div>
          <ul className="workspace-checks">
            <li>Acceso limitado al escenario asignado</li>
            <li>Bitácora de cambios y revisiones</li>
            <li>Sesiones protegidas con token JWT</li>
            <li>Endpoints validados y filtrados</li>
          </ul>
        </article>
      </div>
    </>
  )
}
