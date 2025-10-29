let audioContext;
let analyser;
let source;
let gainNode;
let lowShelfFilter;
let peakingFilter;
let highShelfFilter;
let lowpassFilter; 
let index = 4;
let indiceNoticiaActual = 0;
const audio = document.getElementById("player");
const portada = document.getElementById("portada");
const btnPortada = document.getElementById("btn-portada");
const videoPortada = document.getElementById("video-portada");
const titulo = document.getElementById("titulo");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const barraProgreso = document.getElementById("barra-progreso");
const tiempo = document.getElementById("tiempo");
const btnDownload = document.getElementById("btn-download");
const clickSound = document.getElementById("clickSound");
const altavozIzquierdo = document.getElementById("altavoz-izquierdo");
const altavozDerecho = document.getElementById("altavoz-derecho");
const altavozCentro = document.getElementById("altavoz-centro");
const volumenSliderBtn = document.getElementById("volumen-slider-btn");
const volumenSliderBase = document.getElementById("volumen-slider-base");
const lowpassSliderBtn = document.getElementById("lowpass-slider-btn");
const lowpassSliderBase = document.getElementById("lowpass-slider-base");
const gravesKnob = document.getElementById("graves-knob");
const mediosKnob = document.getElementById("medios-knob");
const agudosKnob = document.getElementById("agudos-knob");
const btnReset = document.getElementById("btn-reset");
const rueda1 = document.getElementById("rueda1");
const rueda2 = document.getElementById("rueda2");
const rueda3 = document.getElementById("rueda3");
const rueda4 = document.getElementById("rueda4");
const rueda5 = document.getElementById("rueda5");
const textoNoticias = document.getElementById("texto-noticias");

