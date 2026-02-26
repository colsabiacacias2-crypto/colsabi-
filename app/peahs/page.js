export default function Peahs() {
  return (
    <main>
      <section className="hero" aria-label="Portada de convenios">
        <div className="hero__bg"></div>
        <div className="container hero__content">
          <h1 className="hero__title reveal">Pastoral Educativa Académica Humanizante Sabiduría</h1>
          <p className="hero__subtitle reveal delay-1">“Camino hacia la integración de la Ciencia, la Fe y la Vida”</p>
        </div>
      </section>
      <section className="section" id="que-es">
        <div className="container">
          <h2 className="section__title center">¿Qué es?</h2>
          <p className="center">Proyecto dinámico que integra fe, ciencia, tecnología y biodiversidad para dar sentido a la vida educativa.</p>
        </div>
      </section>
      <section className="section section--alt" id="objetivo">
        <div className="container grid grid--2">
          <div>
            <h2 className="section__title">Objetivo</h2>
            <p>Formación integral fortaleciendo capacidades intelectuales, afectivas, sociales y trascendentales desde un enfoque humanizante.</p>
          </div>
          <div className="media">
            <img src="/img/aaa/Captura%20de%20pantalla%202025-10-01%20152341.png" alt="Pastoral Educativa" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </section>
      <section className="section" id="pastoral">
        <div className="container">
          <h2 className="section__title center reveal">Eventos</h2>
          <div className="pastoral-grid">
            <div className="pastoral-card">
              <div className="mini-carousel">
                <div className="carousel-track">
                  <div className="carousel-slide"><img src="/img/pastoral/Imagen%20de%20WhatsApp%202025-10-15%20a%20las%2006.45.44_8ea3b7f4.jpg" alt="Actividad de pastoral 1" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0004.jpg" alt="Actividad de pastoral 2" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0005.jpg" alt="Actividad de pastoral 3" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0007.jpg" alt="Actividad de pastoral 3" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0008.jpg" alt="Actividad de pastoral 3" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0009.jpg" alt="Actividad de pastoral 3" /></div>
                  <div className="carousel-slide"><img src="/img/pastoral/IMG-20251015-WA0010.jpg" alt="Actividad de pastoral 3" /></div>
                </div>
                <button className="control prev">&#10094;</button>
                <button className="control next">&#10095;</button>
              </div>
              <p className="pastoral-text">Momentos de encuentro y reflexión en la Pastoral del Colegio Nuestra Señora de la Sabiduría</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="trasversales">
        <div className="container">
          <h2 className="section__title">Proyectos Transversales</h2>
          <div className="proyectos-lista">
            <div className="proyecto-item">
              <div className="proyecto-img">
                <img src="/img/proyectos/pastoral.png" alt="Pastoral Educativa" />
              </div>
              <div className="proyecto-texto">
                <h3>PASTORAL EDUCATIVA ACADÉMICA HUMANIZANTE</h3>
                <p>"Humanidad Educad Educar Humanizando"</p>
                <p>2025-2028</p>
              </div>
            </div>
            <div className="proyecto-item reverse">
              <div className="proyecto-img">
                <img src="/img/proyectos/paz.png" alt="Democracia y Paz" />
              </div>
              <div className="proyecto-texto">
                <h3>DEMOCRACIA Y PAZ</h3>
                <p>Participación activa y en paz.</p>
              </div>
            </div>
            <div className="proyecto-item">
              <div className="proyecto-img">
                <img src="/img/proyectos/PLAN.png" alt="Plan Lector" />
              </div>
              <div className="proyecto-texto">
                <h3>PLAN LECTOR</h3>
                <p>Un Mundo entre Letras.</p>
              </div>
            </div>
            <div className="proyecto-item reverse">
              <div className="proyecto-img">
                <img src="/img/proyectos/AMBIENTE.png" alt="Medio Ambiente" />
              </div>
              <div className="proyecto-texto">
                <h3>MEDIO AMBIENTE</h3>
                <p>ECOLSABI: Moldear el mundo, tarea de todos.</p>
              </div>
            </div>
            <div className="proyecto-item">
              <div className="proyecto-img">
                <img src="/img/proyectos/socio.png" alt="Educación Socioemocional" />
              </div>
              <div className="proyecto-texto">
                <h3>EDUCACIÓN SOCIOEMOCIONAL</h3>
                <p>Fortalecimiento de competencias emocionales y relaciones saludables.</p>
              </div>
            </div>
            <div className="proyecto-item reverse">
              <div className="proyecto-img">
                <img src="/img/proyectos/SEXUALIDAD.png" alt="Sexualidad" />
              </div>
              <div className="proyecto-texto">
                <h3>SEXUALIDAD</h3>
                <p>Me conozco y me expreso con dignidad y respeto.</p>
              </div>
            </div>
            <div className="proyecto-item">
              <div className="proyecto-img">
                <img src="/img/proyectos/PREVENCION.png" alt="Prevención de Desastres" />
              </div>
              <div className="proyecto-texto">
                <h3>PREVENCIÓN DE DESASTRES</h3>
                <p>¡Prevenir es vivir!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="valores">
        <div className="container">
          <h2 className="section__title center reveal">Nuestros valores</h2>
          <div className="grid-valores">
            <div className="col">
              <article className="card reveal">
                <h3 className="card__title">Amor</h3>
                <p className="card__text">Actitudes de misericordia, bondad, dulzura y respeto.</p>
              </article>
              <article className="card reveal delay-1">
                <h3 className="card__title">Verdad</h3>
                <p className="card__text">Autonomía, criticidad, compromiso ético y trabajo en equipo.</p>
              </article>
            </div>
            <div className="valores-img reveal delay-2">
              <img src="/img/aaa/valores.png" alt="Valores" />
            </div>
            <div className="col">
              <article className="card reveal delay-3">
                <h3 className="card__title">Justicia</h3>
                <p className="card__text">Solidaridad, equidad, sencillez, comunión, participación y cuidado de la casa.</p>
              </article>
              <article className="card reveal delay-4">
                <h3 className="card__title">Paz</h3>
                <p className="card__text">Fraternidad y resolución positiva de conflictos.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
