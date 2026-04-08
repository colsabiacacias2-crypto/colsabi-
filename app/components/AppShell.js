'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const workspaceRoutes = ['/admin', '/asociado', '/ingreso']

export default function AppShell({ children }) {
  const pathname = usePathname()
  const isWorkspaceRoute = workspaceRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isWorkspaceRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
