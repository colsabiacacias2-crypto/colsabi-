'use client'
import { useState, useEffect } from 'react'

export default function EvaluacionHorasPage() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Register Form State
  const [workDate, setWorkDate] = useState('')
  const [hours, setHours] = useState('')
  const [activityTitle, setActivityTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // History State
  const [historyItems, setHistoryItems] = useState([])
  const [historySummary, setHistorySummary] = useState(null)
  const [historyLoading, setHistoryLoading] = useState(false)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/asociado/students')
      const data = await res.json()
      if (res.ok) {
        setAssignments(data.items || [])
      } else {
        setError(data.error || 'Error al cargar estudiantes')
      }
    } catch (err) {
      setError('Error de red')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Abrir Modal de Registro
  const openRegisterModal = (assignment) => {
    setSelectedAssignment(assignment)
    setWorkDate(new Date().toISOString().split('T')[0])
    setHours('')
    setActivityTitle('')
    setDescription('')
    setIsRegisterModalOpen(true)
  }

  // Abrir Modal de Historial
  const openHistoryModal = async (assignment) => {
    setSelectedAssignment(assignment)
    setIsHistoryModalOpen(true)
    setHistoryLoading(true)
    try {
      const res = await fetch(`/api/asociado/hours/${assignment.student.id}`)
      const data = await res.json()
      if (res.ok) {
        setHistoryItems(data.items || [])
        setHistorySummary(data.summary || null)
      } else {
        alert(data.error || 'Error al cargar historial')
        setIsHistoryModalOpen(false)
      }
    } catch (err) {
      alert('Error de red')
      setIsHistoryModalOpen(false)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleRegisterHours = async (e) => {
    e.preventDefault()
    if (hours > 24) {
      alert('No puedes registrar más de 24 horas en un solo día.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/asociado/hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedAssignment.student.id,
          workDate: new Date(workDate).toISOString(),
          hours: Number(hours),
          activityTitle,
          description
        })
      })
      const data = await res.json()
      if (res.ok) {
        alert('¡Horas registradas con éxito!')
        setIsRegisterModalOpen(false)
        fetchStudents() // Refrescar la tabla
      } else {
        alert(data.error || 'Error al registrar horas')
      }
    } catch (err) {
      alert('Error de red al procesar la solicitud')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Gestión Operativa</span>
          <h1>Estudiantes Asignados</h1>
        </div>
      </header>

      <div className="workspace-grid workspace-grid--main" style={{ marginTop: '2rem' }}>
        <article className="workspace-panel" style={{ gridColumn: '1 / -1' }}>
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Lista de Estudiantes</h2>
            <span>Registra el día a día de sus horas sociales</span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}></i>
              <p>Cargando estudiantes...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
              <p>{error}</p>
            </div>
          ) : assignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-users-slash" style={{ fontSize: '3rem', opacity: 0.5, marginBottom: '1rem' }}></i>
              <p>Aún no hay estudiantes asignados a tu escenario.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Estudiante</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Progreso de Horas</th>
                    <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map(assignment => {
                    const progress = Math.min(100, Math.round((assignment.approvedHours / assignment.requiredHours) * 100))
                    
                    return (
                      <tr key={assignment.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '1.5rem 0.5rem' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--primary-600)', fontSize: '1.1rem' }}>{assignment.student.fullName}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                            Código: {assignment.student.studentCode} | Grado: {assignment.student.grade}
                          </div>
                        </td>
                        <td style={{ padding: '1.5rem 0.5rem', minWidth: '200px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.4rem' }}>
                            {assignment.approvedHours} / {assignment.requiredHours} hrs
                          </div>
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
                        <td style={{ padding: '1.5rem 0.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button 
                              onClick={() => openHistoryModal(assignment)}
                              className="workspace-btn workspace-btn--ghost" 
                              style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                            >
                              <i className="fa-solid fa-clock-rotate-left" style={{ marginRight: '0.4rem' }}></i> Ver Historial
                            </button>
                            <button 
                              onClick={() => openRegisterModal(assignment)}
                              className="workspace-btn workspace-btn--primary" 
                              style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                            >
                              <i className="fa-solid fa-plus" style={{ marginRight: '0.4rem' }}></i> Registrar Horas
                            </button>
                          </div>
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

      {/* Modal para Registrar Horas */}
      {isRegisterModalOpen && selectedAssignment && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: 'var(--primary-600)' }}>Registrar Horas</h2>
              <button onClick={() => setIsRegisterModalOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--muted)' }}>&times;</button>
            </div>
            
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
              Estudiante: <strong>{selectedAssignment.student.fullName}</strong>
            </p>

            <form onSubmit={handleRegisterHours} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Fecha</label>
                  <input 
                    type="date" 
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    required
                    disabled={submitting}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Cantidad de horas</label>
                  <input 
                    type="number" 
                    step="0.5"
                    max="24"
                    min="0.5"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                    disabled={submitting}
                    placeholder="Ej. 4"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Actividad (Título corto)</label>
                <input 
                  type="text" 
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  required
                  disabled={submitting}
                  placeholder="Ej. Organización de archivo"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Descripción detallada</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={submitting}
                  rows="3"
                  placeholder="Describe brevemente lo que hizo el estudiante..."
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', resize: 'vertical' }}
                ></textarea>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="workspace-btn workspace-btn--ghost" disabled={submitting}>
                  Cancelar
                </button>
                <button type="submit" className="workspace-btn workspace-btn--primary" disabled={submitting}>
                  {submitting ? 'Guardando...' : 'Guardar Registro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Historial */}
      {isHistoryModalOpen && selectedAssignment && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: 'var(--primary-600)' }}>Historial de Actividades</h2>
              <button onClick={() => setIsHistoryModalOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--muted)' }}>&times;</button>
            </div>

            <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem', display: 'block' }}>{selectedAssignment.student.fullName}</strong>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Código: {selectedAssignment.student.studentCode}</span>
                </div>
                {historySummary && (
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--primary)', display: 'block' }}>
                      {historySummary.approvedHours} / {historySummary.requiredHours} hrs
                    </strong>
                    <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 'bold' }}>Horas Aprobadas</span>
                  </div>
                )}
              </div>
            </div>

            {historyLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                <p>Cargando historial...</p>
              </div>
            ) : historyItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
                <p>No hay registros de horas para este estudiante.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {historyItems.map(item => (
                  <div key={item.id} style={{ borderLeft: '4px solid var(--primary)', padding: '1rem 1.5rem', background: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--text)' }}>{item.activityTitle}</span>
                      <span style={{ fontWeight: '900', color: 'var(--primary-600)' }}>+{item.hours} hrs</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: 'var(--muted)' }}>{item.description}</p>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <i className="fa-regular fa-calendar"></i>
                      {new Date(item.workDate).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
