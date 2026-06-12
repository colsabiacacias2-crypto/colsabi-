'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentManager({ scenario, initialAssignments }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Form State
  const [fullName, setFullName] = useState('')
  const [grade, setGrade] = useState('')

  const occupiedSlots = initialAssignments.length
  const totalSlots = scenario.capacity || 0
  const isFull = totalSlots > 0 && occupiedSlots >= totalSlots

  const handleAssign = async (e) => {
    e.preventDefault()
    if (!fullName || !grade) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/scenarios/${scenario.id}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, grade, requiredHours: 80 })
      })
      
      const data = await res.json()

      if (res.ok) {
        setFullName('')
        setGrade('')
        router.refresh()
      } else {
        setError(data.error || 'Error al asignar estudiante')
        alert(data.error || 'Error al asignar estudiante')
      }
    } catch (err) {
      setError('Error de red al procesar la solicitud')
      alert('Error de red al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (studentId, studentName) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la asignación de ${studentName}?\n\nEsta acción removerá al estudiante de este escenario.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/scenarios/${scenario.id}/students/${studentId}`, {
        method: 'DELETE'
      })
      
      const data = await res.json()

      if (res.ok) {
        router.refresh()
      } else {
        alert(data.error || 'Error al eliminar la asignación')
      }
    } catch (err) {
      alert('Error de red al intentar eliminar')
    }
  }

  return (
    <>
      <div className="workspace-grid" style={{ gridTemplateColumns: '1fr', marginTop: '2rem', gap: '2rem' }}>
        
        {/* Asignación Rápida */}
        <article className="workspace-panel">
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Asignación Rápida</h2>
              <span>Registra y asigna un nuevo estudiante</span>
            </div>
            {totalSlots > 0 && (
              <div style={{
                background: isFull ? '#fee2e2' : '#dcfce7',
                color: isFull ? '#991b1b' : '#166534',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                Cupos Ocupados: {occupiedSlots} / {totalSlots}
              </div>
            )}
          </div>

          <form onSubmit={handleAssign} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--muted)', fontSize: '0.9rem' }}>Nombre Completo</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                required
                disabled={loading || isFull}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
              />
            </div>
            <div style={{ flex: '1', minWidth: '150px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--muted)', fontSize: '0.9rem' }}>Grado</label>
              <input 
                type="text" 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Ej. 10A"
                required
                disabled={loading || isFull}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
              />
            </div>
            <div>
              <button 
                type="submit" 
                disabled={loading || isFull}
                className="workspace-btn workspace-btn--primary" 
                style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', opacity: isFull ? 0.5 : 1 }}
              >
                {loading ? 'Asignando...' : 'Asignar'}
              </button>
            </div>
          </form>
          {error && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          {isFull && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>No se pueden asignar más estudiantes. Capacidad máxima alcanzada.</p>}
        </article>

        {/* Tabla de Estudiantes */}
        <article className="workspace-panel">
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Estudiantes Asignados</h2>
            <span>{occupiedSlots} estudiante(s) en este escenario</span>
          </div>

          {initialAssignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-users-slash" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
              <p>No hay estudiantes asignados a este escenario todavía.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Nombre</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Grado</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Horas Acumuladas</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Progreso</th>
                    <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {initialAssignments.map((assignment) => {
                    const student = assignment.student
                    const progress = Math.min(100, Math.round((assignment.approvedHours / assignment.requiredHours) * 100))
                    
                    return (
                      <tr key={assignment.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--primary-600)' }}>{student.fullName}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{student.studentCode}</div>
                        </td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          Grado {student.grade}
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
                          <button 
                            onClick={() => handleDelete(student.id, student.fullName)}
                            className="workspace-btn" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', cursor: 'pointer' }}
                            title="Eliminar asignación"
                          >
                            <i className="fa-solid fa-trash"></i>
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