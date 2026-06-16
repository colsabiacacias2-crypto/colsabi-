'use client'

import { useEffect, useState } from 'react'

export default function AsociadoPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/asociado/dashboard')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al obtener estadísticas')
        }
        
        setStats(data.stats)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <>
        <header className="workspace-topbar">
          <div>
            <span className="workspace-topbar__eyebrow">Cargando...</span>
            <div style={{ height: '32px', width: '300px', background: '#e2e8f0', borderRadius: '4px', marginTop: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          </div>
        </header>
        <div className="workspace-grid workspace-grid--cards">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="workspace-card workspace-card--neutral" style={{ height: '100px', background: '#f1f5f9', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            </article>
          ))}
        </div>
      </>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
        <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
        <h2>Error al cargar el panel</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <header className="workspace-topbar">
        <div>
          <span className="workspace-topbar__eyebrow">Escenario Asignado</span>
          <h1 style={{ color: '#0f172a' }}>{stats?.scenarioName || 'Sin asignar'}</h1>
        </div>
      </header>
      <div className="workspace-grid workspace-grid--cards">
        <article className="workspace-card workspace-card--neutral">
          <span>Cupos Ocupados</span>
          <strong>{stats?.totalStudents || 0} / {stats?.capacity || 0}</strong>
        </article>
        <article className="workspace-card workspace-card--neutral">
          <span>Horas Aprobadas</span>
          <strong>{stats?.totalApprovedHours || 0}</strong>
        </article>
        <article className="workspace-card workspace-card--neutral">
          <span>Horas Requeridas</span>
          <strong>{stats?.totalRequiredHours || 0}</strong>
        </article>
        <article className="workspace-card workspace-card--neutral">
          <span>Progreso General</span>
          <strong>{stats?.completionPercentage || 0}%</strong>
        </article>
      </div>
      <div className="workspace-grid workspace-grid--main">
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Tareas prioritarias</h2>
            <span>Operación diaria</span>
          </div>
          <ul className="workspace-checks">
            <li>Revisar estudiantes asignados</li>
            <li>Registrar horas de los estudiantes día a día</li>
            <li>Revisar el historial de actividades registradas</li>
            <li>Monitorear avance frente a la meta (80 hrs)</li>
          </ul>
        </article>
        <article className="workspace-panel">
          <div className="workspace-panel__header">
            <h2>Seguridad operativa</h2>
            <span>Buenas prácticas</span>
          </div>
          <ul className="workspace-checks">
            <li>Acceso limitado únicamente a su escenario</li>
            <li>Bitácora de todos los registros de horas realizados</li>
            <li>No se pueden registrar horas sin una actividad justificada</li>
            <li>Las horas son inmutables una vez registradas</li>
          </ul>
        </article>
      </div>
      
      <style dangerouslySetContent={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />
    </>
  )
}
