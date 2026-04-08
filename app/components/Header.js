export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container header__wrap">
        <a href="/" className="brand">
          <img src="/img/aaa/logo.png" alt="Logo colegio" className="brand__logo" />
          <div className="brand__text">
            <span className="brand__name">Colegio Nuestra Señora La Sabiduría</span>
            <span className="brand__motto">Formando valores para la vida</span>
          </div>
        </a>
        <nav className="nav" id="nav">
          <ul className="nav__list">
            <li className="nav__item has-submenu">
              <a href="/#inicio" className="nav__link">Inicio</a>
              <ul className="submenu">
                <li><a href="/#mision-vision" className="nav__link">Misión y Visión</a></li>
                <li><a href="/#instalaciones" className="nav__link">Instalaciones</a></li>
                <li><a href="/#promociones" className="nav__link">Promociones</a></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <a href="/convenios" className="nav__link">Convenios</a>
              <ul className="submenu">
                <li><a href="/convenios#colegios" className="nav__link">Colegios</a></li>
                <li><a href="/convenios#universidades" className="nav__link">Universidades</a></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <a href="/colsabi" className="nav__link">COLSABI</a>
              <ul className="submenu">
                <li><a href="/colsabi#equipo" className="nav__link">Equipo</a></li>
                <li><a href="/colsabi#promociones" className="nav__link">Promociones</a></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <a href="/historia" className="nav__link">Historia</a>
              <ul className="submenu">
                <li><a href="/historia#historia" className="nav__link">Nuestra Historia</a></li>
                <li><a href="/historia#fundadores" className="nav__link">Fundadores</a></li>
                <li><a href="/historia#hijas-sabiduria" className="nav__link">Hijas de la Sabiduría</a></li>
                <li><a href="/historia#identidades" className="nav__link">Entidades</a></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <a href="/simbolos" className="nav__link">Símbolos</a>
              <ul className="submenu">
                <li><a href="/simbolos#escudo" className="nav__link">Escudo</a></li>
                <li><a href="/simbolos#bandera" className="nav__link">Bandera</a></li>
                <li><a href="/simbolos#himnos" className="nav__link">Himnos</a></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <a href="/peahs" className="nav__link">PEAHS</a>
              <ul className="submenu">
                <li><a href="/peahs#pastoral" className="nav__link">Pastoral</a></li>
                <li><a href="/peahs#proyectos" className="nav__link">Proyectos Transversales</a></li>
                <li><a href="/peahs#valores" className="nav__link">Valores</a></li>
              </ul>
            </li>
            <li className="nav-item redes">
              <a href="/#contacto" className="btn btn--sm">Contacto</a>
              <div className="social-icons">
                <a href="https://www.facebook.com/colsabi.acacias.7?locale=es_LA" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/colsabi_acacias/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@colsabi.acacas?_t=ZS-90i3QU7od1M&_r=1" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                <a href="https://www.youtube.com/@rectoriacolsabiacacias5312" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
            </li>
          </ul>
        </nav>
        <button className="hamburger" id="hamburger" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
