'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close submenu on resize (equivalent to original window resize event)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header" id="header">
      <div className="container header__wrap">
        <Link href="/" className="brand" onClick={closeMenu}>
          <img loading="lazy" src="/img/aaa/logo.png" alt="Logo colegio" className="brand__logo" />
          <div className="brand__text">
            <span className="brand__name">Colegio Nuestra Señora La Sabiduría</span>
            <span className="brand__motto">Formando valores para la vida</span>
          </div>
        </Link>
        <nav className={`nav ${isOpen ? 'open' : ''}`} id="nav">
          <ul className="nav__list">
            <li className="nav__item has-submenu">
              <Link href="/#inicio" className="nav__link" onClick={closeMenu}>Inicio</Link>
              <ul className="submenu">
                <li><Link href="/#mision-vision" className="nav__link" onClick={closeMenu}>Misión y Visión</Link></li>
                <li><Link href="/#instalaciones" className="nav__link" onClick={closeMenu}>Instalaciones</Link></li>
                <li><Link href="/#promociones" className="nav__link" onClick={closeMenu}>Promociones</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/convenios" className="nav__link" onClick={closeMenu}>Convenios</Link>
              <ul className="submenu">
                <li><Link href="/convenios#colegios" className="nav__link" onClick={closeMenu}>Colegios</Link></li>
                <li><Link href="/convenios#universidades" className="nav__link" onClick={closeMenu}>Universidades</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/colsabi" className="nav__link" onClick={closeMenu}>COLSABI</Link>
              <ul className="submenu">
                <li><Link href="/colsabi#equipo" className="nav__link" onClick={closeMenu}>Equipo</Link></li>
                <li><Link href="/colsabi#promociones" className="nav__link" onClick={closeMenu}>Promociones</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/historia" className="nav__link" onClick={closeMenu}>Historia</Link>
              <ul className="submenu">
                <li><Link href="/historia#historia" className="nav__link" onClick={closeMenu}>Nuestra Historia</Link></li>
                <li><Link href="/historia#fundadores" className="nav__link" onClick={closeMenu}>Fundadores</Link></li>
                <li><Link href="/historia#hijas-sabiduria" className="nav__link" onClick={closeMenu}>Hijas de la Sabiduría</Link></li>
                <li><Link href="/historia#identidades" className="nav__link" onClick={closeMenu}>Entidades</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/simbolos" className="nav__link" onClick={closeMenu}>Símbolos</Link>
              <ul className="submenu">
                <li><Link href="/simbolos#escudo" className="nav__link" onClick={closeMenu}>Escudo</Link></li>
                <li><Link href="/simbolos#bandera" className="nav__link" onClick={closeMenu}>Bandera</Link></li>
                <li><Link href="/simbolos#himnos" className="nav__link" onClick={closeMenu}>Himnos</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/peahs" className="nav__link" onClick={closeMenu}>PEAHS</Link>
              <ul className="submenu">
                <li><Link href="/peahs#pastoral" className="nav__link" onClick={closeMenu}>Pastoral</Link></li>
                <li><Link href="/peahs#proyectos" className="nav__link" onClick={closeMenu}>Proyectos Transversales</Link></li>
                <li><Link href="/peahs#valores" className="nav__link" onClick={closeMenu}>Valores</Link></li>
              </ul>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/ingreso" className="nav__link" onClick={closeMenu}>Horas Sociales</Link>
              <ul className="submenu">
                <li><Link href="/postular-escenario" className="nav__link" onClick={closeMenu}>Postular escenario</Link></li>
                <li><Link href="/ingreso" className="nav__link" onClick={closeMenu}>Ingreso (Admin / Asociado)</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          id="hamburger" 
          aria-label="Abrir menú"
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
