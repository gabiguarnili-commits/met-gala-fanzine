gsap.registerPlugin(ScrollTrigger);

const pista = document.querySelector('#pista');
const flash = document.querySelector('#flash');
const contador = document.querySelector('#contador');
const luz = document.querySelector('#luz');
const chispas = document.querySelector('#chispas');
const sonido = new Audio('assets/audio/camara.mp3');
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Recorrido: el scroll vertical camina la alfombra hacia la derecha */
const distancia = () => pista.scrollWidth - window.innerWidth;

const recorrido = gsap.to(pista, {
  x: () => -distancia(),
  ease: 'none',
  scrollTrigger: {
    trigger: '#recorrido',
    pin: true,
    scrub: 1,
    end: () => '+=' + distancia(),
    invalidateOnRefresh: true
  }
});

/* 2. Entrada del título: letra por letra */
document.querySelectorAll('.titulo-gigante .linea').forEach((linea) => {
  const texto = linea.textContent;
  linea.innerHTML = '';
  [...texto].forEach((c) => {
    const s = document.createElement('span');
    s.className = 'letra';
    s.textContent = c;
    linea.appendChild(s);
  });
});

if (!reducir) {
  gsap.from('.titulo-gigante .letra', {
    y: 120, opacity: 0, rotation: () => gsap.utils.random(-25, 25),
    duration: 1, ease: 'back.out(1.6)', stagger: 0.09, delay: 0.2
  });
  gsap.from('.etiqueta, .escena--entrada .subtitulo', {
    opacity: 0, y: 20, duration: 0.8, delay: 1, stagger: 0.2
  });
}

/* 3. Las demás escenas aparecen al llegar */
gsap.utils.toArray('.revista, .polaroid, .titulo-puertas').forEach((el) => {
  gsap.from(el, {
    opacity: 0, y: 70, scale: 0.9, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: el, containerAnimation: recorrido,
      start: 'left 85%', toggleActions: 'play none none reverse'
    }
  });
});

gsap.from('.puerta', {
  opacity: 0, y: 90, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.15,
  scrollTrigger: {
    trigger: '.puertas', containerAnimation: recorrido,
    start: 'left 85%', toggleActions: 'play none none reverse'
  }
});

/* 4. Pegatina que gira */
if (!reducir) {
  gsap.to('.pegatina', { rotation: 360, duration: 12, repeat: -1, ease: 'none' });
}

/* 5. Luz que sigue al mouse */
const moverX = gsap.quickTo(luz, 'x', { duration: 0.5, ease: 'power3' });
const moverY = gsap.quickTo(luz, 'y', { duration: 0.5, ease: 'power3' });
window.addEventListener('mousemove', (e) => { moverX(e.clientX); moverY(e.clientY); });

/* 6. Chispas doradas flotando */
if (!reducir) {
  for (let i = 0; i < 26; i++) {
    const c = document.createElement('span');
    c.className = 'chispa';
    c.textContent = '✦';
    c.style.left = gsap.utils.random(0, 100) + '%';
    c.style.top = gsap.utils.random(0, 100) + '%';
    c.style.fontSize = gsap.utils.random(8, 22) + 'px';
    chispas.appendChild(c);
    gsap.to(c, {
      y: gsap.utils.random(-60, 60), x: gsap.utils.random(-30, 30),
      opacity: gsap.utils.random(0.15, 0.9), rotation: gsap.utils.random(-90, 90),
      duration: gsap.utils.random(2, 5), repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }
}

/* 7. Clic = foto: flash, sonido y contador */
let fotos = 0;
document.addEventListener('click', (e) => {
  if (e.target.closest('a')) return;
  fotos++;
  contador.textContent = fotos;
  sonido.currentTime = 0;
  sonido.play().catch(() => {});
  gsap.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.5, ease: 'power2.out' });
});