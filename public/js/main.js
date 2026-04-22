document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav__list a');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    links.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('show');
      });
    }
  });
});

const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

const reveals = document.querySelectorAll('.reveal, .reveal-up');
if (reveals.length > 0 && typeof IntersectionObserver !== 'undefined') {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible', 'is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
}

document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.carousel__dots');
  
  if (!track || !dotsWrap || slides.length === 0) return; // FIX: Prevent crashes if elements are missing

  const interval = parseInt(carousel.dataset.interval || '4000', 10);
  const autoplay = carousel.dataset.autoplay === 'true';
  let index = 0;
  let timer = null;
  
  // Clear previous dots if any (React strict mode fix)
  dotsWrap.innerHTML = '';
  
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
  if (!track) return;
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

// Team Carousel Logic
const teamCarouselWrapper = document.querySelector('.team-carousel-wrapper');
if (teamCarouselWrapper) {
  const track = teamCarouselWrapper.querySelector('.team-carousel-track');
  if (track) {
    let slides = Array.from(teamCarouselWrapper.querySelectorAll('.team-slide'));
    const prevBtn = teamCarouselWrapper.querySelector('.team-carousel-btn.prev');
    const nextBtn = teamCarouselWrapper.querySelector('.team-carousel-btn.next');
  
  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 3500; // 3.5 segundos por movimiento
  let isTransitioning = false;
  
  // 1. Clonar elementos para el bucle infinito
  // Clonamos los primeros 4 y los últimos 4 elementos (suficientes para llenar la vista)
  const clonesCount = 4;
  
  // Clonar al final
  for (let i = 0; i < clonesCount; i++) {
    if (slides[i]) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    }
  }
  
  // Clonar al inicio
  for (let i = slides.length - 1; i >= Math.max(0, slides.length - clonesCount); i--) {
    if (slides[i]) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      track.insertBefore(clone, track.firstChild);
    }
  }
  
  // Actualizar lista de slides incluyendo clones
  slides = Array.from(teamCarouselWrapper.querySelectorAll('.team-slide'));
  
  // Empezar en el primer elemento real (índice = clonesCount)
  currentIndex = clonesCount;
  
  function getVisibleSlides() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }
  
  function updateCarousel(smooth = true) {
    const visibleSlides = getVisibleSlides();
    
    // Si no es smooth (para el salto instantáneo), quitamos la transición
    if (!smooth) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    }
    
    // Calcular el porcentaje basado en el slide base
    // Cada slide ocupa (100 / visibleSlides)% (aunque en css usamos calc(25% - gap))
    // Para ser exactos con el gap de CSS, calculamos el porcentaje de traslación
    // Un slide = 100% de su propio ancho. Como el track usa display:flex y gap, 
    // lo más seguro es usar unidades basadas en el ancho del elemento
    
    // Una forma más precisa que funciona con gaps:
    const slideWidth = 100 / visibleSlides;
    const translatePercentage = -(currentIndex * slideWidth);
    track.style.transform = `translateX(${translatePercentage}%)`;
    
    // Restaurar la transición después del salto instantáneo
    if (!smooth) {
      // Forzar un reflow para que el navegador aplique el 'none' antes de restaurar
      track.offsetHeight;
      track.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  }
  
  // Evento para detectar el fin de la transición
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    const realSlidesCount = slides.length - (clonesCount * 2);
    
    // Si nos pasamos hacia la derecha (entramos en los clones finales)
    if (currentIndex >= clonesCount + realSlidesCount) {
      currentIndex = currentIndex - realSlidesCount;
      updateCarousel(false); // Salto instantáneo
    }
    // Si nos pasamos hacia la izquierda (entramos en los clones iniciales)
    else if (currentIndex < clonesCount) {
      currentIndex = currentIndex + realSlidesCount;
      updateCarousel(false); // Salto instantáneo
    }
  });
  
  function goNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
  }

  function goPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
  }

  // Eventos de botones
  nextBtn?.addEventListener('click', () => {
    goNext();
    resetAutoplay();
  });
  
  prevBtn?.addEventListener('click', () => {
    goPrev();
    resetAutoplay();
  });
  
  // Autoplay Logic
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goNext, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausar al pasar el mouse por encima
  teamCarouselWrapper.addEventListener('mouseenter', stopAutoplay);
  teamCarouselWrapper.addEventListener('mouseleave', startAutoplay);
  
  // Actualizar en resize
  window.addEventListener('resize', () => {
    // Para evitar glitches durante el resize
    track.style.transition = 'none';
    updateCarousel(false);
    resetAutoplay();
  });
  
  // Inicializar sin animación para colocar en la posición correcta
  updateCarousel(false);
  startAutoplay();
  }
}
