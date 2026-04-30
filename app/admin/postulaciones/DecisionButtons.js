'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DecisionButtons({ applicationId, organizationName }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const router = useRouter()

  const handleDecision = async (decision) => {
    if (!confirm(`¿Estás seguro de que quieres ${decision === 'APPROVE' ? 'APROBAR' : 'RECHAZAR'} a ${organizationName}?`)) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/scenario-applications/${applicationId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, notes: '' })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar la decisión')
      }

      if (decision === 'APPROVE') {
        alert(`¡Aprobado con éxito!\n\nSe ha creado el usuario asociado para ${organizationName}.\nContraseña temporal: ${data.asociado.tempPassword}\n\nPor favor, guarda y comparte esta contraseña de forma segura con la organización.`)
      } else {
        alert(`La postulación de ${organizationName} ha sido rechazada.`)
      }

      // Refrescar la página para quitar la solicitud de la lista
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {error && <div style={{ color: 'red', fontSize: '0.8rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '4px' }}>{error}</div>}
      
      <button 
        onClick={() => handleDecision('APPROVE')} 
        disabled={loading}
        className="workspace-btn" 
        style={{ background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', padding: '0.8rem', opacity: loading ? 0.5 : 1 }}
      >
        <i className="fa-solid fa-check"></i> Aprobar Escenario
      </button>
      
      <button 
        onClick={() => handleDecision('REJECT')} 
        disabled={loading}
        className="workspace-btn workspace-btn--ghost" 
        style={{ color: '#ef4444', borderColor: '#fca5a5', cursor: 'pointer', padding: '0.8rem', opacity: loading ? 0.5 : 1 }}
      >
        <i className="fa-solid fa-xmark"></i> Rechazar
      </button>
    </div>
  )
}