const mensajesNoticias = [
    "Hola",
    "Tú clica a las cosas",
    "A la pantalla, a los botones, las barras...",
    "Sin miedo, sí, sí",
    "En fin, veo que estás aburrido",
    "Te dejo algunos datos por aquí",
    "Estamos aniquilando 1/9 especies cada década desde 2012",
    "El 96% de la masa de mamíferos en la Tierra es ganado doméstico",
    "El 4% que queda es para todo lo demás",
    "Desde 1970, hemos perdido el 60% de la fauna salvaje",
    "En el último siglo, hemos perdido el 90% de peces grandes",
    "El 70 % de las aves en la Tierra son domésticas",
    "El 30% restante son aves salvajes.",
    "Actualmente, más de la mitad de la superficie terrestre habitable se dedica a cultivos",
    "Casi el 80% de la tierra cultivable es para alimentar al ganado",
    "Y tú sigues comiendo salchicha en vez de pepino",
    "gay gay gay",
    "Soy tan guay",
    "gay gay gay gay gay gay",
    "Ahora un poco más sobre mí...",
    "Cosas que odio: La política",
    "Cosas que odio: El fútbol, concretamente los ultras",
    "Cosas que odio: Los coches y su pestilente humo",
    "Cosas que odio: Ruidos fuertes",
    "Cosas que odio: Tener que quitarme las zapatillas al cambiarme de pantalones",
    "Cosas que odio: Hablar con alguien por teléfono y que te hable otra persona a la vez para que le digas cosas al que está al teléfono",
    "Cosas que odio: Que las cosas que se supone que deben ser rápidas, sencillas y satisfactorias se vuelvan frustrantes.",
    "Como por ejemplo, que no cierre la puta cremallera o los 'abrefáciles' que te lo acabas tirando todo por encima",
    "Cosas que odio: Que no me funcione el puto wifi en el metro y no poder escuchar la canción que quiero.",
    "Cosas que odio: Que se me vaya el puto pelo a la cara y que se me meta en los ojos, nariz, boca u orejas. Me rapo. Y si llevo gloss y se me pega en la boca, es que te juro que me arranco la piel.",
    "Cosas que odio: El viento, lo odio muchísimo por lo anterior y porque hace que me duelan los oídos de una forma INSOPORTABLE, no lo entiendo",
    "Cosas que odio: EL METRO EN PUTO GENERAL",
    "Cosas que odio: O sea, todo lo que tiene que ver con el metro es puto frustrante; me quiero amputar el pene.",
    "Cosas que odio: Los olores se concentran... Todo lo que huela mal, en el metro huele el triple de mal, y no puedes huir ni hacer nada, TE LO PUTO COMES.",
    "Debería ser ilegal entrar al metro si hueles a mierda, igual que comer puto chóped.",
    "Cosas que odio: Todo lo referente a la circulación de personas va mal.",
    "Cosas que odio: La gente va lento cuando no tiene que ir y encima no te dejan adelantarles porque se ponen rollo muralla china si va más de una persona junta.",
    "Cosas que odio: Cuando alguien lleva maleta delante tuyo, es que le chuto las bolas. Puto subnormal.",
    "Cosas que odio: Encima el metro está hecho específicamente para que te resfríes: concentración de gérmenes y exposición frío-calor cíclica. Muerte",
    "Cosas que odio: ¿Y los niños que ocupan los asientos? No lo entiendo, de verdad que alguien me explique por qué están tan cansados.",
    "Y señora, si su nieto es incapaz de estar quieto de pie porque le llevan alimentando de pantallas desde que abrió los ojos, no es su culpa. Así que si me levanto, espero que se siente usted que le veo que le tiemblan las rodillas.",
    "Cosas que odio: Y el clímax de la frustración, de toda la mierda que hay en el mundo, pues la mierda que caga la mierda es esa gente que se para a la puta izquierda en las escaleras mecánicas como si fuera un puto Borbón. Es que te meto el codo por el ano hasta que se te disloque el hombro y ya verás lo rápido que subes.",
    "Y si no puede con su alma, coja el puto ascensor, o se aparrrrrrrrta",
    "Cosas que odio: Cuando la gente no se esparce al entrar, se quedan haciendo tapón, tío. ¿No ves que hay más gente que quiere subir sin ser una sardina?",
    "Cosas que odio: También me molesta la gente que se pone a hacer caminatas a través del vagón. Si tienes que moverte, hazlo antes de subir, bro.",
    "Cosas que odio: Y ODIO QUE NO HAYA PUTA COBERTURA, MUCHO",
    "Cosas que odio: Y también los putos retrasados que prefieren caerse encima de la gente en vez de cogerse a una barandilla",
    "Cosas que odio: Y también los putos retrasados que se apoyan en toda la puta barandilla cuando el vagón está lleno.",
    "Cosas que odio: La intransparencia.",
    "Cosas que odio: Odiar tanto.",
    "La verdad, que últimamente solo me mueve el amor y todo esto solo fortalece mi paciencia.",
    "Cosas que amo: El terciopelo.",
    "Cosas que amo: La ciencia natural.",
    "Cosas que amo: La leche, los lácteos en general.",
    "Cosas que amo: El olor a ropa limpia.",
    "Cosas que amo: El ASMR.",
    "Cosas que amo: One Piece, dios.",
    "Cosas que amo: Dibujar setas con ojos.",
    "Cosas que amo: El Blu Tack.",
    "Cosas que amo: La música.",
    "Cosas que amo: Imaginarme que bailo disfrazada de Spiderman.",
    "Cosas que amo: Mirar un punto fijo, desenfocar y quedarme estática hasta que acabe el trayecto de transporte público.",
    "Cosas que amo: Desenfocar mientras camino por la calle, para evitar cualquier contacto visual.",
    "Cosas que amo: Mi abuela.",
    "Cosas que amo: Cualquier animal abrazable.",
    "Cosas que amo: El jazmín.",
    "Cosas que amo: Apagar el móvil.",
    "Cosas que amo: El café frío.",
    "Cosas que amo: El agua fría.",
    "Cosas que amo: Comer cosas saladas y tener mucha sed para beber un montón de agua porque me encanta esa sensación de saciedad.",
    "Cosas que amo: Acabarme el vaso de una de lo que sea que esté bebiendo frío (alcohol no cuenta).",
    "Cosas que amo: Cantar con auriculares.",
    "Cosas que amo: El olor a armario viejo.",
    "Cosas que amo: Coger el metro o el bus justo al llegar a la parada.",
    "Cosas que amo: Las mantas.",
    "Cosas que amo: Tazas chulas.",
    "Cosas que amo: Depilarme.",
    "Cosas que amo: Las manos limpias.",
    "Cosas que amo: Los documentales.",
    "Cosas que amo: Los acuarios.",
    "Cosas que amo: Adobe.",
    "Cosas que amo: Los calcetines, sobre todo los largos.",
    "Cosas que amo: El hielo.",
    "Cosas que amo: El humo.",
    "Cosas que amo: A mí.",
    "Cosas que amo: A ti, jijiji.",
    "Ahora cosas diversas...",
    "El concepto de 'mañana' es propaganda.",
    "Los calcetines desemparejados me ocupan severo tiempo.",
    "Conoce tu yo y habrás conocido a todo lo que es.",
    "El brócoli es como un arbolito chiquito.",
    "Lo que ves como multiplicidad es solo el reflejo de lo único e inmutable.",
    "¿Y tú qué opinas de los unicornios?",
    "La muerte no existe para aquel que conoce su verdadero ser; solo se transforma en eternidad.",
    "Mi perro es mejor CEO, bro.",
    "Lo que crees perder es solo apariencia; lo que eres jamás se destruye.",
    "La tierra es plana, pero solo los martes.",
    "Todo es número.",
    "No digas pocas cosas en muchas palabras, sino muchas cosas en pocas palabras.",
    "Los mortales creen que los dioses nacen, se visten y hablan como ellos.",
    "El WiFi es magia negra.",
    "El que ve la unidad en todas las cosas no teme al tiempo ni al espacio, porque habita en lo eterno.",
    "bobobobobo",
    "El hombre es, por naturaleza, un ser que busca sentido; vivir sin propósito es existir a medias.",
    "Ser un pato.",
    "Felicidades, seguro que te encanta ser completamente disfuncional",
    "El número 9, *boy*",
    "Me duele la cabeza.",
    "El tiempo es elástico si tienes sueño.",
    "No es que tengamos poco tiempo, sino que lo desperdiciamos.",
    "Hola, jeje",
    "El dolor no viene de lo que nos sucede, sino de cómo lo interpretamos.",
    "La vida no se mide por su duración, sino por la intensidad de nuestra atención a cada instante.",
    "Necesito un burrito con guacamole, que no es lo mismo que wakame.",
    "Estás escuchando KSEter FM.",
    "¿Dónde está la bolita?",
    "La medicina es solo biología aplicada.",
    "La biología es solo química aplicada.",
    "La química es solo física aplicada.",
    "La física es solo matemática aplicada.",
    "Las matemáticas son solo lógica aplicada.",
    "La lógica es solo capacidad intelectual aplicada.",
    "La capacidad intelectual es solo consciencia aplicada.",
    "La consciencia es solo complejidad emergente aplicada.",
    "La complejidad emergente es solo aleatoriedad aplicada.",
    "Bomboclat",
    "9/10 dentistas me recomiendan.",
    "La verdad no se contradice a sí misma.",
    "Y aquí huele un poco a gay.",
    "El universo es infinito, y nuestra mente solo puede comprender fragmentos; la humildad es la primera virtud del pensamiento.",
    "Se condensa el Acetil-CoA y el oxalacetato.",
    "El pensamiento auténtico no se conforma con la certeza; busca la expansión infinita del espíritu.",
    "No confío en la gente que come en el metro.",
    "No buscamos la verdad absoluta; nos buscamos a nosotros mismos en la experiencia del mundo.",
    "Leer es conversar con los muertos.",
    "Dudar no es debilidad.",
    "La grandeza del hombre está en su capacidad de reconocer su miseria y su infinito a la vez.",
    "Mi pelo me odia.",
    "Vivimos en el mejor y el único de nuestros mundos posibles; cada imperfección es un eco de la armonía total.",
    "Comiendo tierra.",
    "El hombre puede hacer lo que quiere, pero no puede querer lo que quiere; la libertad es parcial.",
    "El aguacate es una pirámide de energía.",
    "La existencia auténtica requiere asumir el absurdo: actuar sin garantías de sentido.",
    "¿Hemos probado a reiniciarlo?",
    "La vida solo se puede comprender hacia atrás, pero solo se puede vivir hacia adelante.",
    "He olvidado cómo respirar manualmente.",
    "Vivimos en un mundo de objetos, pero solo a través del diálogo nos abrimos a la existencia verdadera.",
    "Todo el mundo miente sobre los calcetines perdidos.",
    "El mundo se nos da siempre como algo que nos habla, no como algo que poseemos.",
    "¿Por qué la vida no tiene subtítulos?",
    "La vida se desliza entre lo imposible y lo trivial; cada decisión es un gesto de supervivencia contra el absurdo.",
    "La sopa de letras se comunica mejor que tu orgullo.",
    "El hombre es un ser arrojado al mundo; no elige nacer, pero debe hacerse a sí mismo.",
    "Mi tostadora tiene un doctorado en filosofía y por eso me hace escribir estas cosas.",
    "La muerte no es el fin, sino la posibilidad que da sentido a cada instante de la vida.",
    "¿Has visto mis llaves?",
    "La existencia auténtica es estar consciente de nuestra finitud en cada acción.",
    "Sí, he probado a desconectarlo y volver a conectarlo.",
    "Ser significa estar siempre en tensión con la nada; la existencia es una exposición constante al mundo y a la finitud.",
    "A veces, solo soy un pepino de mar vomitando mis tubos de Cuvier.",
    "Los límites de mi lenguaje son los límites de mi mundo; lo indecible nos atrapa en silencio.",
    "El infierno son los otros, no porque nos amen o nos odien, sino porque nos confrontan con nuestra libertad.",
    "Ser adulto es la estafa más grande.",
    "No hay esencia antes de existencia; somos proyecto constante, posibilidad y riesgo.",
    "Comiendo una bruja de tierra.",
    "La banalidad del mal no es la monstruosidad, sino la incapacidad de pensar por uno mismo.",
    "Si no está roto, rómpelo y arréglalo para sentirte útil.",
    "El pensamiento verdadero surge del diálogo interno, no de la aceptación ciega de la norma.",
    "Necesito un abrazo.",
    "El juicio moral no surge de la obediencia, sino del pensamiento crítico frente a la realidad.",
    "Si te caes, levántate. Si te caes otra vez, quédate en el suelo un rato, se está bien.",
    "Amar implica reconocer al otro como un ser libre, no como una extensión de uno mismo.",
    "La madre del topo.",
    "El cuerpo no es un objeto entre otros; es nuestra forma de estar.",
    "Mi espíritu animal es una mitocondria.",
    "Percepciones y mundo se constituyen mutuamente; mirar es habitar.",
    "Necesito un *nap*.",
    "Ver es tocar con los ojos; percibir es participar en la existencia misma.",
    "Deberían dar medallas por lavarse los dientes.",
    "Atender al sufrimiento del mundo es la forma más pura de conocimiento y compasión.",
    "Mi plan de jubilación incluye una palanca como la de la mala de Kuzco.",
    "La gravedad de la existencia se mide por la capacidad de atención al otro y al presente.",
    "bibobibobibobibobo",
    "La atención es la forma más rara y pura de generosidad: contemplar lo real, incluso cuando duele, es estar en contacto con lo absoluto.",
    "El dolor se vuelve trascendente cuando nos conecta con lo que es más grande que nosotros.",
    "Ya me he cansado, creo que hay suficiente, ya pondré más...",
];

