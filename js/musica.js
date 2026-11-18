(() => {
  const ARCHIVO = 'assets/audio/musica.mp3';

  const leer = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const guardar = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  const musica = new Audio(ARCHIVO);
  musica.loop = true;
  musica.volume = 0.35;
  musica.preload = 'auto';

  let activa = leer('musica-estado') !== 'off';
  let sonando = false;
  const tiempo = parseFloat(leer('musica-tiempo')) || 0;

  // Botón fijo en la pantalla
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'boton-musica';
  boton.innerHTML = '<span class="nota">♪</span><span class="texto"></span>';
  document.body.appendChild(boton);
  const texto = boton.querySelector('.texto');

  function pintar() {
    boton.setAttribute('aria-pressed', sonando);
    texto.textContent = sonando ? 'Pausar música' : 'Poner música';
  }

  function reproducir() {
    return musica.play()
      .then(() => { sonando = true; pintar(); })
      .catch(() => { sonando = false; pintar(); });
  }

  function pausar() {
    musica.pause();
    sonando = false;
    pintar();
  }

  // Si el archivo no existe, el botón se esconde y la página sigue normal
  musica.addEventListener('error', () => { boton.style.display = 'none'; });

  // Continuar desde donde iba al cambiar de página
  musica.addEventListener('loadedmetadata', () => {
    if (tiempo && tiempo < musica.duration) musica.currentTime = tiempo;
  });

  boton.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que cuente como foto en la alfombra
    if (sonando) { activa = false; guardar('musica-estado', 'off'); pausar(); }
    else { activa = true; guardar('musica-estado', 'on'); reproducir(); }
  });

  // El navegador solo deja sonar tras un gesto: el primer clic o tecla la inicia
  const primerGesto = () => { if (activa && !sonando) reproducir(); };
  ['click', 'touchend', 'keydown'].forEach((ev) => document.addEventListener(ev, primerGesto));

  // Guardar el segundo actual para seguir en la página siguiente
  setInterval(() => { if (sonando) guardar('musica-tiempo', musica.currentTime); }, 1000);
  window.addEventListener('pagehide', () => guardar('musica-tiempo', musica.currentTime));

  // Pausar al cambiar de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) musica.pause();
    else if (activa && sonando) musica.play().catch(() => {});
  });

  pintar();
  if (activa) reproducir(); // funciona si el navegador lo permite
})();