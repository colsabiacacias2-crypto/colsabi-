'use client'
import Link from 'next/link'
export default function Home() {
  
  return (
    <main>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <section className="hero" id="inicio" aria-label="Portada">
        <div className="container hero-grid">
          {/* Lado Izquierdo: Slider de Imágenes Transicionadas */}
          <div className="hero-slider reveal-up">
            <img src="/img/aaa/sabiduria3.jpg" alt="Estudiantes" />
            <img src="/img/instalaciones/20240401073902_IMG_9008.JPG" alt="Evento" />
            <img src="/img/instalaciones/_DSC0661.jpg" alt="Educación" />
            <img src="/img/instalaciones/_DSC0676.jpg" alt="Instalaciones" />
          </div>

          {/* Lado Derecho: Contenido */}
          <div className="hero__content reveal-up delay-1">
            <div className="hero__badges">
              <span className="badge">Educación Privada Católica</span>
              <span className="badge">Acacías, Meta</span>
            </div>
            <p className="hero__quote">“Formando valores para la vida”</p>
            <h1 className="hero__headline">
              Formación integral <br/> para el <span className="text-gradient">futuro</span>
            </h1>
            <p className="hero__sub">
              Innovación, principios sólidos y excelencia académica en cada etapa de la vida escolar. Preparando a los líderes del mañana con sabiduría y corazón.
            </p>
            <div className="hero__actions">
               <Link href="#accesos" className="btn btn--accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px' }}>Descubre más</Link>
               <Link href="/#contacto" className="btn btn--outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px' }}>Contáctanos</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="accesos">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section__title">Explora nuestra <span>Institución</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Navega a los apartados más consultados y al nuevo módulo de horas sociales de forma rápida y sencilla.</p>
          </div>
          
          <div className="quick-grid">
            <Link className="quick-card reveal-up delay-1" href="/postular-escenario">
              <span className="quick-card__icon"><i className="fa-solid fa-briefcase"></i></span>
              <div>
                <strong>Postular escenario</strong>
                <span>Registra una propuesta de práctica</span>
              </div>
            </Link>
            <Link className="quick-card reveal-up delay-2" href="/ingreso">
              <span className="quick-card__icon" style={{ background: 'linear-gradient(135deg, var(--success), var(--success-700))'}}><i className="fa-solid fa-user-clock"></i></span>
              <div>
                <strong>Horas Sociales</strong>
                <span>Módulo administrativo</span>
              </div>
            </Link>
            <Link className="quick-card reveal-up delay-3" href="/convenios">
              <span className="quick-card__icon" style={{ background: 'linear-gradient(135deg, var(--accent), #d97706)'}}><i className="fa-solid fa-handshake"></i></span>
              <div>
                <strong>Convenios</strong>
                <span>Alianzas universitarias</span>
              </div>
            </Link>
            <Link className="quick-card reveal-up delay-1" href="/peahs">
              <span className="quick-card__icon"><i className="fa-solid fa-seedling"></i></span>
              <div>
                <strong>PEAHS</strong>
                <span>Pastoral y proyectos</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="mision-vision">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div className="reveal-up">
            <h2 className="section__title">Nuestra <span>Misión</span></h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              Somos una institución educativa católica, de carácter privado, que integra ciencia, fe y vida junto a la familia. Buscamos formar seres humanos íntegros, con valores y principios sólidos, capaces de transformar su entorno con amor y sabiduría.
            </p>
          </div>
          <div className="reveal-up delay-1">
            <h2 className="section__title">Nuestra <span>Visión</span></h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              En 2028 seremos referentes regionales por excelencia educativa, identidad SABIDURÍA e innovación tecnológica, proyectando a nuestros estudiantes como líderes éticos y competentes para los desafíos globales.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="equipo">
        <div className="container">
          <h2 className="section__title center reveal-up">Nuestro <span>Equipo</span></h2>
          <p className="reveal-up delay-1" style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>Profesionales dedicados al crecimiento y bienestar de nuestros estudiantes.</p>
          
          <div className="team-grid reveal-up delay-2">
            <article className="team-card">
              <img src="/img/p/RepresentanteLegal.png" alt="Representante Legal" />
              <h4>Hna. Gisela Huertas Torres</h4>
              <p className="small">Representante Legal</p>
            </article>
            <article className="team-card">
              <img src="/img/p/EDISON ESTEBAN DEJOY MONTILLA .jpg" alt="Rector" />
              <h4>Edison Esteban Dejoy Montilla</h4>
              <p className="small">Rector</p>
            </article>
            <article className="team-card">
              <img src="/img/p/EDY YESID CORREA LEGUIZAMÓN .jpg" alt="Coordinador Académico" />
              <h4>Edy Yesid Correa Leguizamón</h4>
              <p className="small">Coordinador Académico</p>
            </article>
            <article className="team-card">
              <img src="/img/p/NUBIA ALEJANDRA REYES HUERTAS  .jpg" alt="Psicoorientadora" />
              <h4>Nubia Alejandra Reyes Huertas</h4>
              <p className="small">Psicoorientadora</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="instalaciones">
        <div className="container">
          <h2 className="section__title center reveal-up">Nuestras <span>Instalaciones</span></h2>
          <p className="reveal-up delay-1" style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>Espacios diseñados para inspirar, aprender y crecer en comunidad.</p>
          
          <div className="instalaciones-grid reveal-up delay-2">
            <div className="instalacion-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
              <img src="/img/instalaciones/20240401073902_IMG_9008.JPG" alt="Sede Acacias" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Sede Acacías</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Nuestra Señora de la Sabiduría</p>
              </div>
            </div>
            <div className="instalacion-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
              <img src="/img/instalaciones/_DSC0661.jpg" alt="Espacios" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Espacios y aulas</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Entornos modernos y seguros</p>
              </div>
            </div>
            <div className="instalacion-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
              <img src="/img/instalaciones/_DSC0676.jpg" alt="Recreación" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Zonas verdes</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Contacto con la naturaleza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contacto">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section__title">Estamos aquí para <span>Ayudarte</span></h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--muted)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
              ¿Tienes dudas sobre procesos de admisión, convenios o el nuevo módulo de horas sociales? Visítanos, escríbenos o inicia tu proceso fácilmente.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}>
            
            {/* Tarjeta de Información */}
            <div className="reveal-up delay-1" style={{ padding: '2.5rem', background: 'var(--surface-blue)', borderRadius: '30px', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid rgba(2, 132, 199, 0.1)' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><i className="fa-solid fa-location-dot"></i> Nuestra Ubicación</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Acacías, Meta, Colombia<br/>Colegio Nuestra Señora de la Sabiduría</p>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><i className="fa-regular fa-clock"></i> Horario de Atención</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Lunes a Jueves: 7:00 a.m. – 4:00 p.m.<br/>Viernes: 7:00 a.m. - 1:30 p.m.</p>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><i className="fa-solid fa-phone"></i> Contacto Rápido</h3>
                <p style={{ margin: 0, color: 'var(--muted)' }}>info@colsabi.edu.co</p>
              </div>
            </div>

            {/* Mapa Interactivo */}
            <div className="reveal-up delay-2" style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: 'var(--shadow)', minHeight: '350px', position: 'relative', border: '1px solid rgba(2, 132, 199, 0.1)' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Colegio%20Nuestra%20Se%C3%B1ora%20de%20la%20Sabidur%C3%ADa%20Acacias&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación del colegio"
              ></iframe>
            </div>

            {/* Tarjeta de Admisiones */}
            <div className="reveal-up delay-3" style={{ padding: '2.5rem', background: 'var(--card)', borderRadius: '30px', boxShadow: 'var(--shadow-hover)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '1px solid rgba(2, 132, 199, 0.1)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--surface-green)', color: 'var(--success)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                <i className="fa-solid fa-file-signature"></i>
              </div>
              <h3 style={{ color: 'var(--primary-600)', marginBottom: '1rem', fontSize: '1.6rem' }}>Proceso de Admisiones</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Inicia el proceso llenando nuestro formulario oficial. Es rápido y seguro.</p>
              <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=2gvX0nJp7E6sr4u-IJHSa2F-8nfwliFHqoZ8HhAKQy1UOVEzM0ROMkhZREJRMlhCRzVKQUtNWlJNSi4u" target="_blank" rel="noopener noreferrer" className="btn btn--accent" style={{ display: 'block', width: '100%', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '50px' }}>
                Abrir formulario <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '0.5rem' }}></i>
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