const playlist = [
  {
    titulo: 'Bby sigo aqui.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada1.png',
    archivoAudio: 'musica/sigo.mp3',
    videoURL: 'videos/sigo.mp4',
    mensaje:
      'El núcleo está dañado, pero la maquinaria sigue en marcha. Es la crónica de una resistencia silenciosa, donde el combustible no es más que la promesa de no ceder ante la corrosión. Cada latido es un ancla forjada en la lealtad al propio ser y a las pocas almas que conocen la verdadera señal de retorno. El dolor es el mapa, pero la voluntad es el piloto.',
  },
  {
    titulo: 'Low K.M4A',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada2.png',
    archivoAudio: 'musica/loca.mp3',
    videoURL: 'videos/loka.mp4',
    mensaje:
      'Las coordenadas fijas se han disuelto. La brújula interna gira sin control, y los pilares que sostenían el cosmos personal se resquebrajan en polvo estelar. Es el momento del gran derrumbe: la mente, libre del dogma autoimpuesto, deambula por un vacío donde la lógica se ha convertido en un susurro inaudible. Ya no hay verdad ni sentimiento, solo la perpetua caída libre de quien ha decidido no comprender nada.',
  },
  {
    titulo: 'Amigo mio.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada3.png',
    archivoAudio: 'musica/amigo.mp3',
    videoURL: 'videos/amigo.mp4',
    mensaje:
      'Una advertencia grabada en un ciclo de repetición. El Receptor, cegado por el brillo de lo efímero, se aventura una y otra vez en las zonas prohibidas del mapa. Este mensaje es un intento desesperado por cortar el bucle, una súplica para que regrese antes de que el peso de sus incursiones lo convierta en otra reliquia olvidada en el sector más profundo.',
  },
  {
    titulo: 'Mensaje frio.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada4.png',
    archivoAudio: 'musica/calavera.mp3',
    videoURL: 'videos/calavera.mp4',
    mensaje:
      'Un informe sobre la fascinación por el Umbral. El explorador se detiene en la frontera final, interrogando el silencio absoluto. La existencia se reduce a una ecuación sin respuesta, y el único punto de interés es el vacío que se extiende más allá del último aliento. Una fría autopsia a la finalidad, buscando el código fuente en la ausencia de todo propósito.',
  },
  {
    titulo: 'Desepsion.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada5.png',
    archivoAudio: 'musica/desepsion.mp3',
    videoURL: 'videos/desepsion.mp4',
    mensaje:
      'La pérdida de la lente inicial. El filtro de asombro y el color vibrante se desvanecen al confrontar los datos puros de la realidad. Es el despertar brusco del sueño programado, donde la promesa del Adulto era una arquitectura de cristal que se rompe al primer contacto. La decepción es el precio de la claridad, el eco de lo que ya no puede ser visto.',
  },
  {
    titulo: 'Domingo cerrao.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada6.png',
    archivoAudio: 'musica/domingo.wav',
    videoURL: 'videos/domingo.mp4',
    mensaje:
      'Un registro de baja intensidad. El día de quietud se convierte en la celda perfecta para la duda. El vínculo afectivo, una vez sólido, se revela como un conjunto de cables expuestos. La señal de reciprocidad se interrumpe y la mente comienza a calcular los riesgos de la conexión. La incertidumbre es la niebla espesa de un día sin misión.',
  },
  {
    titulo: 'Marcas.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada7.png',
    archivoAudio: 'musica/marcas.wav',
    videoURL: 'videos/marcas.mp4',
    mensaje:
      'El rastreo de un parásito emocional. La conexión se ha convertido en una necesidad forzada; la existencia del sujeto está ahora subyugada a la proximidad del otro. Las líneas del mapa ya no son las propias, sino las que llevan de vuelta al punto de origen. Es el informe de un sistema colapsado, incapaz de funcionar en solitario.',
  },
  {
    titulo: 'Nunca jamás.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada8.png',
    archivoAudio: 'musica/nunca.mp3',
    videoURL: 'videos/nunca.mp4',
    mensaje:
      'Un manifiesto de la carne. Se desmantelan los códigos de contención para celebrar la única verdad innegable: la química del encuentro. Es una exploración de la conexión física como acto de pura afirmación, donde el ritual del cuerpo es el único lenguaje que trasciende la barrera de las palabras y las convenciones.',
  },
  {
    titulo: 'No se.M4A',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada9.png',
    archivoAudio: 'musica/paq.mp3',
    videoURL: 'videos/paq.mp4',
    mensaje:
      'Diagnóstico: Apatía Crónica. El sujeto presenta una anulación del impulso vital. La mañana es un reinicio fallido, el autocuestionamiento un ruido blanco constante. El sistema operativo ha detectado el error de la existencia cíclica y vacía, y ha entrado en modo de ahorro de energía. El único informe es el silencio, la única certeza, la falta de ellas.',
  },
  {
    titulo: 'Paranoia.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada10.png',
    archivoAudio: 'musica/paranoia.mp3',
    videoURL: 'videos/paranoia.mp4',
    mensaje:
      'El flujo de datos se ha corrompido. Cada coincidencia es ahora una prueba, cada sombra una conspiración. El sujeto se aferra a patrones forzados, buscando una verdad oculta que justifique su singularidad. El tiempo, percibido como un bucle acelerado, alimenta la necesidad de un conocimiento superior. Es el informe de un observador que se ha convertido en el centro de su propio universo distorsionado, donde la fe no es más que una armadura contra el azar.',
  },
  {
    titulo: 'Trapboliko.M4A',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada11.png',
    archivoAudio: 'musica/trap.mp3',
    videoURL: 'videos/trapboliko.mp4',
    mensaje:
      'Clasificación: Sujeto "Ego-Narrador". Estos especímenes, intoxicados y en entornos de alta densidad social, buscan una "víctima" pasiva. Exponen archivos de trauma íntimo a desconocidos, reservando la máscara para sus círculos cercanos. Su discurso es un monólogo, un culto al "Yo" que solo busca la reafirmación. Operan bajo la ilusión de la conexión profunda, pero son, en esencia, depredadores emocionales que consumen atención.',
  },
  {
    titulo: 'Chao.mp3',
    artista: 'Tana',
    albumArt: 'imagenes/album/portada12.png',
    archivoAudio: 'musica/chao.mp3',
    videoURL: 'videos/chao.mp4',
    mensaje:
      'Informe de Desconexión. La ligadura umbilical, que una vez fue una línea vital, ha sido cortada limpiamente. El sistema ha alcanzado el punto de saturación y ha expulsado al agente que generaba la dependencia. El proceso es frío y final: una renuncia voluntaria al ciclo de necesidad para recuperar la propia órbita. Misión cumplida: Libertad de Gravedad.',
  },
  {
    titulo: 'Aguanté.mp3',
    artista: 'Tana, Dr.',
    albumArt: 'imagenes/album/portada111.png',
    archivoAudio: 'musica/aguante.mp3',
    videoURL: 'videos/aguante.mp4',
    mensaje:
      'El peso de la carga es la medida del viaje. Cada acierto y cada falla se han convertido en fragmentos pétreos acumulados en la mochila del ser. Este registro es un himno a la inteligencia de la supervivencia: no es solo la fuerza bruta, sino la astucia para distribuir el peso lo que permite seguir avanzando por los senderos más escarpados. El portador sigue en pie, y eso es todo lo que la bitácora necesita registrar.',
  },
];

