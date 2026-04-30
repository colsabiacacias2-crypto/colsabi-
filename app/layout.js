import './globals.css'
import Script from 'next/script'
import AppShell from './components/AppShell'
import { Montserrat, Poppins } from 'next/font/google'

// Optimización de fuentes: next/font descarga y sirve las fuentes localmente, eliminando el parpadeo (CLS) y reduciendo el tiempo de carga
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-montserrat', display: 'swap' })
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' })

export const metadata = {
  title: 'COLSABI',
  description: 'Colegio Nuestra Señora de la Sabiduría'
}

const socialLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/colsabi.acacias.7?locale=es_LA",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/colsabi_acacias/",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@colsabi.acacas?_t=ZS-90i3QU7od1M&_r=1",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@rectoriacolsabiacacias5312",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/573000000000",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+573000000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@colsabi.edu.co"
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="icon" href="/img/aaa/logo.png" type="image/png" />
        <meta name="theme-color" content="#0284c7" />
      </head>
      <body>
        {/* Floating Sidebars (Globales en todas las páginas) */}
        <div className="floating-social right">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="fs-icon fs-facebook" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
            <span className="fs-tooltip">Facebook</span>
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="fs-icon fs-instagram" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
            <span className="fs-tooltip">Instagram</span>
          </a>
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="fs-icon fs-tiktok" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
            <span className="fs-tooltip">TikTok</span>
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="fs-icon fs-youtube" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
            <span className="fs-tooltip">YouTube</span>
          </a>
        </div>

        <div className="floating-social left">
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="fs-icon fs-whatsapp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
            <span className="fs-tooltip">WhatsApp</span>
          </a>
          <a href={`tel:${socialLinks.phone}`} className="fs-icon fs-phone" aria-label="Teléfono">
            <i className="fas fa-phone-alt"></i>
            <span className="fs-tooltip">Llamar</span>
          </a>
          <a href={`mailto:${socialLinks.email}`} className="fs-icon fs-email" aria-label="Correo">
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
