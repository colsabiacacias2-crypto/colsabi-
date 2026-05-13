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
              <div className="submenu-modern">
                <Link href="/#mision-vision" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-bullseye"></i></div>
                  <div className="submenu-text"><strong>Misión y Visión</strong><span>Nuestro propósito</span></div>
                </Link>
                <Link href="/#instalaciones" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-building"></i></div>
                  <div className="submenu-text"><strong>Instalaciones</strong><span>Nuestros espacios</span></div>
                </Link>
                <Link href="/#promociones" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                  <div className="submenu-text"><strong>Promociones</strong><span>Egresados destacados</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/convenios" className="nav__link" onClick={closeMenu}>Convenios</Link>
              <div className="submenu-modern">
                <Link href="/convenios#colegios" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-school"></i></div>
                  <div className="submenu-text"><strong>Colegios</strong><span>Instituciones amigas</span></div>
                </Link>
                <Link href="/convenios#universidades" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-university"></i></div>
                  <div className="submenu-text"><strong>Universidades</strong><span>Educación superior</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/colsabi" className="nav__link" onClick={closeMenu}>COLSABI</Link>
              <div className="submenu-modern">
                <Link href="/colsabi#equipo" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-users"></i></div>
                  <div className="submenu-text"><strong>Equipo</strong><span>Nuestros docentes</span></div>
                </Link>
                <Link href="/colsabi#promociones" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-award"></i></div>
                  <div className="submenu-text"><strong>Promociones</strong><span>Logros y premios</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/historia" className="nav__link" onClick={closeMenu}>Historia</Link>
              <div className="submenu-modern">
                <Link href="/historia#historia" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-book-open"></i></div>
                  <div className="submenu-text"><strong>Nuestra Historia</strong><span>Cómo empezamos</span></div>
                </Link>
                <Link href="/historia#fundadores" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-user-group"></i></div>
                  <div className="submenu-text"><strong>Fundadores</strong><span>Nuestras raíces</span></div>
                </Link>
                <Link href="/historia#hijas-sabiduria" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-hands-praying"></i></div>
                  <div className="submenu-text"><strong>Hijas de la Sabiduría</strong><span>Congregación</span></div>
                </Link>
                <Link href="/historia#identidades" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-landmark"></i></div>
                  <div className="submenu-text"><strong>Entidades</strong><span>Organizaciones</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/simbolos" className="nav__link" onClick={closeMenu}>Símbolos</Link>
              <div className="submenu-modern">
                <Link href="/simbolos#escudo" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-shield-halved"></i></div>
                  <div className="submenu-text"><strong>Escudo</strong><span>Emblema oficial</span></div>
                </Link>
                <Link href="/simbolos#bandera" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-flag"></i></div>
                  <div className="submenu-text"><strong>Bandera</strong><span>Nuestros colores</span></div>
                </Link>
                <Link href="/simbolos#himnos" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-music"></i></div>
                  <div className="submenu-text"><strong>Himnos</strong><span>Nuestros cantos</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/peahs" className="nav__link" onClick={closeMenu}>PEAHS</Link>
              <div className="submenu-modern">
                <Link href="/peahs#pastoral" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-church"></i></div>
                  <div className="submenu-text"><strong>Pastoral</strong><span>Vida espiritual</span></div>
                </Link>
                <Link href="/peahs#proyectos" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-lightbulb"></i></div>
                  <div className="submenu-text"><strong>Proyectos Transversales</strong><span>Iniciativas</span></div>
                </Link>
                <Link href="/peahs#valores" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon"><i className="fa-solid fa-heart"></i></div>
                  <div className="submenu-text"><strong>Valores</strong><span>Nuestros principios</span></div>
                </Link>
              </div>
            </li>
            <li className="nav__item has-submenu">
              <Link href="/ingreso" className="nav__link" onClick={closeMenu}>Horas Sociales</Link>
              <div className="submenu-modern">
                <Link href="/postular-escenario" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon" style={{background: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)'}}><i className="fa-solid fa-briefcase"></i></div>
                  <div className="submenu-text"><strong>Postular escenario</strong><span>Registra práctica</span></div>
                </Link>
                <Link href="/ingreso" className="submenu-item" onClick={closeMenu}>
                  <div className="submenu-icon" style={{background: 'rgba(251, 191, 36, 0.1)', color: '#d97706'}}><i className="fa-solid fa-right-to-bracket"></i></div>
                  <div className="submenu-text"><strong>Ingreso</strong><span>Admin / Asociado</span></div>
                </Link>
              </div>
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