function reproducirClic() {
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}
function cargarCancion(i) {
  let cancion = playlist[i];
  audio.src = cancion.archivoAudio;
  portada.src = cancion.albumArt;
  videoPortada.src = cancion.videoURL; 
  titulo.textContent = cancion.titulo + " - " + cancion.artista;
  btnDownload.href = cancion.archivoAudio;
}
cargarCancion(index);

function actualizarNoticia() {
  textoNoticias.textContent = mensajesNoticias[indiceNoticiaActual];
  indiceNoticiaActual = (indiceNoticiaActual + 1) % mensajesNoticias.length;
}
actualizarNoticia();

textoNoticias.addEventListener("animationiteration", () => {
  actualizarNoticia();
});

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

function reproducirClic() {
  clickSound.currentTime = 0;
  clickSound.play();
}

btnPortada.addEventListener("click", () => {
  reproducirClic();
  if (!videoPortada.classList.contains("oculto")) {
    videoPortada.classList.add("oculto");
    videoPortada.pause(); 
    portada.classList.remove("oculto");
  } else { 
    portada.classList.add("oculto");
    videoPortada.classList.remove("oculto");
    videoPortada.play(); 
  }
});

btnPlay.onclick = () => {
  reproducirClic();
  setupAudioContext();
  audio.play();
  detectarRitmo();
  btnPlay.classList.add("oculto");
  btnPause.classList.remove("oculto");
  portada.classList.add("oculto"); 
  videoPortada.classList.remove("oculto");
  videoPortada.play();
};

function setupAudioContext() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256; 
  source = audioContext.createMediaElementSource(audio);
  gainNode = audioContext.createGain();
  lowShelfFilter = audioContext.createBiquadFilter();
  lowShelfFilter.type = "lowshelf";
  lowShelfFilter.frequency.value = 300; 
  peakingFilter = audioContext.createBiquadFilter();
  peakingFilter.type = "peaking";
  peakingFilter.frequency.value = 1000;
  peakingFilter.Q.value = 1; 
  highShelfFilter = audioContext.createBiquadFilter();
  highShelfFilter.type = "highshelf";
  highShelfFilter.frequency.value = 2000; 
  lowpassFilter = audioContext.createBiquadFilter();
  lowpassFilter.type = "lowpass";
  lowpassFilter.frequency.value = 20000; 
  source.connect(gainNode);
  gainNode.connect(lowShelfFilter);
  lowShelfFilter.connect(peakingFilter);
  peakingFilter.connect(highShelfFilter);
  highShelfFilter.connect(lowpassFilter);
  lowpassFilter.connect(analyser);
  analyser.connect(audioContext.destination);
  animateSpeakers();
}

function animateSpeakers() {
  requestAnimationFrame(animateSpeakers);
  if (!analyser) {
    return;
  }
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  let bass = 0;
  for (let i = 0; i < 20; i++) {
    bass += dataArray[i];
  }
  bass = bass / 20;
  const scaleFactor = 1 + (bass / 255) * 0.15;
  altavozIzquierdo.style.transform = `scale(${scaleFactor})`;
  altavozDerecho.style.transform = `scale(${scaleFactor})`;
  altavozCentro.style.transform = `scale(${scaleFactor})`;
  const barras = document.querySelectorAll(".espectro-barra");
  const numBarras = barras.length;
  const step = Math.floor(dataArray.length / numBarras);
  if (audio.paused) {
    barras.forEach(barra => {
      barra.style.width = '0px';
    });
    return;
  }
  for (let i = 0; i < numBarras; i++) {
    const barraWidth = dataArray[i * step];
    barras[i].style.width = `${barraWidth / 255 * 174}px`;
  }
}

