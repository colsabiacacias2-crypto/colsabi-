'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ScenarioActions({ escenarioId, escenarioName }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleViewDetails = async () => {
    setIsModalOpen(true)
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/scenarios/${escenarioId}`)
      const data = await res.json()
      if (res.ok) {
        setDetails(data.item)
      } else {
        alert(data.error || 'Error al obtener los detalles')
        setIsModalOpen(false)
      }
    } catch (err) {
      alert('Error de red')
      setIsModalOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de que deseas eliminar este escenario ("${escenarioName}")?\n\nEsta acción es irreversible.`)) {
      try {
        const res = await fetch(`/api/admin/scenarios/${escenarioId}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        if (res.ok) {
          alert('¡Escenario eliminado con éxito!')
          router.refresh()
        } else {
          alert(data.error || 'Error al eliminar el escenario')
        }
      } catch (err) {
        alert('Error de red')
      }
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Link 
          href={`/admin/escenarios/${escenarioId}/estudiantes`} 
          className="workspace-btn workspace-btn--ghost"
          style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          title="Ver Estudiantes"
        >
          <i className="fa-solid fa-users"></i>
          <span style={{ fontWeight: 'bold' }}>Asignar Estudiantes</span>
        </Link>
        <button 
          onClick={handleViewDetails}
          className="workspace-btn workspace-btn--ghost"
          style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
          title="Ver Detalles"
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>
        <button 
          onClick={handleDelete}
          className="workspace-btn"
          style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', cursor: 'pointer' }}
          title="Eliminar"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: 'var(--primary-600)' }}>Detalles del Escenario</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--muted)' }}>&times;</button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                <p>Cargando detalles...</p>
              </div>
            ) : details ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                    <i className="fa-solid fa-building"></i> Datos de la Institución
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.95rem' }}>
                    <div><strong style={{ color: 'var(--muted)' }}>Nombre:</strong><br/>{details.name}</div>
                    <div><strong style={{ color: 'var(--muted)' }}>Ciudad:</strong><br/>{details.city}</div>
                    <div style={{ gridColumn: '1 / -1' }}><strong style={{ color: 'var(--muted)' }}>Dirección:</strong><br/>{details.address || 'No especificada'}</div>
                  </div>
                </div>

                {details.application && (
                  <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                      <i className="fa-solid fa-address-book"></i> Datos de Contacto
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.95rem' }}>
                      <div><strong style={{ color: 'var(--muted)' }}>Nombre de contacto:</strong><br/>{details.application.contactName}</div>
                      <div><strong style={{ color: 'var(--muted)' }}>Teléfono:</strong><br/>{details.application.contactPhone}</div>
                      <div style={{ gridColumn: '1 / -1' }}><strong style={{ color: 'var(--muted)' }}>Correo:</strong><br/>{details.application.contactEmail}</div>
                    </div>
                  </div>
                )}

                <div style={{ background: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '12px' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                    <i className="fa-solid fa-clipboard-list"></i> Gestión
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.95rem' }}>
                    <div><strong style={{ color: 'var(--muted)' }}>Capacidad:</strong><br/>{details.capacity || 'N/A'} estudiantes</div>
                    <div><strong style={{ color: 'var(--muted)' }}>Estado:</strong><br/>
                      <span style={{ 
                        background: details.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2', 
                        color: details.status === 'ACTIVE' ? '#166534' : '#991b1b', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '999px', 
                        fontSize: '0.85rem',
                        display: 'inline-block',
                        marginTop: '0.3rem',
                        fontWeight: 'bold'
                      }}>
                        {details.status === 'ACTIVE' ? 'Activo' : details.status}
                      </span>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}><strong style={{ color: 'var(--muted)' }}>Descripción:</strong><br/>{details.description}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
                <p>No se pudo cargar la información.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}