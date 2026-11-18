const preguntas = [
  { q: 'Te llega la invitación a la Met Gala. ¿Qué haces primero?',
    o: [['Llamo a un diseñador para bordar algo con oro y perlas', 'celestial'],
        ['Grito, llamo a mis amigos y planeo tres cambios de look', 'camp'],
        ['Busco un cuadro famoso para convertirlo en vestido', 'arte']] },
  { q: 'Doscientos fotógrafos gritan tu nombre en la alfombra roja. ¿Cuál es tu pose?',
    o: [['Manos juntas y mirada al cielo, como un santo de vitral', 'celestial'],
        ['Giro, salto y abanico gigante', 'camp'],
        ['Me quedo inmóvil como una estatua', 'arte']] },
  { q: '¿Qué no puede faltar en tu outfit?',
    o: [['Una corona o una joya que parezca reliquia', 'celestial'],
        ['Algo que brille, se mueva o haga ruido', 'camp'],
        ['Una silueta que parezca una escultura', 'arte']] },
  { q: 'Ya adentro, ¿qué sala del museo visitas primero?',
    o: [['La de catedrales y tesoros antiguos', 'celestial'],
        ['La tienda de souvenirs: quiero todo', 'camp'],
        ['La de pinturas: me quedo una hora frente a un cuadro', 'arte']] },
  { q: '¿Qué titular quieres leer mañana sobre tu look?',
    o: [['«Un milagro de la moda»', 'celestial'],
        ['«Escandaloso, y nadie pudo dejar de mirarlo»', 'camp'],
        ['«Una obra maestra»', 'arte']] }
];

const resultados = {
  celestial: { sala: 'Sala 1 · 2018', nombre: 'Heavenly Bodies',
    texto: 'Llegas como una aparición: oro, bordados y una corona de otro mundo. Los fotógrafos bajan la voz cuando pasas.', link: 'heavenly-bodies.html' },
  camp: { sala: 'Sala 2 · 2019', nombre: 'Camp',
    texto: 'Eres exceso, humor y espectáculo. Tu look tiene plumas, brillo y no pide permiso. La fiesta empieza cuando entras.', link: 'camp.html' },
  arte: { sala: 'Sala 3 · 2026', nombre: 'Costume Art',
    texto: 'Eres una obra en movimiento. Tu look podría colgar en un museo, y alguien ya se quedó mirándolo diez minutos.', link: 'costume-art.html' }
};

const caja = document.querySelector('#caja');
const barra = document.querySelector('#barra');
const flash = document.querySelector('#flash');
const confeti = document.querySelector('#confeti');
const etiqueta = document.querySelector('#etiqueta');
const titulo = document.querySelector('#titulo');
const sonido = new Audio('assets/audio/camara.mp3');
let actual = 0;
let puntos = { celestial: 0, camp: 0, arte: 0 };

document.querySelector('#empezar').addEventListener('click', () => { actual = 0; mostrar(); });

function mostrar() {
  const p = preguntas[actual];
  barra.style.width = (actual / preguntas.length) * 100 + '%';
  etiqueta.textContent = `Pregunta ${actual + 1} de ${preguntas.length}`;
  caja.innerHTML = `<p class="quiz__pregunta">${p.q}</p><div class="opciones"></div>`;
  const cont = caja.querySelector('.opciones');
  p.o.forEach(([texto, tipo]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opcion';
    b.textContent = texto;
    b.addEventListener('click', () => responder(tipo));
    cont.appendChild(b);
  });
  gsap.from(caja.children, { opacity: 0, y: 30, duration: 0.5, stagger: 0.12 });
}

function responder(tipo) {
  puntos[tipo]++;
  actual++;
  // mini flash de cámara en cada respuesta
  gsap.fromTo(flash, { opacity: 0.55 }, { opacity: 0, duration: 0.35 });
  if (actual < preguntas.length) mostrar();
  else terminar();
}

function terminar() {
  const ganador = Object.keys(puntos).sort((a, b) => puntos[b] - puntos[a])[0];
  const r = resultados[ganador];
  barra.style.width = '100%';
  etiqueta.textContent = 'Tu look es...';
  titulo.textContent = '¡Sonríe, te están fotografiando!';
  caja.innerHTML = `
    <div class="resultado__tarjeta">
      <p class="resultado__sala">${r.sala}</p>
      <h2 class="resultado__nombre">${r.nombre}</h2>
      <p class="resultado__texto">${r.texto}</p>
      <div class="resultado__acciones">
        <a class="boton" href="${r.link}">Visitar mi sala</a>
        <button class="boton boton--claro" type="button" id="repetir">Repetir quiz</button>
      </div>
    </div>`;
  document.querySelector('#repetir').addEventListener('click', () => {
    puntos = { celestial: 0, camp: 0, arte: 0 };
    titulo.textContent = '¿Qué look llevarías a la Met Gala?';
    actual = 0; mostrar();
  });
  gsap.from('.resultado__tarjeta', { scale: 0.6, rotation: -12, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' });
  sonido.currentTime = 0;
  sonido.play().catch(() => {});
  gsap.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.6 });
  lanzarConfeti();
}

function lanzarConfeti() {
  const colores = ['#d9b45a', '#f4e0a6', '#d81e43', '#f7f0e4'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('i');
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colores[i % colores.length];
    confeti.appendChild(c);
    gsap.to(c, {
      y: window.innerHeight + 60, x: gsap.utils.random(-120, 120),
      rotation: gsap.utils.random(180, 720),
      duration: gsap.utils.random(2, 4), delay: Math.random() * 0.6, ease: 'power1.in',
      onComplete: () => c.remove()
    });
  }
}