
# Met Gala Fanzine

**Un recorrido interactivo por tres galas del Met: Heavenly Bodies (2018), Camp (2019) y Costume Art (2026).**

Proyecto final de la asignatura Taller Multimedia.

## Enlaces de entrega

- **Repositorio:** https://github.com/gabiguarnili-commits/met-gala-fanzine
- **Página pública:** https://gabiguarnili-commits.github.io/met-gala-fanzine/

## 1. Resumen

Este proyecto es un web fanzine sobre la Met Gala, la gala benéfica que organiza cada año el Costume Institute del Metropolitan Museum of Art de Nueva York. En lugar de construir una página de lectura lineal, diseñé una experiencia de recorrido: la portada es una alfombra roja que se camina con el scroll, y cada una de las tres galas seleccionadas es una sala de museo con su propia identidad visual. El recorrido termina con un quiz que invita a la persona a descubrir qué look llevaría a la gala y en que año hubiese asistido.

## 2. Planteamiento y justificación

Elegí la Met Gala porque reúne tres cosas que me interesan: la moda, la imagen y la puesta en escena. Cada edición propone un tema distinto y los invitados lo interpretan de maneras muy diferentes, lo que hace de la gala un material visualmente rico y adecuado para un fanzine, un formato que históricamente se caracteriza por la expresividad, el collage y la voz personal de quien lo hace.

| 2018 | Heavenly Bodies: la moda y la imaginación católica | Solemne y luminosa: vitral, azul noche y dorado |
| 2019 | Camp: notas sobre la moda | Exagerada y lúdica: neón, rosa y cuadros inclinados |
| 2026 | Costume Art (código de vestimenta: «Fashion is Art») | Sobria y curatorial: galería blanca con marcos negros |

La decisión central fue pasar de la metáfora de «página web» a la de «recorrido». Quise que quien navega no lea, sino que camine: primero por la alfombra y luego por las salas de un museo.

## 3. Estructura del sitio



| `index.html` | Alfombra roja. El scroll vertical se traduce en desplazamiento horizontal. Cada clic simula una fotografía con flash y sonido. |
| `heavenly-bodies.html` | Sala de 2018. |
| `camp.html` | Sala de 2019. |
| `costume-art.html` | Sala de 2026. |
| `mi-look.html` | Quiz de cinco preguntas con resultado y confeti. |
| `css/style.css` | Estilos base, menú y portada. |
| `css/sala.css` | Estilos compartidos de las salas y los tres temas visuales. |
| `css/quiz.css` | Estilos del quiz. |
| `js/main.js`, `js/sala.js`, `js/quiz.js` | Comportamiento interactivo de cada sección. |
| `assets/` | Imágenes, sonido y GIF. |

## 4. Cumplimiento de los requisitos de la entrega

- **Web fanzine de temática libre:** la temática es la Met Gala.
- **Uso de una librería:** GSAP, junto con su plugin ScrollTrigger, cargados desde cdnjs. Se utilizan para el desplazamiento horizontal controlado por el scroll, la aparición progresiva de cuadros y textos, la animación letra por letra de los títulos, la luz que sigue al cursor, las chispas flotantes, los flashes y el confeti del quiz.
- **Imágenes:** fotografías de looks de las galas presentadas como cuadros de museo.
- **Sonido:** efecto de cámara fotográfica que se activa al hacer clic en la alfombra, al seleccionar un cuadro y al finalizar el quiz, ademas una cancion que acompaña el recorrido.
- **GIF:** animación de fotógrafos en la escena «¡Sonríe!» de la portada.
- **Hipervínculos:** menú de navegación entre las cinco páginas, puertas de acceso a las salas, enlaces de sala siguiente y anterior, y enlaces a fuentes externas.
- **Publicación:** sitio publicado con GitHub Pages, con repositorio público.

## 5. Documentación del proceso

### 5 de noviembre de 2026: planeación y arranque
Definí la idea del fanzine y desglosé los requisitos de la entrega en una estructura de páginas. Creé el repositorio en GitHub y lo conecté con GitHub Codespaces, donde trabajé inicialmente. Organicé el proyecto en carpetas (`css`, `js` y `assets`). En esta etapa contemplaba incluir una página de archivo que consumiera el API del Met Museum.

