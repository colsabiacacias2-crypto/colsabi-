'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '../components/LogoutButton'

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  return (
    <main className="workspace-page">
      <section className="workspace-shell">
        <aside className="workspace-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="workspace-brand">
            <img loading="lazy" src="/img/aaa/logo.png" alt="Logo COLSABI" />
            <div>
              <strong>COLSABI Admin</strong>
              <span>Horas sociales</span>
            </div>
          </div>
          <nav className="workspace-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>
              Dashboard
            </Link>
            <Link href="/admin/postulaciones" className={pathname === '/admin/postulaciones' ? 'active' : ''}>
              Gestión de postulaciones
            </Link>
            <Link href="/">Volver al sitio público</Link>
            
            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <LogoutButton />
            </div>
          </nav>
        </aside>
        
        {/* El contenido específico de cada página se renderiza aquí */}
        <section className="workspace-main">
          {children}
        </section>
      </section>
    </main>
  )
}