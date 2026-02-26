export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio" aria-label="Portada con eslogan">
        <div className="hero__bg"></div>
        <div className="container hero__content">
          <h1 className="hero__title reveal">Educación con propósito</h1>
          <p className="hero__subtitle reveal delay-1">Camino hacia la integración de la Ciencia, la fe y la Vida.</p>
          <div className="hero__cta reveal delay-2">
            <a href="#nosotros" className="btn">Conócenos</a>
            <a href="#contacto" className="btn btn--outline">Admisiones</a>
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
            Conoce más sobre la congregación: <a href="https://www.fdlsagesse.org/en/" target="_blank" className="btn btn--sm">Ver</a>
          </p>
        </div>
      </section>

      <section className="section identidades" id="identidades">
        <div className="container">
          <h2 className="section__title center reveal">Nuestras Entidades en el Mundo</h2>
          <p className="center reveal delay-1">
            Descubre algunas de las obras, instituciones y comunidades que comparten la espiritualidad y misión de las Hijas de la Sabiduría alrededor del mundo.
          </p>
          <div className="identidades-grid reveal delay-2">
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maison-general/" target="_blank" className="identidad-card">
              <img src="/img/aaa/casa%20general%20.png" />
              <h3>Casa General</h3>
            </a>
            <a href="http://fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/belgique/" target="_blank" className="identidad-card">
              <img src="/img/aaa/belgica.png" />
              <h3>Delegación de Bégica</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/canada/" target="_blank" className="identidad-card">
              <img src="/img/aaa/canada.png" />
              <h3>Canadá</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/colombie/" target="_blank" className="identidad-card">
              <img src="/img/aaa/colombia.png" />
              <h3>Colombia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/etats-unis/" target="_blank" className="identidad-card">
              <img src="/img/aaa/eeuu.png" />
              <h3>Estados Unidos </h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/france/" target="_blank" className="identidad-card">
              <img src="/img/aaa/francia.png" />
              <h3>Francia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/g-b-i-grande-bretagne-irlande/" target="_blank" className="identidad-card">
              <img src="/img/aaa/irlanda.png" />
              <h3>Delegación GBI - Gran Bretaña-Irlanda</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/haiti/" target="_blank" className="identidad-card">
              <img src="/img/aaa/haiti.png" />
              <h3>Haití</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/hollande/" target="_blank" className="identidad-card">
              <img src="/img/aaa/holanda.png" />
              <h3>CDelegación Holanda</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/inde/" target="_blank" className="identidad-card">
              <img src="/img/aaa/india.png" />
              <h3>India</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/italie/" target="_blank" className="identidad-card">
              <img src="/img/aaa/italia.png" />
              <h3>Italia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/madagascar/" target="_blank" className="identidad-card">
              <img src="/img/aaa/madagascar.png" />
              <h3>Madagascar</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/malawi/" target="_blank" className="identidad-card">
              <img src="/img/aaa/malawi.png" />
              <h3>Delegación de Malawi</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/maria-luisa/" target="_blank" className="identidad-card">
              <img src="/img/aaa/maria%20lucia%20.png" />
              <h3>Delegación María Lucia</h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/delegations-de-png-des-philippines-et-du-secteur-indonesie/" target="_blank" className="identidad-card">
              <img src="/img/aaa/asia%20oceania%20.png" />
              <h3>Delegación Asia Oceanía </h3>
            </a>
            <a href="https://www.fdlsagesse.org/en/about-the-daughters-of-wisdom/nos-entites/rdc-r-c-du-congo/" target="_blank" className="identidad-card">
              <img src="/img/aaa/rd.png" alt="Comunidad Brasil" />
              <h3>Delegación RDC - RD del Congo</h3>
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="nosotros">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section__title">Historia</h2>
            <p>El Colegio Nuestra Señora de la Sabiduría es una institución educativa privada y católica, fundada en la ciudad de Acacías el 3 de diciembre de 1947.</p>
            <p>Su funcionamiento está aprobado por la Secretaría de Educación del Meta, los fundadores de la congregación, San Luis María Grignion de Montfort y la beata María Luisa de Jesús Trichet.</p>
            <p>Finalmente, el colegio tiene como objetivo formar personas comprometidas con la sociedad, que trabajen por un país y un mundo más justo.</p>
            <a href="/historia" className="btn btn--sm">Ver más</a>
          </div>
          <div className="media reveal delay-1">
            <img src="/img/aaa/fundadoras.png" alt="Fundadoras del colegio" />
          </div>
        </div>
      </section>

      <section className="section" id="fundadores">
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

      <section className="section section--alt" id="contacto">
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
