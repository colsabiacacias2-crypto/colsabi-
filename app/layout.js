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
        <meta name="theme-color" content="#0284c7" />
      </head>
      <body>
        {/* Floating Sidebars (Globales en todas las páginas) */}
        <div className="floating-social right">
          <a href="https://www.facebook.com/colsabi.acacias.7?locale=es_LA" target="_blank" rel="noopener noreferrer" className="fs-icon fs-facebook" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
            <span className="fs-tooltip">Facebook</span>
          </a>
          <a href="https://www.instagram.com/colsabi_acacias/" target="_blank" rel="noopener noreferrer" className="fs-icon fs-instagram" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
            <span className="fs-tooltip">Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@colsabi.acacas?_t=ZS-90i3QU7od1M&_r=1" target="_blank" rel="noopener noreferrer" className="fs-icon fs-tiktok" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
            <span className="fs-tooltip">TikTok</span>
          </a>
          <a href="https://www.youtube.com/@rectoriacolsabiacacias5312" target="_blank" rel="noopener noreferrer" className="fs-icon fs-youtube" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
            <span className="fs-tooltip">YouTube</span>
          </a>
        </div>

        <div className="floating-social left">
          <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="fs-icon fs-whatsapp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
            <span className="fs-tooltip">WhatsApp</span>
          </a>
          <a href="tel:+573000000000" className="fs-icon fs-phone" aria-label="Teléfono">
            <i className="fas fa-phone-alt"></i>
            <span className="fs-tooltip">Llamar</span>
          </a>
          <a href="mailto:info@colsabi.edu.co" className="fs-icon fs-email" aria-label="Correo">
            <i className="fas fa-envelope"></i>
            <span className="fs-tooltip">Correo</span>
          </a>
        </div>

        <AppShell>{children}</AppShell>
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
