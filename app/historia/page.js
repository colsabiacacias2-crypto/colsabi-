export default function Historia() {
  return (
    <main>
      <section className="page-hero" aria-label="Portada de historia">
        <div className="container">
          <h1 className="page-hero__title reveal-up">Historia y Congregación</h1>
          <p className="page-hero__subtitle reveal-up delay-1">Conoce nuestras raíces, el legado de nuestros fundadores y nuestra presencia en el mundo.</p>
        </div>
      </section>

      <section className="section" id="historia">
        <div className="container grid grid--2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="reveal-up">
            <h2 className="section__title">Nuestra <span>Historia</span></h2>
            <div style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              <p>El Colegio Nuestra Señora de la Sabiduría es una institución educativa privada y católica, fundada en la ciudad de Acacías el 3 de diciembre de 1947.</p>
              <p>Su funcionamiento está aprobado por la Secretaría de Educación del Meta, inspirada por la espiritualidad de San Luis María Grignion de Montfort y la Beata María Luisa de Jesús Trichet.</p>
              <p>Tenemos como objetivo principal formar personas comprometidas con la sociedad, con valores cristianos sólidos, que trabajen por un país y un mundo más justo y fraterno.</p>
            </div>
          </div>
          <div className="media reveal-up delay-1" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-hover)' }}>
            <img loading="lazy" src="/img/aaa/fundadoras.png" alt="Fundadoras del colegio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="fundadores">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestros <span>Fundadores</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              El legado espiritual y educativo que guía nuestra misión diaria.
            </p>
          </div>
          
          <div className="grid grid--2 reveal-up delay-1" style={{ gap: '3rem' }}>
            <article className="quick-card" style={{ padding: 0, overflow: 'hidden', flexDirection: 'column' }}>
              <img loading="lazy" src="/img/fundadores/luis montfort.jpeg" alt="San Luis María Grignion de Montfort" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '0' }} />
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', color: 'var(--primary-600)' }}>San Luis María Grignion de Montfort</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Sacerdote y misionero, inspirador de nuestra obra.</p>
              </div>
            </article>
            <article className="quick-card" style={{ padding: 0, overflow: 'hidden', flexDirection: 'column' }}>
              <img loading="lazy" src="/img/fundadores/María Luisa de Jesús Trichet.jpg" alt="Beata María Luisa de Jesús Trichet" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '0' }} />
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', color: 'var(--primary-600)' }}>Beata María Luisa de Jesús Trichet</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Co-fundadora de la congregación de las Hijas de la Sabiduría.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="hijas-sabiduria">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Hijas de la <span>Sabiduría</span></h2>
          </div>
          
          <div className="media reveal-up delay-1" style={{ textAlign: 'center', margin: '1rem 0' }}>
            <img loading="lazy" src="/img/aaa/hijadelasabiduria.png" alt="Hijas de la Sabiduría" style={{ display: 'block', margin: '0 auto 2.5rem', maxWidth: '800px', width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-hover)' }} />
          </div>
          <p className="reveal-up delay-2" style={{ textAlign: 'center', fontSize: '1.15rem', color: 'var(--muted)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
            La Congregación de las Hijas de la Sabiduría fue fundada por San Luis María Grignion de Montfort y la Beata María Luisa de Jesús Trichet el 25 de marzo de 1706 en Francia. Su misión es vivir y difundir la sabiduría divina a través de la educación, la atención a los enfermos y la promoción social, especialmente entre los más necesitados.
          </p>
          
          <div className="image-gallery reveal-up delay-3">
            <div className="top-row">
              <img loading="lazy" src="/img/aaa/1.jpg" alt="Obra 1" style={{ height: '300px' }} />
              <img loading="lazy" src="/img/aaa/4.jpg" alt="Obra 2" style={{ height: '300px' }} />
              <img loading="lazy" src="/img/aaa/3.jpg" alt="Obra 3" style={{ height: '300px' }} />
            </div>
            <div className="bottom-row" style={{ marginTop: '1rem' }}>
              <img loading="lazy" src="/img/aaa/2.jpg" alt="Obra 4" style={{ height: '400px', maxWidth: '800px' }} />
            </div>
          </div>
          
          <div className="reveal-up delay-1" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Conoce más sobre la historia y el alcance de nuestra congregación.</p>
            <a href="https://www.fdlsagesse.org/en/" target="_blank" rel="noopener noreferrer" className="btn btn--accent" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>Visitar sitio oficial <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '0.5rem' }}></i></a>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="identidades">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestras Entidades en el <span>Mundo</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto' }}>
              Descubre algunas de las obras, instituciones y comunidades que comparten la espiritualidad y misión de las Hijas de la Sabiduría alrededor del mundo.
            </p>
          </div>
          
          <div className="identidades-grid reveal-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maison-general/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/casa%20general%20.png" alt="Casa General" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Casa General</strong>
            </a>
            <a href="http://fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/belgique/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/belgica.png" alt="Bélgica" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación de Bélgica</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/canada/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/canada.png" alt="Canadá" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Canadá</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/colombie/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/colombia.png" alt="Colombia" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Colombia</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/etats-unis/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/eeuu.png" alt="Estados Unidos" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Estados Unidos</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/france/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/francia.png" alt="Francia" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Francia</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/g-b-i-grande-bretagne-irlande/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/irlanda.png" alt="Irlanda" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación GBI</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/haiti/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/haiti.png" alt="Haití" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Haití</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/hollande/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/holanda.png" alt="Holanda" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación Holanda</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/inde/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/india.png" alt="India" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>India</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/italie/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/italia.png" alt="Italia" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Italia</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/madagascar/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/madagascar.png" alt="Madagascar" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Madagascar</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/malawi/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/malawi.png" alt="Malawi" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación de Malawi</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maria-luisa/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/maria%20lucia%20.png" alt="Maria Lucia" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación María Lucia</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/delegations-de-png-des-philippines-et-du-secteur-indonesie/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/asia%20oceania%20.png" alt="Asia Oceanía" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación Asia Oceanía</strong>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/rdc-r-c-du-congo/" target="_blank" rel="noopener noreferrer" className="quick-card" style={{ padding: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <img loading="lazy" src="/img/aaa/rd.png" alt="RD del Congo" style={{ height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
              <strong>Delegación RDC</strong>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
