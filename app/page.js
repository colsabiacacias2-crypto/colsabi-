export default function Home() {
  return (
    <main>
      <section className="hero hero--image" id="inicio" aria-label="Portada">
        <div 
          className="hero__bg" 
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(8,59,128,.55), rgba(31,122,62,.35)), url('/img/aaa/sabiduria3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} 
        />
        <div className="container hero__content">
          <div className="hero__badges">
            <span className="badge">Educación privada católica</span>
            <span className="badge">Acacías, Meta</span>
          </div>
          <h1 className="hero__headline">Formación integral para el futuro</h1>
          <p className="hero__sub">Innovación, valores y excelencia en cada etapa educativa.</p>
        </div>
      </section>

      <section className="section" id="equipo">
        <div className="container">
          <h2 className="section__title center reveal">Nuestro Equipo</h2>
          
          <div className="team-carousel-wrapper reveal delay-1">
            <button className="team-carousel-btn prev" aria-label="Anterior"><i className="fas fa-chevron-left"></i></button>
            <div className="team-carousel">
              <div className="team-carousel-track">
                {/* Representante legal */}
                <article className="team-card team-slide">
                  <img src="/img/p/RepresentanteLegal.png" alt="Representante Legal" />
                  <h4>Hna. Gisela Huertas Torres</h4>
                  <p className="small">Representante Legal</p>
                </article>
                
                {/* Directivos */}
                <article className="team-card team-slide">
                  <img src="/img/p/EDISON ESTEBAN DEJOY MONTILLA .jpg" alt="Rector" />
                  <h4>Edison Esteban Dejoy Montilla</h4>
                  <p className="small">Rector</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/EDY YESID CORREA LEGUIZAMÓN .jpg" alt="Coordinador Académico" />
                  <h4>Edy Yesid Correa Leguizamón</h4>
                  <p className="small">Coordinador Académico</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/CÉSAR AUGUSTO PEÑA RODRÍGUEZ  .jpg" alt="Coordinador de Convivencia" />
                  <h4>Cesar Augusto Peña Rodriguez</h4>
                  <p className="small">Coordinador de Convivencia</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/NUBIA ALEJANDRA REYES HUERTAS  .jpg" alt="Psicoorientadora" />
                  <h4>Nubia Alejandra Reyes Huertas</h4>
                  <p className="small">Psicoorientadora</p>
                </article>

                {/* Administrativos */}
                <article className="team-card team-slide">
                  <img src="/img/p/ALEXANDER CRUZ CARDONA .jpg" alt="Lider SST" />
                  <h4>Alexander Cruz Cardona</h4>
                  <p className="small">Lider SST</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/LEANDRO POLANÍA YOIMAN .jpg" alt="Auxiliar Contable" />
                  <h4>Leandro Polanía Yoiman</h4>
                  <p className="small">Auxiliar Contable</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/RUBY ANDREA ROJAS MUÑOZ .jpg" alt="Contadora" />
                  <h4>Ruby Andrea Rojas Muñoz</h4>
                  <p className="small">Contadora</p>
                </article>
                <article className="team-card team-slide">
                  <img src="/img/p/VIVIANA MARTÍNEZ ACUÑA .jpg" alt="Secretaria Académica" />
                  <h4>Viviana Martínez Acuña</h4>
                  <p className="small">Secretaria Académica</p>
                </article>
              </div>
            </div>
            <button className="team-carousel-btn next" aria-label="Siguiente"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="mision-vision">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section__title">Misión</h2>
            <p>Somos una institución educativa católica, de carácter privado, que integra ciencia, fe y vida junto a la familia.</p>
          </div>
          <div className="reveal delay-1">
            <h2 className="section__title">Visión</h2>
            <p>En 2028 seremos referentes regionales por excelencia educativa, identidad SABIDURÍA e innovación tecnológica.</p>
          </div>
        </div>
      </section>

      <section className="section" id="instalaciones">
        <div className="container">
          <h2 className="section__title center reveal">Nuestras instalaciones</h2>
          <div className="instalaciones-grid">
            <div className="instalacion-card">
              <div className="mini-carousel">
                <div className="carousel-track">
                  <div className="carousel-slide"><img src="/img/instalaciones/20240401073902_IMG_9008.JPG" alt="" /></div>
                  <div className="carousel-slide"><img src="/img/instalaciones/20240401074948_IMG_9025.JPG" alt="" /></div>
                  <div className="carousel-slide"><img src="/img/instalaciones/Captura%20de%20pantalla%202025-09-22%20092349.png" alt="" /></div>
                </div>
                <button className="control prev">&#10094;</button>
                <button className="control next">&#10095;</button>
              </div>
              <p className="instalacion-text">Sede Acacias Nuestra Señora de la sabiduría</p>
            </div>
            <div className="instalacion-card">
              <div className="mini-carousel">
                <div className="carousel-track">
                  <div className="carousel-slide"><img src="/img/instalaciones/_DSC0661.jpg" alt="" /></div>
                  <div className="carousel-slide"><img src="/img/instalaciones/_DSC0676.jpg" alt="" /></div>
                  <div className="carousel-slide"><img src="/img/instalaciones/_DSC0682.jpg" alt="" /></div>
                </div>
                <button className="control prev">&#10094;</button>
                <button className="control next">&#10095;</button>
              </div>
              <p className="instalacion-text">Espacios y aulas</p>
            </div>
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

      <section className="promociones section--alt" id="promociones">
        <div className="container">
          <h2 className="section__title center reveal">Promociones</h2>
          <div className="promociones-grid">
            <div className="promo-card"><img src="/img/Promociones/2010.jpg" alt="Promoción 2010" className="promo-img" /><h3 className="promo-title">Promoción 2010</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2011.png" alt="Promoción 2011" className="promo-img" /><h3 className="promo-title">Promoción 2011</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2012.png" alt="Promoción 2012" className="promo-img" /><h3 className="promo-title">Promoción 2012</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2013.png" alt="Promoción 2013" className="promo-img" /><h3 className="promo-title">Promoción 2013</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2014.png" alt="Promoción 2014" className="promo-img" /><h3 className="promo-title">Promoción 2014</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2015.png" alt="Promoción 2015" className="promo-img" /><h3 className="promo-title">Promoción 2015</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2017.jpg" alt="Promoción 2017" className="promo-img" /><h3 className="promo-title">Promoción 2017</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2018.png" alt="Promoción 2018" className="promo-img" /><h3 className="promo-title">Promoción 2018</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2019.png" alt="Promoción 2019" className="promo-img" /><h3 className="promo-title">Promoción 2019</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2020.jpg" alt="Promoción 2020" className="promo-img" /><h3 className="promo-title">Promoción 2020</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2021.png" alt="Promoción 2021" className="promo-img" /><h3 className="promo-title">Promoción 2021</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2022.jpg" alt="Promoción 2022" className="promo-img" /><h3 className="promo-title">Promoción 2022</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2023.jpg" alt="Promoción 2023" className="promo-img" /><h3 className="promo-title">Promoción 2023</h3></div>
            <div className="promo-card"><img src="/img/Promociones/2024.jpg" alt="Promoción 2024" className="promo-img" /><h3 className="promo-title">Promoción 2024</h3></div>
            <div className="promo-card"><img src="/img/Promociones/20252.jpg" alt="Promoción 2025-1" className="promo-img" /><h3 className="promo-title">Promoción 2025-1</h3></div>
            <div className="promo-card"><img src="/img/Promociones/20251.jpg" alt="Promoción 2025-2" className="promo-img" /><h3 className="promo-title">Promoción 2025-2</h3></div>
          </div>
        </div>
      </section>

      <section className="section" id="contacto">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section__title">Contacto</h2>
            <p>¿Tienes dudas sobre procesos de admisión o convenios? Escríbenos y con gusto te ayudamos.</p>
            <ul className="contact">
              <li><strong>Horario:</strong> Lunes a Jueves de 7:00 a.m. – 4:00 p.m. Viernes de 7:00 a.m. - 1:30 p.m.</li>
            </ul>
          </div>
          <div className="form reveal delay-1">
            <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>ADMISIONES</h3>
            <div className="form-embed"></div>
            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=2gvX0nJp7E6sr4u-IJHSa2F-8nfwliFHqoZ8HhAKQy1UOVEzM0ROMkhZREJRMlhCRzVKQUtNWlJNSi4u" target="_blank" className="btn btn--form">Abrir formulario completo</a>
          </div>
        </div>
      </section>
    </main>
  )
}
