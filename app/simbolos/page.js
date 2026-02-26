export default function Simbolos() {
  return (
    <main>
      <section className="section" id="escudo">
        <div className="container grid grid--2">
          <div className="reveal">
            <h2 className="section__title">Escudo</h2>
            <p>La estrella de cinco puntas representa la presencia de la Congregación de las Hijas de la Sabiduría en los cinco continentes.</p>
            <p>Su propósito es difundir el evangelio y establecer el Reino de Dios.</p>
            <p>Además, la estrella simboliza la integración de la ciencia, la fe y la vida, con sus tres haces de luz.</p>
          </div>
          <div className="media reveal delay-1">
            <img src="/img/aaa/logo.png" alt="Escudo del colegio" />
          </div>
        </div>
      </section>
      <section className="section section--alt" id="bandera">
        <div className="container grid grid--2">
          <div className="media reveal">
            <img src="/img/aaa/escudo.jpg" alt="Bandera del colegio" />
          </div>
          <div className="reveal delay-1">
            <h2 className="section__title">Bandera</h2>
            <p>Amarillo quemado: pertenencia a la iglesia y riqueza de la espiritualidad Montfortiana.</p>
            <p>Blanco: sencillez, paz y verdad.</p>
            <p>Verde: compromiso con la conservación de los recursos naturales y esperanza.</p>
          </div>
        </div>
      </section>
      <section className="section" id="himnos">
        <div className="container">
          <div className="audio-box">
            <h3>Himno Colegio de Nuestra Señora de la Sabiduría</h3>
            <audio controls>
              <source src="/img/audio/colsabi.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>
    </main>
  )
}
