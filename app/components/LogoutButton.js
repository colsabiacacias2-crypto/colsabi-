'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/ingreso')
      router.refresh()
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }
  }

  return (
    <button 
      onClick={handleLogout} 
      className="workspace-btn workspace-btn--ghost" 
      style={{ 
        width: '100%', 
        marginTop: 'auto', 
        color: '#ef4444', 
        borderColor: '#fca5a5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
      }}
    >
      <i className="fas fa-sign-out-alt"></i> Cerrar sesión
    </button>
  )
}