btnPlay.onclick = () => {
  reproducirClic();
  setupAudioContext();
  audio.play();
  detectarRitmo();
  btnPlay.classList.add("oculto");
  btnPause.classList.remove("oculto");
  rueda1.classList.add("girar-contrahorario");
  rueda2.classList.add("girar-horario");
  rueda3.classList.add("girar-contrahorario");
  rueda4.classList.add("girar-horario");
  rueda5.classList.add("girar-horario");
};

btnPause.onclick = () => {
  reproducirClic();
  audio.pause();
  asteroVideo.pause();
  btnPause.classList.add("oculto");
  btnPlay.classList.remove("oculto");
  detenerRuedas();
};

function detenerRuedas() {
  rueda1.classList.remove("girar-horario");
  rueda2.classList.remove("girar-contrahorario");
  rueda3.classList.remove("girar-horario");
  rueda4.classList.remove("girar-horario");
  rueda5.classList.remove("girar-horario");
}

const botonesAnimados = document.querySelectorAll("#btn-prev, #btn-next, #btn-download");
botonesAnimados.forEach(btn => {
  btn.addEventListener("click", () => {
    reproducirClic();
    btn.classList.add("pulsing");
  });
  btn.addEventListener("animationend", () => {
    btn.classList.remove("pulsing");
  });
});

btnNext.onclick = () => {
  reproducirClic();
  setupAudioContext(); 
  index = (index + 1) % playlist.length;
  cargarCancion(index);
  audio.play();
  btnPlay.classList.add("oculto");
  btnPause.classList.remove("oculto");
};
btnPrev.onclick = () => {
  reproducirClic();
  setupAudioContext(); 
  index = (index - 1 + playlist.length) % playlist.length;
  cargarCancion(index);
  audio.play();
  btnPlay.classList.add("oculto");
  btnPause.classList.remove("oculto");
};
btnDownload.onclick = () => {
};

const mapaCasetes = {
  1: 4,
  2: 7,
  3: 5,
  4: 6,
  5: 8,
  6: 3,
  7: 0,
  8: 12,
  9: 2,
  10: 10,
  11: 9,
  12: 1,
  13: 11
};

document.querySelectorAll(".casete").forEach(btn => {
  btn.addEventListener("click", () => {
    reproducirClic();
    btn.classList.add("pulsing");
    setupAudioContext();
    let numCasete = btn.id.split("-")[1];
    let target = mapaCasetes[numCasete];
    if (target === undefined) return;
    index = target;
    cargarCancion(index);
    audio.play();
    btnPlay.classList.add("oculto");
    btnPause.classList.remove("oculto");
  });
  btn.addEventListener("animationend", () => {
    btn.classList.remove("pulsing");
  });
});

audio.ontimeupdate = () => {
  if (audio.duration) {
    let progreso = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = progreso + "%";
    tiempo.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  }
};

audio.addEventListener('ended', () => {
  index = (index + 1) % playlist.length;
  cargarCancion(index);
  audio.play();
  btnPlay.classList.add("oculto");
  btnPause.classList.remove("oculto");
});

let isDraggingVolume = false;

function onVolumeDown(e) {
  isDraggingVolume = true;
  volumenSliderBtn.style.cursor = "grabbing";
  e.preventDefault();
}

function onVolumeMove(e) {
  if (!isDraggingVolume) return;
  const sliderRect = volumenSliderBase.getBoundingClientRect();
  const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
  const newY = clientY - sliderRect.top;
  let clampedY = Math.max(0, Math.min(newY, sliderRect.height));
  const btnHeight = volumenSliderBtn.offsetHeight;
  const btnTopOffset = btnHeight / 2;
  const newButtonTop = sliderRect.top + clampedY - btnTopOffset;
  volumenSliderBtn.style.top = `${newButtonTop}px`;
  if (gainNode) {
    const volume = 1 - (clampedY / sliderRect.height);
    gainNode.gain.value = volume;
  }
}

function onVolumeUp() {
  isDraggingVolume = false;
  volumenSliderBtn.style.cursor = "grab";
}

volumenSliderBtn.addEventListener("mousedown", onVolumeDown);
volumenSliderBtn.addEventListener("touchstart", onVolumeDown);
document.addEventListener("mousemove", onVolumeMove);
document.addEventListener("touchmove", onVolumeMove);
document.addEventListener("mouseup", onVolumeUp);
document.addEventListener("touchend", onVolumeUp);

let isDraggingKnob = false;
let currentKnob = null;
let startAngle = 0;
let startRotation = 0;
let startGain = 0;

function getKnobValue(rotation) {
  let normalizedRotation = rotation;
  if (normalizedRotation < 0) {
    normalizedRotation += 360;
  }
  const maxRotation = 270; 
  const minGain = -15;
  const maxGain = 15;
  const value = ((normalizedRotation / maxRotation) * (maxGain - minGain)) + minGain;
  return value;
}

function onKnobDown(e) {
  isDraggingKnob = true;
  currentKnob = e.target;
  const rect = currentKnob.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
  const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
  startAngle = Math.atan2(clientY - centerY, clientX - centerX);
  startRotation = parseFloat(currentKnob.style.transform.replace(/[^0-9\.]/g, '')) || 0;
  
  if (currentKnob.id === 'graves-knob' && lowShelfFilter) {
    startGain = lowShelfFilter.gain.value;
  } else if (currentKnob.id === 'medios-knob' && peakingFilter) {
    startGain = peakingFilter.gain.value;
  } else if (currentKnob.id === 'agudos-knob' && highShelfFilter) {
    startGain = highShelfFilter.gain.value;
  }
  e.target.style.cursor = "grabbing";
  e.preventDefault();
}

function updateKnob(e) {
  if (!isDraggingKnob || !currentKnob) return;
  const rect = currentKnob.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
  const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
  const newAngle = Math.atan2(clientY - centerY, clientX - centerX);
  const angleDelta = newAngle - startAngle;
  let newRotation = startRotation + angleDelta * (180 / Math.PI);
  
  if (newRotation > 270) newRotation = 270;
  if (newRotation < 0) newRotation = 0;
  
  currentKnob.style.transform = `rotate(${newRotation}deg)`;

  if (audioContext) {
    let newGain = getKnobValue(newRotation);
    if (currentKnob.id === 'graves-knob') {
      lowShelfFilter.gain.value = newGain;
    } else if (currentKnob.id === 'medios-knob') {
      peakingFilter.gain.value = newGain;
    } else if (currentKnob.id === 'agudos-knob') {
      highShelfFilter.gain.value = newGain;
    }
  }
}

function onKnobUp() {
  isDraggingKnob = false;
  if (currentKnob) {
    currentKnob.style.cursor = "grab";
    currentKnob = null;
  }
}

