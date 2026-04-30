'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function PostularEscenarioPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    city: '',
    capacity: '',
    description: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/public/scenario-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.details) {
          const firstError = Object.values(data.details)[0][0]
          throw new Error(firstError || 'Error al validar los datos')
        }
        throw new Error(data.error || 'Ocurrió un error al enviar la postulación')
      }

      setSuccess(true)
      setFormData({
        organizationName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        city: '',
        capacity: '',
        description: ''
      })
      
      // Auto-ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="workspace-page workspace-page--public">
      <section className="workspace-public-hero">
        <div className="container workspace-public-hero__wrap">
          <div>
            <span className="workspace-topbar__eyebrow">Formulario de Convenio</span>
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
            <h2>Datos de la Institución</h2>
            <span>Requerido</span>
          </div>
          
          {success && (
            <div style={{ background: '#dcfce7', color: '#065f46', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-circle-check"></i>
              <span>¡Postulación enviada con éxito! El administrador la revisará pronto.</span>
            </div>
          )}

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          <form className="workspace-form" onSubmit={handleSubmit}>
            <div className="workspace-form__grid">
              <label>
                <span>Nombre de la institución</span>
                <input required type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Ej. Fundación Social Acacías" />
              </label>
              <label>
                <span>Responsable del escenario</span>
                <input required type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Nombre completo" />
              </label>
              <label>
                <span>Correo electrónico</span>
                <input required type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="correo@dominio.com" />
              </label>
              <label>
                <span>Teléfono</span>
                <input required type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="300 000 0000" />
              </label>
              <label>
                <span>Ciudad</span>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Acacías" />
              </label>
              <label>
                <span>Cupos estimados</span>
                <input required type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="10" />
              </label>
            </div>
            <label>
              <span>Descripción del escenario</span>
              <textarea required rows="6" name="description" value={formData.description} onChange={handleChange} placeholder="Describe las actividades, horario y alcance del escenario"></textarea>
            </label>
            
            <button 
              type="submit" 
              className="workspace-btn workspace-btn--primary"
              disabled={loading}
              style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Enviando postulación...</>
              ) : (
                <><i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }}></i> Enviar postulación</>
              )}
            </button>
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