### 11 de noviembre de 2026: ajuste por cambio de requisitos
El planteamiento de la entrega se modificó y el uso de API dejó de ser obligatorio. Reduje el proyecto a cinco páginas. También reorganicé los archivos de estilos y scripts en sus carpetas correspondientes.

*Dificultad:* los primeros commits de la portada y del CSS se registraron como vacíos («nothing to commit»). Descubrí que había pegado el código sin guardar los archivos, y comprendí que Git solo registra cambios guardados en disco.

### 12 de noviembre de 2026: del sitio web al recorrido
Replanteé la propuesta: dejé de pensar el sitio como una página de lectura y lo concebí como un recorrido. La portada se transformó en una alfombra roja que se camina con el scroll mediante GSAP y ScrollTrigger. Construí la primera sala (Heavenly Bodies) como una galería horizontal, y creé una hoja de estilos y un script compartidos para reutilizarlos en las demás salas.

### 17 de noviembre de 2026: consolidación y publicación
- Al agotarse mis créditos de Codespaces, clonaron el repositorio en mi computador y continué el trabajo en VS Code.
- Construí la sala de Camp con tema neón y gestioné el tamaño de las imágenes, ya que una de ellas es cuadrada y las demás verticales.
- *Dificultad:* las fotografías no se mostraban. El explorador de archivos revelaba una carpeta `assets` dentro de otra `assets`, de modo que las rutas del código apuntaban un nivel más arriba de donde estaban los archivos. Las moví con la terminal y corregí además un error de extensión (`.jpg` frente a `.jpeg`).
- Rediseñé la portada con una tipografía más suave y añadí reflectores, cordones dorados, luz que sigue al cursor y chispas, buscando un carácter más cercano a la estética de la gala.
- Construí la sala de 2026 con estética de galería y el quiz «¿Qué look llevarías a la Met Gala?». Reescribí sus preguntas como situaciones divertidas para hacerlo más dinámico.
- Publiqué el sitio con GitHub Pages y comprobé que ambos enlaces de entrega abrieran correctamente.

### 18 de noviembre de 2026: Detalles finales de la entrega
- Agregue los sonidos del flash y la musica de fondo
- Redacte el Read Me con todas las especificaciones y docuemntacion del proceso.

## 6. Dificultades y aprendizajes

1. **Control de versiones:** aprendí que un commit solo contiene lo que está guardado y añadido (`git add`), y que los mensajes deben describir el cambio real realizado.
2. **Rutas relativas:** un error de un solo nivel de carpeta basta para que un recurso no cargue. Aprendí a diagnosticarlo con la terminal y con las herramientas del navegador.
3. **Diseño sobre código:** comprobé que la estructura técnica puede mantenerse mientras cambia por completo la identidad visual, si se separa bien la lógica de las variables de estilo.
4. **Iteración:** el diseño final surgió de rechazar la primera versión, que era demasiado parecida a una página web convencional.

## 7. Uso de inteligencia artificial

Utilicé Claude, el asistente de inteligencia artificial de Anthropic, como herramienta de apoyo durante todo el proyecto. Documento aquí su alcance:

- **Planeación:** me ayudó a interpretar los requisitos, a comprender qué es un web fanzine y a organizar mis ideas en una estructura de páginas y un cronograma.
- **Acompañamiento técnico:** me guió paso a paso en el uso de Git, GitHub, Codespaces y GitHub Pages, y me ayudó a diagnosticar errores como los commits vacíos y la carpeta `assets` duplicada.
- **Generación de código:**  Me ayudo a producir los códigos base de HTML, CSS y JavaScript (incluido el uso de GSAP), con eso probé, ajusté y organicé en el proyecto con las ideas que tenia.
- **Propuesta visual:** sugirió el rediseño de la portada y los temas visuales de cada sala a partir de mis indicaciones.

## 8. Créditos

**Sonido:** efecto de cámara fotográfica `camara.mp3`, obtenido en [Pixabay / Freesound].

**GIF:** `flash.gif`, obtenido en [Pixabay / Freesound].

**Librería:** [GSAP](https://gsap.com) y ScrollTrigger, de GreenSock.

**Tipografías:** Playfair Display, Jost, Cinzel, Cormorant Garamond, Bungee y Bodoni Moda, a través de Google Fonts.

**Contexto de la información:** Costume Institute y Metropolitan Museum of Art, Nueva York.