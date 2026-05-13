import './globals.css'
import Script from 'next/script'
import AppShell from './components/AppShell'
import ScrollObserver from './components/ScrollObserver'
import ScrollToTop from './components/ScrollToTop'
import FloatingSocials from './components/FloatingSocials'
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
        <FloatingSocials socialLinks={socialLinks} />
        <ScrollObserver />
        <ScrollToTop />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
