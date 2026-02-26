export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__wrap">
        <div className="contact-info">
          <h4 className="contact-title">
            <i className="fas fa-location-dot"></i> Dirección
          </h4>
          <ul className="contact">
            <li><a href="tel:3138533557"><i className="fas fa-house-chimney"></i> Carrera 16 No. 13-42 B. Centro</a></li>
            <li><a href="tel:3163936294"><i className="fas fa-phone-flip"></i> Acacias - Meta - Colombia </a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h4 className="contact-title">
            <i className="fas fa-phone-volume"></i> Teléfonos
          </h4>
          <ul className="contact">
            <li><a href="tel:3138533557"><i className="fas fa-mobile-screen-button"></i> 313 853 3557</a></li>
            <li><a href="tel:3163936294"><i className="fas fa-phone-flip"></i> 316 393 6294</a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h4 className="contact-title">
            <i className="fas fa-envelope-circle-check"></i> Correos electrónicos
          </h4>
          <ul className="contact">
            <li><a href="mailto:sabiduria.acacias@colsabi.edu.co"><i className="fas fa-envelope-open-text"></i> sabiduria.acacias@colsabi.edu.co</a></li>
            <li><a href="mailto:gestion.directiva@colsabi.edu.co"><i className="fas fa-mail-bulk"></i> gestion.directiva@colsabi.edu.co</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-content">
            <div className="footer-logos">
              <a href="https://www.mineducacion.gov.co" target="_blank" rel="noopener noreferrer">
                <img src="/img/aaa/educacion.png" alt="Logo Mineducación" />
              </a>
              <a href="https://meta.gov.co/secretaria/secretaria-educacionl/6" target="_blank" rel="noopener noreferrer">
                <img src="/img/aaa/oportunidades.png" alt="Logo Secretaría de Educación del Meta" />
              </a>
            </div>
            <p className="footer-text">
              Aprobado por Resolución 7342 del 01 de diciembre de 2015, de la Secretaría de Educación del Meta, 
              para prestar el servicio de educación formal en los niveles de Educación Básica, Ciclo Secundaria 
              en los grados: 6°, 7°, 8° y 9° y Media Técnica en Asistencia Administrativa, grados 10° y 11°.
            </p>
          </div>
        </div>
      </div>
      <div className="copy">
        <i className="fas fa-copyright"></i> Colegio Nuestra Señora de la Sabiduría
      </div>
      <button className="to-top" id="toTop" aria-label="Volver arriba">↑</button>
    </footer>
  )
}
