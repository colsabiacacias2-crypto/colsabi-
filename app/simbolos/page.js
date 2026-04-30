export default function Simbolos() {
  return (
    <main>
      <section className="page-hero" aria-label="Portada de simbolos">
        <div className="container">
          <h1 className="page-hero__title reveal-up">Nuestros Símbolos</h1>
          <p className="page-hero__subtitle reveal-up delay-1">El escudo, la bandera y el himno que representan nuestra identidad, fe y compromiso institucional.</p>
        </div>
      </section>

      <section className="section" id="escudo">
        <div className="container grid grid--2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="reveal-up">
            <h2 className="section__title">Nuestro <span>Escudo</span></h2>
            <div style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              <p>La estrella de cinco puntas representa la presencia de la Congregación de las Hijas de la Sabiduría en los cinco continentes.</p>
              <p>Su propósito es difundir el evangelio y establecer el Reino de Dios en cada rincón del mundo.</p>
              <p>Además, la estrella simboliza la integración de la ciencia, la fe y la vida, guiados siempre por la luz divina.</p>
            </div>
          </div>
          <div className="media reveal-up delay-1" style={{ textAlign: 'center', background: 'var(--surface-blue)', padding: '3rem', borderRadius: '32px' }}>
            <img loading="lazy" src="/img/aaa/logo.png" alt="Escudo del colegio" style={{ maxWidth: '300px', margin: '0 auto', display: 'block', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }} />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="bandera">
        <div className="container grid grid--2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="media reveal-up" style={{ textAlign: 'center', background: 'var(--card)', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
            <img loading="lazy" src="/img/aaa/escudo.jpg" alt="Bandera del colegio" style={{ maxWidth: '100%', borderRadius: '16px', display: 'block', margin: '0 auto' }} />
          </div>
          <div className="reveal-up delay-1">
            <h2 className="section__title">Nuestra <span>Bandera</span></h2>
            <div style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              <p><strong style={{ color: 'var(--accent)' }}>Amarillo quemado:</strong> Representa nuestra pertenencia a la iglesia y la gran riqueza de la espiritualidad Montfortiana.</p>
              <p><strong style={{ color: 'var(--muted)' }}>Blanco:</strong> Simboliza la sencillez, la paz interior y la búsqueda constante de la verdad.</p>
              <p><strong style={{ color: 'var(--success)' }}>Verde:</strong> Refleja nuestro firme compromiso con la conservación de los recursos naturales y la esperanza en el futuro.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="himnos">
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section__title">Nuestro <span>Himno</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
              Las voces que nos unen como comunidad y elevan nuestro espíritu sabidureño.
            </p>
          </div>
          <div className="audio-box reveal-up delay-1" style={{ background: 'var(--surface-blue)', padding: '3rem', borderRadius: '32px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', boxShadow: 'var(--shadow-hover)' }}>
            <h3 style={{ color: 'var(--primary-600)', fontSize: '1.5rem', marginBottom: '2rem' }}>Himno Colegio de Nuestra Señora de la Sabiduría</h3>
            <audio controls style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
              <source src="/img/audio/colsabi.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>
    </main>
  )
}
