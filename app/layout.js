import './globals.css'
import Script from 'next/script'
import AppShell from './components/AppShell'

export const metadata = {
  title: 'COLSABI',
  description: 'Colegio Nuestra Señora de la Sabiduría'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="icon" href="/img/aaa/logo.png" type="image/png" />
        <meta name="theme-color" content="#0a4ca3" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
