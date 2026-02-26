document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav__list a');
  hamburger?.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('show');
      });
    }
  });
});
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) toTop?.classList.add('show');
  else toTop?.classList.remove('show');
});
toTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.carousel__dots');
  const interval = parseInt(carousel.dataset.interval || '4000', 10);
  const autoplay = carousel.dataset.autoplay === 'true';
  let index = 0;
  let timer = null;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsWrap.children].forEach((d, i) =>
      d.classList.toggle('active', i === index)
    );
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
    restart();
  }
  function nextSlide() { goTo(index + 1); }
  function prevSlide() { goTo(index - 1); }
  next?.addEventListener('click', nextSlide);
  prev?.addEventListener('click', prevSlide);
  function start() { if (autoplay) timer = setInterval(nextSlide, interval); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  update();
  start();
});
document.querySelectorAll('.mini-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.control.prev');
  const nextBtn = carousel.querySelector('.control.next');
  let index = 0;
  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  nextBtn?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
  prevBtn?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
});
