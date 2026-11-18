gsap.registerPlugin(ScrollTrigger);

const pista = document.querySelector('#pista');
const progreso = document.querySelector('.progreso');
const adornos = document.querySelector('.adornos');
const flash = document.querySelector('.flash');
const sonido = new Audio('assets/audio/camara.mp3');
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const distancia = () => pista.scrollWidth - window.innerWidth;

/* 1. El scroll vertical recorre la sala de lado a lado + barra de progreso */
const recorrido = gsap.to(pista, {
  x: () => -distancia(),
  ease: 'none',
  scrollTrigger: {
    trigger: '#recorrido',
    pin: true,
    scrub: 1,
    end: () => '+=' + distancia(),
    invalidateOnRefresh: true,
    onUpdate: (self) => gsap.set(progreso, { scaleX: self.progress })
  }
});

/* 2. Título: entra letra por letra */
document.querySelectorAll('.titulo-sala[data-split]').forEach((t) => {
  const partes = t.innerHTML.split('<br>');
  t.innerHTML = partes
    .map((p) => [...p].map((c) => `<span class="letra">${c}</span>`).join(''))
    .join('<br>');
});
if (!reducir) {
  gsap.from('.titulo-sala .letra', {
    y: 100, opacity: 0, rotation: () => gsap.utils.random(-20, 20),
    duration: 0.9, ease: 'back.out(1.6)', stagger: 0.06, delay: 0.2
  });
  gsap.from('.pegatina', { scale: 0, rotation: -180, duration: 0.9, delay: 1, ease: 'back.out(2)' });
  gsap.to('.pegatina', { y: -12, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
}

/* 3. Cuadros y textos aparecen al llegar a ellos */
gsap.utils.toArray('.cuadro, .texto-sala').forEach((el) => {
  gsap.from(el, {
    opacity: 0, y: 70, scale: 0.9, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: el, containerAnimation: recorrido,
      start: 'left 88%', toggleActions: 'play none none reverse'
    }
  });
});

/* 4. Adornos flotantes de fondo (el símbolo cambia con cada sala) */
if (!reducir) {
  for (let i = 0; i < 18; i++) {
    const a = document.createElement('span');
    a.className = 'adorno';
    a.style.left = gsap.utils.random(0, 100) + '%';
    a.style.top = gsap.utils.random(0, 100) + '%';
    a.style.fontSize = gsap.utils.random(14, 48) + 'px';
    adornos.appendChild(a);
    gsap.to(a, {
      y: gsap.utils.random(-80, 80), rotation: gsap.utils.random(-120, 120),
      opacity: gsap.utils.random(0.1, 0.6),
      duration: gsap.utils.random(3, 7), repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }
}

/* 5. Clic en un cuadro = foto con flash y sonido */
document.querySelectorAll('.cuadro').forEach((c) => {
  c.addEventListener('click', () => {
    sonido.currentTime = 0;
    sonido.play().catch(() => {});
    gsap.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.fromTo(c, { rotation: '+=0' }, { rotation: '+=4', duration: 0.12, yoyo: true, repeat: 3 });
  });
});