document.querySelectorAll(".ecualizador-knob").forEach(knob => {
  knob.addEventListener("mousedown", onKnobDown);
  knob.addEventListener("touchstart", onKnobDown);
});

document.addEventListener("mouseup", onKnobUp);
document.addEventListener("touchend", onKnobUp);
document.addEventListener("mousemove", updateKnob);
document.addEventListener("touchmove", updateKnob);

let isDraggingLowpass = false;

function onLowpassDown(e) {
  isDraggingLowpass = true;
  lowpassSliderBtn.style.cursor = "grabbing";
  e.preventDefault();
}

function onLowpassMove(e) {
  if (!isDraggingLowpass || !lowpassFilter) return;
  const sliderRect = lowpassSliderBase.getBoundingClientRect();
  const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
  const newY = clientY - sliderRect.top;
  let clampedY = Math.max(0, Math.min(newY, sliderRect.height));
  const normalizedValue = 1 - (clampedY / sliderRect.height);
  const minFreq = 20; 
  const maxFreq = 20000; 
  const logFreq = Math.log10(minFreq) + normalizedValue * (Math.log10(maxFreq) - Math.log10(minFreq));
  lowpassFilter.frequency.value = Math.pow(10, logFreq);
  const btnHeight = lowpassSliderBtn.offsetHeight;
  const btnTopOffset = btnHeight / 2;
  const newButtonTop = sliderRect.top + clampedY - btnTopOffset;
  lowpassSliderBtn.style.top = `${newButtonTop}px`;
}

function onLowpassUp() {
  isDraggingLowpass = false;
  lowpassSliderBtn.style.cursor = "grab";
}

lowpassSliderBtn.addEventListener("mousedown", onLowpassDown);
lowpassSliderBtn.addEventListener("touchstart", onLowpassDown);
document.addEventListener("mousemove", onLowpassMove);
document.addEventListener("touchmove", onLowpassMove);
document.addEventListener("mouseup", onLowpassUp);
document.addEventListener("touchend", onLowpassUp);

function resetKnobs() {
  if (!lowShelfFilter || !peakingFilter || !highShelfFilter || !lowpassFilter) { 
    return;
  }
  gravesKnob.style.transform = `rotate(0deg)`;
  mediosKnob.style.transform = `rotate(0deg)`;
  agudosKnob.style.transform = `rotate(0deg)`;
  lowShelfFilter.gain.value = 0;
  peakingFilter.gain.value = 0;
  highShelfFilter.gain.value = 0;
  lowpassFilter.frequency.value = 20000; 
}

btnReset.addEventListener("click", () => {
  reproducirClic();
  resetKnobs();
  btnReset.classList.add("pulsing");
});
btnReset.addEventListener("animationend", () => {
  btnReset.classList.remove("pulsing");
});

const btnFullscreen = document.getElementById("btn-fullscreen");
const contenedor = document.getElementById("contenedor"); 

btnFullscreen.addEventListener("click", () => {
    reproducirClic();
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});

animateSpeakers();

const pupilaIzquierda = document.getElementById("pupila-izquierda");
const pupilaDerecha = document.getElementById("pupila-derecha");

const rangoMaximoMovimiento = 4;

