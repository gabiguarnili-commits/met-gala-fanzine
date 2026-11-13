gsap.registerPlugin(ScrollTrigger);

const pista = document.querySelector('#pista');
const distancia = () => pista.scrollWidth - window.innerWidth;

// El scroll vertical recorre la sala de lado a lado
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

// Cada cuadro y cada texto aparecen al entrar a la pantalla
gsap.utils.toArray('.cuadro, .texto-sala').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    scale: 0.92,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      containerAnimation: recorrido,
      start: 'left 85%',
      toggleActions: 'play none none reverse'
    }
  });
});