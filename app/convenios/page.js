export default function Convenios() {
  return (
    <main>
      <section className="page-hero" id="convenios" aria-label="Portada de convenios">
        <div className="container">
          <h1 className="page-hero__title reveal-up">Nuestros Convenios</h1>
          <p className="page-hero__subtitle reveal-up delay-1">Alianzas estratégicas con colegios y universidades de alto nivel para fortalecer y proyectar la educación de nuestros estudiantes hacia un futuro brillante.</p>
        </div>
      </section>

      <section className="section" id="colegios">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Convenios con <span>Colegios</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Trabajamos de la mano con las mejores instituciones para garantizar una transición educativa fluida y de excelencia.
            </p>
          </div>
          <div className="quick-grid reveal-up delay-1">
            <a href="https://www.facebook.com/mariareinaschool01" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/maria reina.png" alt="Colegio Maria Reina" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Colegio Maria Reina</strong>
            </a>
            <a href="https://www.facebook.com/linuscar/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/carmelo.png" alt="Liceo Nuestra Señora del Carmelo" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Liceo Ntra. Sra. del Carmelo</strong>
            </a>
            <a href="https://www.facebook.com/mariadejesus.sotopineros" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/capullitos.png" alt="Colegio Capullitos del Llano" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Colegio Capullitos del Llano</strong>
            </a>
            <a href="https://www.facebook.com/p/Gimnasio-Biling%C3%BCe-Playful-Learning-GBPL-100063597159943/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/bilingue.png" alt="Gimnasio Bilingüe Playful Learning" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Gimnasio Playful Learning</strong>
            </a>
            <a href="https://www.facebook.com/p/Gimnasio-Juan-Pablo-ll-100095241981123/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/pablo ll.png" alt="Gimnasio Juan Pablo II" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Gimnasio Juan Pablo II</strong>
            </a>
            <a href="https://www.facebook.com/ColPersonitasAcacias/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/personitas.png" alt="Colegio Personitas" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Colegio Personitas</strong>
            </a>
            <a href="https://gcm.edu.co/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/monfort.png" alt="Gimnasio Campestre Montfort" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Gimnasio Campestre Montfort</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="universidades">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Convenios con <span>Universidades</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Facilitamos el acceso a la educación superior mediante alianzas con las instituciones universitarias y tecnológicas más reconocidas del país.
            </p>
          </div>
          
          <div className="quick-grid reveal-up delay-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <a href="https://www.uexternado.edu.co/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/U/EXTERNADO.png" alt="Universidad Externado" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Universidad Externado</strong>
              <span>de Colombia</span>
            </a>
            <a href="https://www.ustavillavicencio.edu.co/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/U/USTA.png" alt="Universidad Santo Tomás" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Universidad Santo Tomás</strong>
              <span>Sede Villavicencio</span>
            </a>
            <a href="https://www.sena.edu.co/es-co/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/U/SENA.png" alt="SENA" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>SENA</strong>
              <span>Servicio Nacional de Aprendizaje</span>
            </a>
            <a href="https://www.unad.edu.co/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/U/UNAD.png" alt="UNAD" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>UNAD</strong>
              <span>Universidad Nacional Abierta</span>
            </a>
            <a href="https://www.uniminuto.edu/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/convenios/U/UNIMINUTO.png" alt="UNIMINUTO" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>UNIMINUTO</strong>
              <span>Corp. Universitaria Minuto de Dios</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