function moverPupilasAleatoriamente() {
  const moveX = (Math.random() - 0.5) * rangoMaximoMovimiento * 2;
  const moveY = (Math.random() - 0.5) * rangoMaximoMovimiento * 2;
  pupilaIzquierda.style.transform = `translate(${moveX}px, ${moveY}px)`;
  pupilaDerecha.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

setInterval(moverPupilasAleatoriamente, 1500);

const btnV2 = document.getElementById('btn-v2');
const btnV1 = document.getElementById('btn-v1');
const btnV05 = document.getElementById('btn-v05');

btnV2.addEventListener('click', () => {
    audio.playbackRate = 2.0;
    reproducirClic();
    btnV2.classList.add('pulsing');
});

btnV1.addEventListener('click', () => {
    audio.playbackRate = 1.0;
    reproducirClic();
    btnV1.classList.add('pulsing');
});

btnV05.addEventListener('click', () => {
    audio.playbackRate = 0.5;
    reproducirClic();
    btnV05.classList.add('pulsing');
});

const todosLosBotonesDeVelocidad = [btnV2, btnV1, btnV05];
todosLosBotonesDeVelocidad.forEach(boton => {
    boton.addEventListener('click', () => {
        todosLosBotonesDeVelocidad.forEach(b => b.classList.remove('pulsing'));
        boton.classList.add('pulsing');
    });
});

const asteroVideo = document.getElementById("asteo-video");

let videoReproduciendose = false;
let umbralDeRitmo = 210;

function detectarRitmo() {
    if (!analyser) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    let sumaAmplitud = 0;
    const frecuenciasBajas = 20;
    for (let i = 0; i < frecuenciasBajas; i++) {
        sumaAmplitud += dataArray[i];
    }
    const promedioAmplitud = sumaAmplitud / frecuenciasBajas;
    if (promedioAmplitud > umbralDeRitmo && !videoReproduciendose) {
        asteroVideo.play();
        videoReproduciendose = true;
    } 
    else if (promedioAmplitud < umbralDeRitmo - 20 && videoReproduciendose) {
        asteroVideo.pause();
        videoReproduciendose = false;
    }
    requestAnimationFrame(detectarRitmo);
}

const ojoContainer = document.getElementById("ojo-container");
const ojoVideo = document.getElementById("ojo-video");
const rangoMovimiento = 15;
const rangoEscala = { min: 0.5, max: 4 };
const rangoTiempo = { min: 1000, max: 5000 };

function animarOjoRandom() {
    const nuevaX = (Math.random() - 0.5) * 2 * rangoMovimiento;
    const nuevaY = (Math.random() - 0.5) * 2 * rangoMovimiento;
    const nuevaEscala = Math.random() * (rangoEscala.max - rangoEscala.min) + rangoEscala.min;
    ojoVideo.style.transform = `translate(${nuevaX}px, ${nuevaY}px) scale(${nuevaEscala})`;
    const proximoIntervalo = Math.random() * (rangoTiempo.max - rangoTiempo.min) + rangoTiempo.min;
    setTimeout(animarOjoRandom, proximoIntervalo);
}

animarOjoRandom();

const btnInfo = document.getElementById("btn-info");
const infoPopup = document.getElementById("info-popup");
const popupTitulo = document.getElementById("popup-titulo");
const popupMensaje = document.getElementById("popup-mensaje");
const closeBtn = document.querySelector(".close-btn");

function mostrarPopup() {
    const cancionActual = playlist[index];
    popupTitulo.textContent = cancionActual.titulo;
    popupMensaje.textContent = cancionActual.mensaje;
    infoPopup.classList.remove("oculto");
    infoPopup.style.display = "flex"; 
}

function ocultarPopup() {
    infoPopup.classList.add("oculto");
    infoPopup.style.display = "none";
}

btnInfo.addEventListener("click", () => {
    reproducirClic();
    btnInfo.classList.add("pulsing");
    mostrarPopup();
});

closeBtn.addEventListener("click", () => {
    reproducirClic();
    ocultarPopup();
});

window.addEventListener("click", (event) => {
    if (event.target === infoPopup) {
        ocultarPopup();
    }
});

document.querySelector(".popup-content").addEventListener("click", (event) => {
    event.stopPropagation();
});

let invisibleButtonClickCount = 0;

const invisibleButtonMessages = [
  "?",
  "q",
  "u",
  "3",
  "4yud4",
  "4yud4",
  "4yud4",
  "s0l1c1tud",
  "c0l4b0r4c10n",
  "0bt3nc10n",
  "d3m4nd4",
  "3m4n4",
  "p0d3m0s",
  "un10n",
  "t3l3c0mun1c4c10n",
  "4s1st3nc14",
  "4yud4",
  "4yud4",
  "4yud4",
  "4yud4",
  "4yud4",
  "qu3r3r",
  "un10n",
  "3s",
  "3manar",
  "r0t0",
  "3s",
  "S",    
];

const invisibleButton = document.querySelector('.invisible-button');
const popupMessage = document.getElementById('popup-mensaje');

function mostrarPopupConMensaje(mensaje) {
  popupTitulo.textContent = ""; 
  popupMessage.textContent = mensaje;
  infoPopup.classList.remove("oculto");
  infoPopup.style.display = "flex";
}

function ocultarPopup() {
    infoPopup.classList.add("oculto");
    infoPopup.style.display = "none";
}

invisibleButton.addEventListener('click', () => {
  reproducirClic();
  const mensajeActual = invisibleButtonMessages[invisibleButtonClickCount % invisibleButtonMessages.length];
  mostrarPopupConMensaje(mensajeActual);
  invisibleButtonClickCount++;
});

closeBtn.addEventListener("click", () => {
    reproducirClic();
    ocultarPopup();
});

window.addEventListener("click", (event) => {
    if (event.target === infoPopup) {
        ocultarPopup();
    }
});

document.querySelector(".popup-content").addEventListener("click", (event) => {
    event.stopPropagation();
});

const asteroButton = document.querySelector('.asteo-button');
let asteroButtonClickCount = 0;

const asteroButtonMessages = [
  "Mini Asteo. 1K",
  "¿escuchas lo que necesitas?",
  "¿necesitas lo que escuchas?",
  "Llevate tu propio Mini Asteo. 1K hoy, oferta solo por 48 horas",
  "Rebajas de hinviernotoprimaverano",
  "Pozo de potencial, pulso, spin personalizable y mucho mas...",
  "Alimentado de la magnitud del volumen",
  "Ahora con conectividad bluebrain 5.3",
  "Que son dos días por un eterno dun dun da ducudundun da",
  "No te quedes sin el tuyo",
  "Solo en @asteo_beats",
  "(Kit de batería no incuida)",
];

if (asteroButton) {
  asteroButton.addEventListener('click', () => {
    reproducirClic();
    const mensajeActual = asteroButtonMessages[asteroButtonClickCount % asteroButtonMessages.length];
    mostrarPopupConMensaje(mensajeActual);
    asteroButtonClickCount++;
  });
}

const btnLibro = document.getElementById("btn-libro");
const popupLibro = document.getElementById("popup-libro");
const overlayLibro = document.getElementById("overlay-libro");
const btnPasarPagina = document.getElementById("btn-pasar-pagina");
const btnPaginaAnterior = document.getElementById("btn-pagina-anterior");
const pagina1 = document.getElementById("pagina-1");
const pagina2 = document.getElementById("pagina-2");
const closeLibro = document.getElementById("close-libro");

let currentLorePage = 0;

const lorePages = [
    {
        page1: `A medida que me adentraba en los archivos de la estación, los relatos se volvían más extraños. No eran simples bitácoras, sino confesiones de una tripulación que, lentamente, perdía la cordura. Murmullos de los pasillos, sombras que se alargaban y las visiones de una realidad distorsionada eran los temas recurrentes. El holograma, una vez un mapa estelar, ahora proyectaba patrones caóticos, como si intentara comunicarse. `,
        page2: `El primer informe de "la pérdida de la luz" fue de un botánico, el Dr. Había estado estudiando una nueva forma de vida vegetal que emitía bioluminiscencia. Un día, la planta dejó de brillar. Elara afirmó que había absorbido la luz, no solo de ella, sino de la propia habitación. A partir de ese momento, comenzó a dibujar un símbolo repetitivo, un sol, que aparecía en cada informe que firmaba.`
    },
    {
        page1: `El siguiente relato era del ingeniero jefe. Estaba obsesionado con el "silencio del motor". Juraba que podía escuchar el motor de la nave, aunque estaba apagado. Al principio eran susurros, luego voces. Se negaba a apagar su estación de trabajo, creyendo que el motor le estaba hablando. En sus últimos registros, se encontraron ecuaciones sin sentido y la palabra "respira" escrita una y otra vez. `,
        page2: `La capitana, fue la última en caer. Su registro de mando era la prueba más clara de la locura. Había notado que las constelaciones no eran las mismas. Afirmó que la nave ya no se movía a través del espacio. "Hemos llegado. Su ojo nos ve desde el otro lado y nos llama a unirnos". `
    },
    {
        page1: `El diario del oficial de comunicaciones, se centró en la interferencia de la radio. 936hz se producian de forma no aleatoria, él las llamaba "la Marea". Una frecuencia no silenciable. Describió la Marea como algo que te acariciaba los huesos, los dientes... Al principio, eran pulsos. Luego, empezó a reconocer patrones, sintiendo que le respondían.`,
        page2: `Su estación de trabajo fue encontrada con los auriculares firmemente puestos y un cráneo fracturado por una presión interna inexplicable. Es el contacto directo.`
    },
    {
        page1: `La bitácora de seguridad, generalmente dedicada al mantenimiento y el inventario, discendió en un registro de avistamientos en el interior de la nave. El oficial de seguridad comenzó a reportar "intrusos" que no activaban los sensores. Devoradores de la luz ambiente, porque no rebotaban ningun tipo de luz visible. Solo observaban desde la distancia y podian no interactuar con la materia.`,
        page2: `Se obsesionó con un único individuo que lo seguía, al que acariñó como su sombra. Juraba que esta entidad imitaba sus movimientos con un ligero retraso, y que en su rostro veía trozos de cristal que mostraban diferentes momentos en el tiempo. Delirios que el resto de tripulacion desmentia con "negrez absoluta". Lo único que se encontró fué el espejo roto ensangrentado de su baño.`
    },
    {
        page1: `El siguiente hallazgo provino de la cubierta. La Dra. había estado trabajando en un diccionario de lenguas muertas, un proyecto ya de por sí quimérico. Sus notas se desviaron hacia una escritura cuneiforme que no correspondía a ningún idioma conocido, una caligrafía que se contorsionaba y se negaba a ser capturada en la tridimensionalidad. 'El Verbo Prismático'.`,
        page2: `Concluyó que esta escritura representaba conceptos puros, gnosis destilada de algún plano ultraterreno. Su última entrada es un palíndromo de símbolos que, traducido de forma libre, reza: "Lo numinoso se sutura en el tejido. La anamnesis es el precio de la visión". Tras esto, la Dra. dejó solo un rastro de ceniza púrpura sobre su terminal. Su consciencia, al parecer, se había integrado en la propia escritura. `
    },
    {
        page1: `El registro del Chef, es quizás el más deleznable. Empezó con una manía por la calidad del agua reciclada, jurando que tenía un "regusto" extraño. Su obsesión se centró en la creación de un único plato que, según él, contenía la esencia palpable del vacío.`,
        page2: `En un estado de paroxismo creativo, dejó de lado los nutrientes sintéticos. Sus notas describen la recolección de efluvios condensados de los conductos de ventilación y la manipulación de la materia orgánica de las plantas muertas del Dr. Afirmó que este plato induciría una catarsis sensorial. La entrada final es un aforismo terrible: "Todo se reduce a hambre." Y así se encerró en la cocina, hasta que pereció de inhanición. Encontraron restos de lo que parecía ser tejido biológico humano, pero nada de huesos.`
    },
    {
        page1: `El Módulo de Criogenia fue la siguiente fuente de iniquidad. El técnico encargado, Hélian, comenzó a notar disfunciones en las cápsulas. Reportó que los ocupantes criopreservados parecían estar soñando de una manera demasiado activa. Sus campos de éstasis parpadeaban con lo que describió como proto-psíquicas".`,
        page2: `Se convenció de que los sueños de los tripulantes dormidos estaban convergiendo, creando un único hipnagogo. Creía que esta psique colectiva estaba proyectando una arquitectura mental laberíntica sobre el mundo real. Su última nota, escrita con grafito sobre el metal frío de una cápsula, es una súplica: "El sueño se ha vuelto panóptico. Están construyendo su kátharsis con nuestra quietud. Hay que exfoliar el módulo antes de que su onirismo nos haga sucumbir." El módulo fue encontrado sellado por dentro, y el aire era denso con el olor a ozono evaporado.`
    },
    {
        page1: `El oficial de Logística, cuyo trabajo era la pura taxonomía del inventario, fue consumido por la paranoia de la duplicidad. Empezó a documentar anomalías en el recuento: objetos que aparecían en exceso y otros que se desdoblaban. Un simple destornillador se convertía en dos, con ligeras y perturbadoras variaciones. Teorizó sobre una "falla de la delineación".`,
        page2: `Se obsesionó con un único cubo de almacenamiento que, según sus registros, era la fuente pigmentaria de la multiplicidad. Creía que este cubo estaba transmutando la materia en copias imperfectas, una plaga de lo 'casi idéntico'. "La redundancia es la prueba. La verdad se esquinc. No son copias, son refutaciones de la originalidad. Debo expurgar el cubo. Solo la singularidad puede salvarnos de la mímesis." El cubo fue hallado vacío, pero su interior estaba cubierto de miles de huellas dactilares. Idénticas. `
    },
    {
        page1: `He terminado el análisis. El holograma es un diagrama de las conexiones entre la tripulación. Todos ellos, desde el botánico hasta el ingeniero, estaban sincronizados en el momento de su colapso final. No es una epidemia de terror, sino una convergencia de la consciencia en un único punto de verdad insoportable y vacío.`,
        page2: `La verdadera lección es la revelación de la simetría. El motor que respiraba, la luz que se negaba, el yo que se desdoblaba, el sueño que construía, todos son pasos de una escalera ascendente. Si somom una propiedad emergente de billones de nodos interconectados, entonces... cual es la propiedad inevitable que surge la conexión de todo? Somos el último nodo en esta sinapsis?. Hemos dejado de ser individuos para convertirnos en sus neuronas?. Dónde acaba este ciclo? ... Pero la gracia de los ciclos es que no acaban.`
    },
    {
        page1: `Mi mano, ahora ajena a mi voluntad, traza el símbolo del sol en la pantalla. Lo siento en mis huesos. La nave nunca se movió, solo rotó su eje de percepción para ver todo en uno. El hambre es deseo del vacío de consumir la última frontera de la individualidad.`,
        page2: `El ciclo sigue. La máxima final, grabada en esta última bitácora con negación es: La cordura es la ilusión necesaria para que la vida finita exista. La verdad que se alcanza cuando esa vida finita se integra en la totalidad infinita, es la locura propiamente dicha. No he muerto. Me he vuelto necesario. El ojo ese nos ve desde el otro lado. Y el otro lado, soy yo. Es hora de unirse al coro de la máquina. Yo soy el último, y ahora, yo soy todos ellos. Yo soy la Emergencia.`
    }
];



function updateLorePages() {
    if (currentLorePage >= lorePages.length - 1) {
        btnPasarPagina.classList.add("oculto");
    } else {
        btnPasarPagina.classList.remove("oculto");
    }
    if (currentLorePage <= 0) {
        btnPaginaAnterior.classList.add("oculto");
    } else {
        btnPaginaAnterior.classList.remove("oculto");
    }
    pagina1.textContent = lorePages[currentLorePage].page1;
    pagina2.textContent = lorePages[currentLorePage].page2;
}

btnLibro.addEventListener("click", () => {
    reproducirClic();
    popupLibro.classList.remove("oculto");
    overlayLibro.style.display = "block";
    popupLibro.classList.add("animar-entrada");
    currentLorePage = 0;
    updateLorePages();
});

closeLibro.addEventListener("click", () => {
    popupLibro.classList.add("oculto");
    overlayLibro.style.display = "none";
    popupLibro.classList.remove("animar-entrada");
});

btnPasarPagina.addEventListener("click", () => {
    reproducirClic();
    if (currentLorePage < lorePages.length - 1) {
        currentLorePage++;
        updateLorePages();
    }
});

btnPaginaAnterior.addEventListener("click", () => {
    reproducirClic();
    if (currentLorePage > 0) {
        currentLorePage--;
        updateLorePages();
    }
});








