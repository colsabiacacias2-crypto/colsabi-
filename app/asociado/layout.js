'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '../components/LogoutButton'

export default function AsociadoLayout({ children }) {
  const pathname = usePathname()

  return (
    <main className="workspace-page">
      <section className="workspace-shell">
        <aside className="workspace-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="workspace-brand">
            <img loading="lazy" src="/img/aaa/logo.png" alt="Logo COLSABI" />
            <div>
              <strong>Portal Asociado</strong>
              <span>Escenario de práctica</span>
            </div>
          </div>
          <nav className="workspace-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Link href="/asociado" className={pathname === '/asociado' ? 'active' : ''}>
              Resumen
            </Link>
            <Link href="/asociado/evaluacion" className={pathname === '/asociado/evaluacion' ? 'active' : ''}>
              Evaluar Horas
            </Link>
            <Link href="/asociado/configuracion" className={pathname === '/asociado/configuracion' ? 'active' : ''}>
              Configuración
            </Link>
            <Link href="/">Sitio institucional</Link>
            
            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <LogoutButton />
            </div>
          </nav>
        </aside>
        
        <section className="workspace-main">
          {children}
        </section>
      </section>
    </main>
  )
}
