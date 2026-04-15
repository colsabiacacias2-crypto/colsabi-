import Link from 'next/link'

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container header__wrap">
        <Link href="/" className="brand">
          <img src="/img/aaa/logo.png" alt="Logo colegio" className="brand__logo" />
          <div className="brand__text">
            <span className="brand__name">Colegio Nuestra Señora La Sabiduría</span>
            <span className="brand__motto">Formando valores para la vida</span>
          </div>
        </Link>
        <nav className="nav" id="nav">
          <ul className="nav__list">
            <li className="nav__item has-submenu">
              <Link href="/#inicio" className="nav__link">Inicio</Link>
              <ul className="submenu">
                <li><Link href="/#mision-vision" className="nav__link">Misión y Visión</Link></li>
                <li><Link href="/#instalaciones" className="nav__link">Instalaciones</Link></li>
                <li><Link href="/#promociones" className="nav__link">Promociones</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/convenios" className="nav__link">Convenios</Link>
              <ul className="submenu">
                <li><Link href="/convenios#colegios" className="nav__link">Colegios</Link></li>
                <li><Link href="/convenios#universidades" className="nav__link">Universidades</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/colsabi" className="nav__link">COLSABI</Link>
              <ul className="submenu">
                <li><Link href="/colsabi#equipo" className="nav__link">Equipo</Link></li>
                <li><Link href="/colsabi#promociones" className="nav__link">Promociones</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/historia" className="nav__link">Historia</Link>
              <ul className="submenu">
                <li><Link href="/historia#historia" className="nav__link">Nuestra Historia</Link></li>
                <li><Link href="/historia#fundadores" className="nav__link">Fundadores</Link></li>
                <li><Link href="/historia#hijas-sabiduria" className="nav__link">Hijas de la Sabiduría</Link></li>
                <li><Link href="/historia#identidades" className="nav__link">Entidades</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/simbolos" className="nav__link">Símbolos</Link>
              <ul className="submenu">
                <li><Link href="/simbolos#escudo" className="nav__link">Escudo</Link></li>
                <li><Link href="/simbolos#bandera" className="nav__link">Bandera</Link></li>
                <li><Link href="/simbolos#himnos" className="nav__link">Himnos</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/peahs" className="nav__link">PEAHS</Link>
              <ul className="submenu">
                <li><Link href="/peahs#pastoral" className="nav__link">Pastoral</Link></li>
                <li><Link href="/peahs#proyectos" className="nav__link">Proyectos Transversales</Link></li>
                <li><Link href="/peahs#valores" className="nav__link">Valores</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/ingreso" className="nav__link">Horas Sociales</Link>
              <ul className="submenu">
                <li><Link href="/postular-escenario" className="nav__link">Postular escenario</Link></li>
                <li><Link href="/ingreso" className="nav__link">Ingreso (Admin / Asociado)</Link></li>
              </ul>
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
