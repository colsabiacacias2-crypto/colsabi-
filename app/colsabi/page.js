export default function Colsabi() {
  return (
    <main>
      <section className="page-hero" id="convenios" aria-label="Portada de convenios">
        <div className="container">
          <h1 className="page-hero__title reveal-up">COLSABI</h1>
          <p className="page-hero__subtitle reveal-up delay-1">Conoce a nuestro dedicado equipo de trabajo y celebra las promociones que han marcado nuestra historia.</p>
        </div>
      </section>
      
      <section className="section" id="equipo">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestro <span>Equipo</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Profesionales comprometidos con la excelencia académica y la formación integral.
            </p>
          </div>

          <h3 className="section__title" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Representante legal</h3>
          <div className="team-grid reveal-up delay-1">
            <article className="team-card" data-name="Hna. Gisela Huertas Torres" data-role="Representante Legal">
              <img loading="lazy" src="/img/p/RepresentanteLegal.png" alt="Representante Legal" />
              <h4>Hna. Gisela Huertas Torres</h4>
              <p className="small">Representante Legal</p>
            </article>
          </div>
          
          <h3 className="section__title" style={{ fontSize: '1.5rem', marginTop: '3rem' }}>Directivos</h3>
          <div className="team-grid reveal-up delay-2">
            <article className="team-card" data-name="Edison Esteban Dejoy Montilla" data-role="Rector">
              <img loading="lazy" src="/img/p/EDISON ESTEBAN DEJOY MONTILLA .jpg" alt="Rector" />
              <h4>Edison Esteban Dejoy Montilla</h4>
              <p className="small">Rector</p>
            </article>
            <article className="team-card" data-name="Edy Yesid Correa Leguizamón" data-role="Coordinador Académico">
              <img loading="lazy" src="/img/p/EDY YESID CORREA LEGUIZAMÓN .jpg" alt="Coordinador Académico" />
              <h4>Edy Yesid Correa Leguizamón</h4>
              <p className="small">Coordinador Académico</p>
            </article>
            <article className="team-card" data-name="Cesar Augusto Peña Rodriguez" data-role="Coordinador de Convivencia">
              <img loading="lazy" src="/img/p/CÉSAR AUGUSTO PEÑA RODRÍGUEZ  .jpg" alt="Coordinador de Convivencia" />
              <h4>Cesar Augusto Peña Rodriguez</h4>
              <p className="small">Coordinador de Convivencia</p>
            </article>
            <article className="team-card" data-name="Nubia Alejandra Reyes Huertas" data-role="Psicoorientadora">
              <img loading="lazy" src="/img/p/NUBIA ALEJANDRA REYES HUERTAS  .jpg" alt="Psicoorientadora" />
              <h4>Nubia Alejandra Reyes Huertas</h4>
              <p className="small">Psicoorientadora</p>
            </article>
          </div>

          <h3 className="section__title" style={{ fontSize: '1.5rem', marginTop: '3rem' }}>Administrativos</h3>
          <div className="team-grid reveal-up delay-3">
            <article className="team-card" data-name="Alexander Cruz Cardona " data-role="Lider SST">
              <img loading="lazy" src="/img/p/ALEXANDER CRUZ CARDONA .jpg" alt="Lider SST" />
              <h4>Alexander Cruz Cardona</h4>
              <p className="small">Lider SST</p>
            </article>
            <article className="team-card" data-name="Leandro Polanía Yoiman" data-role="Auxiliar Contable">
              <img loading="lazy" src="/img/p/LEANDRO POLANÍA YOIMAN .jpg" alt="Auxiliar Contable" />
              <h4>Leandro Polanía Yoiman</h4>
              <p className="small">Auxiliar Contable</p>
            </article>
            <article className="team-card" data-name="Ruby Andrea Rojas Muñoz" data-role="Contadora">
              <img loading="lazy" src="/img/p/RUBY ANDREA ROJAS MUÑOZ .jpg" alt="Contadora" />
              <h4>Ruby Andrea Rojas Muñoz</h4>
              <p className="small">Contadora</p>
            </article>
            <article className="team-card" data-name="Viviana Martínez Acuña" data-role="Secretaria Académica">
              <img loading="lazy" src="/img/p/VIVIANA MARTÍNEZ ACUÑA .jpg" alt="Secretaria Académica" />
              <h4>Viviana Martínez Acuña</h4>
              <p className="small">Secretaria Académica</p>
            </article>
          </div>
        </div>
      </section>

      <section className="promociones section--alt" id="promociones">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestras <span>Promociones</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Generaciones de estudiantes que han dejado huella en nuestra institución.
            </p>
          </div>
          <div className="promociones-grid reveal-up delay-1">
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2010.jpg" alt="Promoción 2010" className="promo-img" /><h3 className="promo-title">Promoción 2010</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2011.png" alt="Promoción 2011" className="promo-img" /><h3 className="promo-title">Promoción 2011</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2012.png" alt="Promoción 2012" className="promo-img" /><h3 className="promo-title">Promoción 2012</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2013.png" alt="Promoción 2013" className="promo-img" /><h3 className="promo-title">Promoción 2013</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2014.png" alt="Promoción 2014" className="promo-img" /><h3 className="promo-title">Promoción 2014</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2015.png" alt="Promoción 2015" className="promo-img" /><h3 className="promo-title">Promoción 2015</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2017.jpg" alt="Promoción 2017" className="promo-img" /><h3 className="promo-title">Promoción 2017</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2018.png" alt="Promoción 2018" className="promo-img" /><h3 className="promo-title">Promoción 2018</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2019.png" alt="Promoción 2019" className="promo-img" /><h3 className="promo-title">Promoción 2019</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2020.jpg" alt="Promoción 2020" className="promo-img" /><h3 className="promo-title">Promoción 2020</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2021.png" alt="Promoción 2021" className="promo-img" /><h3 className="promo-title">Promoción 2021</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2022.jpg" alt="Promoción 2022" className="promo-img" /><h3 className="promo-title">Promoción 2022</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2023.jpg" alt="Promoción 2023" className="promo-img" /><h3 className="promo-title">Promoción 2023</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/2024.jpg" alt="Promoción 2024" className="promo-img" /><h3 className="promo-title">Promoción 2024</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/20252.jpg" alt="Promoción 2025-1" className="promo-img" /><h3 className="promo-title">Promoción 2025-1</h3></div>
            <div className="promo-card"><img loading="lazy" src="/img/Promociones/20251.jpg" alt="Promoción 2025-2" className="promo-img" /><h3 className="promo-title">Promoción 2025-2</h3></div>
          </div>
        </div>
      </section>
    </main>
  )
}
