gsap.registerPlugin(ScrollTrigger);

const pista = document.querySelector('#pista');
const flash = document.querySelector('#flash');

// Distancia que hay que recorrer horizontalmente
const distancia = () => pista.scrollWidth - window.innerWidth;

// El scroll vertical mueve la pista hacia la izquierda: "caminas" por la alfombra
gsap.to(pista, {
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

// Flash de cámara al hacer clic
document.addEventListener('click', () => {
  gsap.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.5, ease: 'power2.out' });
});