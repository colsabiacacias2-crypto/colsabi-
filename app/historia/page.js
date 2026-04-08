export default function Historia() {
  return (
    <main>
      <section className="hero" aria-label="Portada de historia">
        <div className="hero__bg"></div>
        <div className="container hero__content">
          <h1 className="hero__title reveal">Historia y Congregación</h1>
          <p className="hero__subtitle reveal delay-1">Conoce nuestras raíces, fundadores y presencia en el mundo.</p>
        </div>
      </section>

      <section className="section" id="historia">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section__title">Nuestra Historia</h2>
            <p>El Colegio Nuestra Señora de la Sabiduría es una institución educativa privada y católica, fundada en la ciudad de Acacías el 3 de diciembre de 1947.</p>
            <p>Su funcionamiento está aprobado por la Secretaría de Educación del Meta, inspirada por San Luis María Grignion de Montfort y la Beata María Luisa de Jesús Trichet.</p>
            <p>El colegio tiene como objetivo formar personas comprometidas con la sociedad, que trabajen por un país y un mundo más justo.</p>
          </div>
          <div className="media reveal delay-1">
            <img src="/img/aaa/fundadoras.png" alt="Fundadoras del colegio" />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="fundadores">
        <div className="container">
          <h2 className="section__title center">Fundadores</h2>
          <div className="grid grid--2">
            <article className="card">
              <img src="/img/fundadores/luis montfort.jpeg" alt="San Luis María Grignion de Montfort" />
              <h3 className="card__title">San Luis María Grignion de Montfort</h3>
            </article>
            <article className="card">
              <img src="/img/fundadores/María Luisa de Jesús Trichet.jpg" alt="Beata María Luisa de Jesús Trichet" />
              <h3 className="card__title">Beata María Luisa de Jesús Trichet</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="hijas-sabiduria">
        <div className="container">
          <h2 className="section__title center reveal">Hijas de la Sabiduría</h2>
          <div className="media reveal delay-1" style={{ textAlign: 'center', margin: '1rem 0' }}>
            <img src="/img/aaa/hijadelasabiduria.png" alt="Hijas de la Sabiduría" style={{ display: 'block', margin: '1.5rem auto', maxWidth: '700px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          </div>
          <p className="center reveal delay-1">
            La Congregación de las Hijas de la Sabiduría fue fundada por San Luis María Grignion de Montfort y la Beata María Luisa de Jesús Trichet
            el 25 de marzo de 1706 en Francia. Su misión es vivir y difundir la sabiduría divina a través de la educación, la atención a los enfermos 
            y la promoción social, especialmente entre los más necesitados.
          </p>
          <div className="image-gallery">
            <div className="top-row">
              <img src="/img/aaa/1.jpg" alt="Foto 1" />
              <img src="/img/aaa/4.jpg" alt="Foto 2" />
              <img src="/img/aaa/3.jpg" alt="Foto 3" />
            </div>
            <div className="bottom-row">
              <img src="/img/aaa/2.jpg" alt="Foto 4" />
            </div>
          </div>
          <p className="center">
            Conoce más sobre la congregación: <a href="https://www.fdlsagesse.org/en/" target="_blank" rel="noopener noreferrer" className="btn btn--sm">Ver</a>
          </p>
        </div>
      </section>

      <section className="section identidades section--alt" id="identidades">
        <div className="container">
          <h2 className="section__title center reveal">Nuestras Entidades en el Mundo</h2>
          <p className="center reveal delay-1">
            Descubre algunas de las obras, instituciones y comunidades que comparten la espiritualidad y misión de las Hijas de la Sabiduría alrededor del mundo.
          </p>
          <div className="identidades-grid reveal delay-2">
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maison-general/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/casa%20general%20.png" alt="Casa General" />
              <h3>Casa General</h3>
            </a>
            <a href="http://fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/belgique/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/belgica.png" alt="Bélgica" />
              <h3>Delegación de Bélgica</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/canada/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/canada.png" alt="Canadá" />
              <h3>Canadá</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/colombie/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/colombia.png" alt="Colombia" />
              <h3>Colombia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/etats-unis/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/eeuu.png" alt="Estados Unidos" />
              <h3>Estados Unidos</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/france/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/francia.png" alt="Francia" />
              <h3>Francia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/g-b-i-grande-bretagne-irlande/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/irlanda.png" alt="Irlanda" />
              <h3>Delegación GBI - Gran Bretaña-Irlanda</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/haiti/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/haiti.png" alt="Haití" />
              <h3>Haití</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/hollande/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/holanda.png" alt="Holanda" />
              <h3>Delegación Holanda</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/inde/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/india.png" alt="India" />
              <h3>India</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/italie/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/italia.png" alt="Italia" />
              <h3>Italia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/madagascar/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/madagascar.png" alt="Madagascar" />
              <h3>Madagascar</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/malawi/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/malawi.png" alt="Malawi" />
              <h3>Delegación de Malawi</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maria-luisa/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/maria%20lucia%20.png" alt="Maria Lucia" />
              <h3>Delegación María Lucia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/delegations-de-png-des-philippines-et-du-secteur-indonesie/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/asia%20oceania%20.png" alt="Asia Oceanía" />
              <h3>Delegación Asia Oceanía</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/rdc-r-c-du-congo/" target="_blank" rel="noopener noreferrer" className="identidad-card">
              <img src="/img/aaa/rd.png" alt="RD del Congo" />
              <h3>Delegación RDC - RD del Congo</h3>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
