'use client'
import { useState } from 'react'

// Datos simulados para demostrar la funcionalidad del módulo de evaluación
const initialHourEntries = [
  {
    id: 'entry-1',
    studentName: 'Ana María López',
    grade: '10A',
    date: '12/05/2026',
    activity: 'Apoyo en biblioteca escolar',
    hours: 4.5,
    status: 'PENDING'
  },
  {
    id: 'entry-2',
    studentName: 'Carlos Ruiz',
    grade: '11B',
    date: '13/05/2026',
    activity: 'Organización de archivo pastoral',
    hours: 3.0,
    status: 'PENDING'
  },
  {
    id: 'entry-3',
    studentName: 'Valentina Soto',
    grade: '10C',
    date: '10/05/2026',
    activity: 'Asistencia en evento deportivo',
    hours: 5.0,
    status: 'APPROVED'
  }
]

export default function EvaluacionHorasPage() {
  const [entries, setEntries] = useState(initialHourEntries)

  const handleDecision = (id, decision) => {
    setEntries(currentEntries => 
      currentEntries.map(entry => 
        entry.id === id ? { ...entry, status: decision } : entry
      )
    )
  }

  const pendingEntries = entries.filter(e => e.status === 'PENDING')
  const historyEntries = entries.filter(e => e.status !== 'PENDING')

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Evaluación</span>
          <h1>Registro y Control de Horas</h1>
        </div>
      </header>

      <div className="workspace-grid workspace-grid--main">
        {/* Sección de Solicitudes Pendientes */}
        <article className="workspace-panel" style={{ gridColumn: '1 / -1' }}>
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Horas Pendientes de Aprobación</h2>
            <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {pendingEntries.length} solicitudes
            </span>
          </div>

          {pendingEntries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              <i className="fa-solid fa-check-circle" style={{ fontSize: '3rem', color: 'var(--success)', opacity: 0.5, marginBottom: '1rem' }}></i>
              <p>No hay registros pendientes por evaluar.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {pendingEntries.map(entry => (
                <div key={entry.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', flexWrap: 'wrap', gap: '1rem' }}>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--surface-blue)', color: 'var(--primary)', display: 'grid', placeItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {entry.studentName.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text)' }}>{entry.studentName}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Grado: {entry.grade} | Fecha: {entry.date}</span>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.95rem' }}><strong>Actividad:</strong> {entry.activity}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-600)', lineHeight: '1' }}>{entry.hours}</span>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Horas</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleDecision(entry.id, 'APPROVED')}
                        className="btn btn--success btn--sm" 
                        style={{ padding: '0.6rem 1.2rem' }}
                      >
                        <i className="fa-solid fa-check"></i> Aprobar
                      </button>
                      <button 
                        onClick={() => handleDecision(entry.id, 'REJECTED')}
                        className="btn btn--outline btn--sm" 
                        style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.6rem 1.2rem' }}
                      >
                        <i className="fa-solid fa-xmark"></i> Rechazar
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </article>

        {/* Sección de Historial */}
        <article className="workspace-panel" style={{ gridColumn: '1 / -1', opacity: 0.8 }}>
          <div className="workspace-panel__header" style={{ marginBottom: '1.5rem' }}>
            <h2>Historial de Decisiones</h2>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', color: 'var(--muted)' }}>Estudiante</th>
                <th style={{ padding: '1rem', color: 'var(--muted)' }}>Actividad</th>
                <th style={{ padding: '1rem', color: 'var(--muted)' }}>Horas</th>
                <th style={{ padding: '1rem', color: 'var(--muted)' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {historyEntries.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{entry.studentName}</td>
                  <td style={{ padding: '1rem' }}>{entry.activity}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{entry.hours}h</td>
                  <td style={{ padding: '1rem' }}>
                    {entry.status === 'APPROVED' ? (
                      <span style={{ color: 'var(--success)', background: 'rgba(22,163,74,0.1)', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Aprobado</span>
                    ) : (
                      <span style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Rechazado</span>
                    )}
                  </td>
                </tr>
              ))}
              {historyEntries.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>No hay historial reciente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </article>

      </div>
    </>
  )
}
