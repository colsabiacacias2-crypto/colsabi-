export default function Convenios() {
  return (
    <main>
      <section className="hero" id="convenios" aria-label="Portada de convenios">
        <div className="hero__bg"></div>
        <div className="container hero__content">
          <h1 className="hero__title reveal">Nuestros Convenios</h1>
          <p className="hero__subtitle reveal delay-1">Alianzas estratégicas para fortalecer la educación de nuestros estudiantes.</p>
        </div>
      </section>
      <section className="section" id="colegios">
        <div className="container">
          <h2 className="section__title center reveal">Convenios con Colegios</h2>
          <div className="grid-colegios">
            <a href="https://www.facebook.com/mariareinaschool01" target="_blank" className="colegio-card">
              <img src="/img/convenios/maria reina.png" alt="Colegio Maria Reina" />
              <p>Colegio Maria Reina</p>
            </a>
            <a href="https://www.facebook.com/linuscar/?locale=es_LA" target="_blank" className="colegio-card">
              <img src="/img/convenios/carmelo.png" alt="Liceo Nuestra Señora del Carmelo" />
              <p>Liceo Nuestra Señora del Carmelo</p>
            </a>
            <a href="https://www.facebook.com/mariadejesus.sotopineros" target="_blank" className="colegio-card">
              <img src="/img/convenios/capullitos.png" alt="Colegio Capullitos del Llano" />
              <p>Colegio Capullitos del Llano</p>
            </a>
            <a href="https://www.facebook.com/p/Gimnasio-Biling%C3%BCe-Playful-Learning-GBPL-100063597159943/?locale=es_LA" target="_blank" className="colegio-card">
              <img src="/img/convenios/bilingue.png" alt="Gimnasio Bilingüe Playful Learning" />
              <p>Gimnasio Bilingüe Playful Learning</p>
            </a>
            <a href="https://www.facebook.com/p/Gimnasio-Juan-Pablo-ll-100095241981123/?locale=es_LA" target="_blank" className="colegio-card">
              <img src="/img/convenios/pablo ll.png" alt="Gimnasio Juan Pablo II" />
              <p>Gimnasio Juan Pablo II</p>
            </a>
            <a href="https://www.facebook.com/ColPersonitasAcacias/?locale=es_LA" target="_blank" className="colegio-card">
              <img src="/img/convenios/personitas.png" alt="Colegio Personitas" />
              <p>Colegio Personitas</p>
            </a>
            <a href="https://gcm.edu.co/" target="_blank" className="colegio-card">
              <img src="/img/convenios/monfort.png" alt="Gimnasio Campestre Montfort" />
              <p>Gimnasio Campestre Montfort</p>
            </a>
          </div>
        </div>
      </section>
      <section className="section section--alt" id="universidades">
        <div className="container">
          <h2 className="section__title center reveal">Convenios con Universidades</h2>
          <div className="fila-universidades fila-grande">
            <a href="https://www.uexternado.edu.co/" target="_blank" className="universidad-card wide">
              <img src="/img/convenios/U/EXTERNADO.png" alt="Universidad Externado" />
              <p>Universidad Externado de Colombia</p>
            </a>
            <a href="https://www.ustavillavicencio.edu.co/" target="_blank" className="universidad-card wide">
              <img src="/img/convenios/U/USTA.png" alt="Universidad Santo Tomás" />
              <p>Universidad Santo Tomás</p>
            </a>
          </div>
          <div className="fila-universidades fila-pequena">
            <a href="https://www.sena.edu.co/es-co/Paginas/default.aspx" target="_blank" className="universidad-card">
              <img src="/img/convenios/U/SENA.png" alt="SENA" />
              <p>SENA (Servicio Nacional de Aprendizaje)</p>
            </a>
            <a href="https://www.unad.edu.co/" target="_blank" className="universidad-card">
              <img src="/img/convenios/U/UNAD.png" alt="UNAD" />
              <p>Universidad Nacional Abierta y a Distancia (UNAD)</p>
            </a>
            <a href="https://www.uniminuto.edu/" target="_blank" className="universidad-card">
              <img src="/img/convenios/U/UNIMINUTO.png" alt="UNIMINUTO" />
              <p>Corporación Universitaria Minuto de Dios (UNIMINUTO)</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
