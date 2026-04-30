export default function Peahs() {
  return (
    <main>
      <section className="page-hero" aria-label="Portada de convenios">
        <div className="container">
          <h1 className="page-hero__title reveal-up">PEAHS</h1>
          <p className="page-hero__subtitle reveal-up delay-1">Pastoral Educativa Académica Humanizante Sabiduría. Un camino hacia la integración de la Ciencia, la Fe y la Vida.</p>
        </div>
      </section>

      <section className="section" id="que-es">
        <div className="container grid grid--2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="reveal-up">
            <h2 className="section__title">¿Qué es <span>PEAHS</span>?</h2>
            <div style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              <p>Es un proyecto institucional dinámico que integra la fe, la ciencia, la tecnología y la biodiversidad para dar un verdadero sentido a la vida educativa.</p>
              <p>Buscamos no solo impartir conocimientos, sino tocar los corazones y transformar las mentes de nuestros estudiantes.</p>
            </div>
          </div>
          <div className="media reveal-up delay-1" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-hover)' }}>
            <img loading="lazy" src="/img/aaa/Captura%20de%20pantalla%202025-10-01%20152341.png" alt="Pastoral Educativa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="objetivo">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestro <span>Objetivo</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
              &quot;Brindar una formación integral fortaleciendo las capacidades intelectuales, afectivas, sociales y trascendentales desde un enfoque profundamente humanizante.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="pastoral">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Eventos <span>Pastorales</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Momentos de encuentro, oración y reflexión en comunidad.
            </p>
          </div>
          <div className="pastoral-grid reveal-up delay-1" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="pastoral-card" style={{ background: 'var(--surface-blue)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
              <div className="mini-carousel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <div className="carousel-track">
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/Imagen%20de%20WhatsApp%202025-10-15%20a%20las%2006.45.44_8ea3b7f4.jpg" alt="Actividad de pastoral 1" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0004.jpg" alt="Actividad de pastoral 2" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0005.jpg" alt="Actividad de pastoral 3" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0007.jpg" alt="Actividad de pastoral 4" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0008.jpg" alt="Actividad de pastoral 5" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0009.jpg" alt="Actividad de pastoral 6" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                  <div className="carousel-slide"><img loading="lazy" src="/img/pastoral/IMG-20251015-WA0010.jpg" alt="Actividad de pastoral 7" style={{ width: '100%', height: '400px', objectFit: 'cover' }} /></div>
                </div>
                <button className="control prev">&#10094;</button>
                <button className="control next">&#10095;</button>
              </div>
              <p className="pastoral-text" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: '600', color: 'var(--primary-600)' }}>Galería de Pastoral</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="trasversales">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section__title">Proyectos <span>Transversales</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Iniciativas institucionales que permean todas las áreas del conocimiento para formar ciudadanos ejemplares.
            </p>
          </div>
          
          <div className="proyectos-lista" style={{ display: 'grid', gap: '3rem' }}>
            <div className="proyecto-item reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
              <div className="proyecto-img" style={{ textAlign: 'center' }}>
                <img loading="lazy" src="/img/proyectos/pastoral.png" alt="Pastoral Educativa" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto">
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>PASTORAL EDUCATIVA ACADÉMICA HUMANIZANTE</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>&quot;Humanidad Educad Educar Humanizando&quot;</p>
                <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>2025-2028</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)', direction: 'rtl' }}>
              <div className="proyecto-img" style={{ textAlign: 'center', direction: 'ltr' }}>
                <img loading="lazy" src="/img/proyectos/paz.png" alt="Democracia y Paz" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto" style={{ direction: 'ltr' }}>
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>DEMOCRACIA Y PAZ</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Participación activa y en paz para construir sociedad.</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
              <div className="proyecto-img" style={{ textAlign: 'center' }}>
                <img loading="lazy" src="/img/proyectos/PLAN.png" alt="Plan Lector" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto">
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>PLAN LECTOR</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Un Mundo entre Letras.</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)', direction: 'rtl' }}>
              <div className="proyecto-img" style={{ textAlign: 'center', direction: 'ltr' }}>
                <img loading="lazy" src="/img/proyectos/AMBIENTE.png" alt="Medio Ambiente" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto" style={{ direction: 'ltr' }}>
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>MEDIO AMBIENTE</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>ECOLSABI: Moldear el mundo, tarea de todos.</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
              <div className="proyecto-img" style={{ textAlign: 'center' }}>
                <img loading="lazy" src="/img/proyectos/socio.png" alt="Educación Socioemocional" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto">
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>EDUCACIÓN SOCIOEMOCIONAL</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Fortalecimiento de competencias emocionales y relaciones saludables.</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)', direction: 'rtl' }}>
              <div className="proyecto-img" style={{ textAlign: 'center', direction: 'ltr' }}>
                <img loading="lazy" src="/img/proyectos/SEXUALIDAD.png" alt="Sexualidad" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto" style={{ direction: 'ltr' }}>
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>SEXUALIDAD</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Me conozco y me expreso con dignidad y respeto.</p>
              </div>
            </div>
            
            <div className="proyecto-item reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--card)', padding: '2rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
              <div className="proyecto-img" style={{ textAlign: 'center' }}>
                <img loading="lazy" src="/img/proyectos/PREVENCION.png" alt="Prevención de Desastres" style={{ maxHeight: '200px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
              <div className="proyecto-texto">
                <h3 style={{ color: 'var(--primary-600)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>PREVENCIÓN DE DESASTRES</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>¡Prevenir es vivir!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="valores">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestros <span>Valores</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Los pilares que sostienen la formación ética y moral de nuestra institución.
            </p>
          </div>
          
          <div className="grid-valores" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '3rem', alignItems: 'center' }}>
            <div className="col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <article className="quick-card reveal-up delay-1" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <i className="fa-solid fa-heart" style={{ fontSize: '2rem', color: '#e11d48' }}></i>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Amor</h3>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Actitudes de misericordia, bondad, dulzura y respeto hacia el prójimo.</p>
              </article>
              <article className="quick-card reveal-up delay-2" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <i className="fa-solid fa-lightbulb" style={{ fontSize: '2rem', color: 'var(--accent)' }}></i>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Verdad</h3>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Autonomía, criticidad, compromiso ético y trabajo en equipo constante.</p>
              </article>
            </div>
            
            <div className="valores-img reveal-up" style={{ textAlign: 'center', padding: '2rem', background: 'var(--surface-green)', borderRadius: '50%', boxShadow: 'var(--shadow-hover)' }}>
              <img loading="lazy" src="/img/aaa/valores.png" alt="Valores" style={{ width: '250px', height: '250px', objectFit: 'contain' }} />
            </div>
            
            <div className="col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <article className="quick-card reveal-up delay-3" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <i className="fa-solid fa-scale-balanced" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Justicia</h3>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Solidaridad, equidad, sencillez, comunión, participación y cuidado de la casa común.</p>
              </article>
              <article className="quick-card reveal-up delay-4" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <i className="fa-solid fa-dove" style={{ fontSize: '2rem', color: 'var(--success)' }}></i>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Paz</h3>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Fomento de la fraternidad y resolución positiva de conflictos.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
