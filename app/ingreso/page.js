'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IngresoPage() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.details ? `${data.error}: ${data.details}` : (data.error || 'Credenciales inválidas'))
      }

      // Redirigir según el rol que devolvió el backend
      if (data.role === 'ADMIN') {
        router.push('/admin')
      } else if (data.role === 'ASOCIADO') {
        router.push('/asociado')
      } else {
        router.push('/ingreso')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
          
          {!showForm ? (
            <div className="workspace-auth__actions">
              <button onClick={() => setShowForm(true)} className="workspace-btn workspace-btn--primary" style={{ border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Ingreso administrador</button>
              <button onClick={() => setShowForm(true)} className="workspace-btn workspace-btn--ghost" style={{ border: '1px solid var(--primary)', cursor: 'pointer', fontSize: '1rem', background: 'transparent', color: 'var(--primary)' }}>Ingreso asociado</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="workspace-form" style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-600)' }}>Iniciar Sesión</h3>
              
              {error && (
                <div style={{ color: '#b91c1c', marginBottom: '1.5rem', padding: '0.75rem', background: '#fee2e2', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #f87171' }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i>
                  {error}
                </div>
              )}
              
              <div className="workspace-form__grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Correo electrónico</span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@colsabi.edu.co" 
                    required 
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Contraseña</span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required 
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%' }}
                  />
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button type="submit" disabled={loading} className="workspace-btn workspace-btn--primary" style={{ flex: 1, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Verificando...' : 'Ingresar'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="workspace-btn workspace-btn--ghost" style={{ border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--muted)' }}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
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
