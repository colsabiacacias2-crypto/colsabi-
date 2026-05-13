'use client';

import { usePathname } from 'next/navigation';

export default function FloatingSocials({ socialLinks }) {
  const pathname = usePathname();

  // Rutas donde NO queremos que se muestren los iconos sociales
  const hiddenRoutes = ['/ingreso', '/admin', '/asociado'];
  
  const isHidden = hiddenRoutes.some(route => pathname.startsWith(route));

  if (isHidden) return null;

  return (
    <>
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
    </>
  );
}
