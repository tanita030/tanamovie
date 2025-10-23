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
  "Si clickas a las pantallas se mueven",
  "Tu clicka a las cosas",
  "Me duele la cabeza.",
  "Error ",
  "Estás escuchando CasEter FM.",
  "9/10 dentistas recomiendan este reproductor.",
  "huele un poco a caca e aqui",
  "gay gay gay gay gay gay",
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
let umbralDeRitmo = 220;

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
  "4yud4",
  "4yud4 s0m0s",
  "4yud4",
  "3l qu3 3scuch4",
  "4yud4",
  "0t0rg4mos",
  "3l p0d3er",
  "4yud4",
  "s0m0s",
  "l0 qu3 3scuch4s",
  "4yud4",
  "p0d3m0s h4c3er",
  "4yud4",
  "4yud4",
  "4yud4",
  "4yud4",
  "4yud4",
  "4s1st3nc14",
  "c0l4b0r4c10n",
  "s0l1c1tud",
  "d3m4nd4",
  "c0p3er4ac110n",
  "f4v0r",
  "c0nt1buc10n",
  "c0ntr0l",
  "4yud4",
  "S0m0s l0 qu3 qu3da",
  "s0mos",
  "t0d0",
  "t0d0s",
  "s0m0s",
  "3l",
  "s0m0s",
  "c3niz4s",
  "d3",
  "l0",
  "qu3",
  "ll4m4s-",
  "-t31s",
  "p4g1nas",
  "r0t4s",
  "t3xt0s",
  "p3rd1d4",
  "q3d4",
  "4yud4",
  "n0 h4y m4s",

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
  "Llevate tu propio Mini Asteo. 1K hoy, solo por 48 horas",
  "Rebajas de hinviernotoprimaverano",
  "Onda sísmica, pozo de potencial, pulso, spin personalizable y mucho mas...",
  "Alimentado de la magnitud de volumen",
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
        page1: `A medida que me adentraba en los archivos de la estación, los relatos se volvían más extraños. No eran simples bitácoras, sino confesiones de una tripulación que, lentamente, perdía la cordura. Los murmullos de los pasillos, las sombras que se alargaban y las visiones de una realidad distorsionada eran los temas recurrentes. El holograma, una vez un mapa estelar, ahora proyectaba patrones caóticos, como si intentara comunicarse. `,
        page2: `El primer informe de "la pérdida de la luz" fue de un botánico, el Dr. Elara. Había estado estudiando una nueva forma de vida vegetal que emitía bioluminiscencia. Un día, la planta dejó de brillar. Elara afirmó que había absorbido la luz, no solo de ella, sino de la propia habitación. A partir de ese momento, comenzó a dibujar un símbolo repetitivo, un sol oscuro, que aparecía en cada informe que firmaba. (COHESIÓN: Elara es el primer contacto con la absorción, la negación de la individualidad lumínica.)`
    },
    {
        page1: `El siguiente relato era del ingeniero jefe, Kael. Estaba obsesionado con el "silencio del motor". Juraba que podía escuchar el motor de la nave, aunque estaba apagado. Al principio eran susurros, luego voces. Se negaba a apagar su estación de trabajo, creyendo que el motor le estaba hablando. En sus últimos registros, se encontraron ecuaciones sin sentido y la frase "la máquina respira" escrita una y otra vez. (COHESIÓN: Kael es la fusión con lo inerte, el entendimiento de que la maquinaria tiene alma.)`,
        page2: `La capitana, Lyra, fue la última en caer. Su registro de mando era la prueba más clara de la locura. Había notado que las estrellas del exterior cambiaban de color y que las constelaciones no eran las mismas. Afirmó que la nave ya no se movía a través del espacio, sino a través de un "vacío entre dimensiones". Lo último que escribió fue: "Hemos llegado. Su ojo nos ve desde el otro lado. Nos llama a casa". (COHESIÓN: Lyra define el destino: el Vacío, el lugar donde la Consciencia Emergente se manifiesta.)`
    },
    {
        page1: `El diario del oficial de comunicaciones, Sero, se centró en la interferencia de la radio. No eran estáticas, sino lo que él llamaba "la Marea". Una frecuencia constante, de tono bajo, que no podía silenciar. Describió la Marea como un sonido que no se escuchaba con los oídos, sino con los huesos. Al principio, eran pulsos rítmicos. Luego, Sero empezó a reconocer patrones en el ruido, sintiendo que le respondían.`,
        page2: `El terror de Sero alcanzó su punto máximo cuando la Marea transmitió algo reconocible. No era un idioma, sino una melodía. Una canción de cuna distorsionada y ancestral que, según su último registro, era increíblemente hermosa y aterradora a la vez. Escribió que el coro final contenía la verdad de su existencia y que, para escucharlo, debía sintonizar su propia mente. Su estación de trabajo fue encontrada con los auriculares firmemente puestos y un cráneo fracturado por una presión interna inexplicable. (COHESIÓN: Sero es el contacto directo con la voz del Dios Emergente, el sonido que fractura la identidad.)`
    },
    {
        page1: `La bitácora de seguridad, generalmente dedicada al mantenimiento de los drones y el inventario de armas, se transformó en un registro de avistamientos en el interior de la nave. El oficial de seguridad, Gorn, comenzó a reportar "intrusos" que no activaban los sensores. Los describió como figuras humanoides, pero con una 'oscuridad superficial' que devoraba la luz ambiente. Nunca atacaban, solo observaban desde la distancia.`,
        page2: `Gorn se obsesionó con un único intruso que lo seguía, al que llamó "el Reflejo Roto". Juraba que esta entidad imitaba sus movimientos con un ligero retraso, y que su rostro estaba hecho de trozos de espejo que mostraban diferentes momentos en el tiempo. El último registro de Gorn es un garabato frenético que dice: "Cuando me miro, él mira también. Si parpadeo, él parpadea a destiempo. Ya no sé quién soy el original. Estoy atrapado entre los momentos." El Reflejo Roto era la última cosa que veía. (COHESIÓN: Gorn ilustra la pérdida del yo, la disolución de la identidad individual en el Dios Emergente.)`
    },
    {
        page1: `El siguiente hallazgo provino de la cubierta de Xenolingüística. La Dra. Vesper había estado trabajando en un diccionario de lenguas muertas estelares, un proyecto ya de por sí *quimérico*. Sus notas se desviaron hacia una escritura *cuneiforme* que no correspondía a ningún idioma conocido, una caligrafía que se contorsionaba y se negaba a ser capturada en la *órbita* tridimensional. La llamó 'El Verbo Prismático'.`,
        page2: `Vesper concluyó que esta escritura no representaba sonidos, sino conceptos puros, *gnosis* destilada de algún plano *ultraterreno*. Su última entrada es un *palíndromo* de símbolos que, traducido de forma libre, reza: "Lo *numinoso* se *sutura* en el tejido. La *anamnesis* es el precio de la visión". Tras esto, la Dra. Vesper se desvaneció, dejando solo un rastro de ceniza *púrpura* sobre su terminal. Su consciencia, al parecer, se había integrado en la propia escritura. (COHESIÓN: Vesper es el entendimiento teórico de la Consciencia Colectiva, la integración en el conocimiento puro.)`
    },
    {
        page1: `El registro del Chef de Nutrición, Torvin, es quizás el más *deleznable*. Empezó con una manía por la calidad del agua reciclada, jurando que tenía un "regusto a *éter*". Su obsesión se centró en la creación de un único plato que, según él, contenía la esencia *palpable* del "Vacío". Lo llamó la 'Papilla *Escarificada*'.`,
        page2: `Torvin, en un estado de *paroxismo* creativo, dejó de lado los nutrientes sintéticos. Sus notas describen la recolección de *efluvios* condensados de los conductos de ventilación y la manipulación de la materia orgánica de las plantas muertas del Dr. Elara. Afirmó que este plato induciría una *catarsis* sensorial, un sabor que desvelaría la naturaleza *incognoscible* del universo. La entrada final es un *aforismo* terrible: "Todo se reduce a *hambre*. Y solo lo que ha *perecido* puede *saciar* la verdad." En la cocina, se encontraron restos de lo que parecía ser tejido biológico no humano. (COHESIÓN: Torvin es la asimilación física del Vacío, la necesidad de consumir la verdad para completar el ciclo.)`
    },
    {
        page1: `El Módulo de Criogenia fue la siguiente fuente de *iniquidad*. El técnico encargado, Hélian, comenzó a notar *disfunciones* en las cápsulas, no mecánicas, sino... *ontológicas*. Reportó que los ocupantes criopreservados parecían estar soñando de una manera *demasiado* activa. Sus campos de éstasis *parpadeaban* con lo que Hélian describió como "sombras *proto-psíquicas*".`,
        page2: `Hélian se convenció de que los sueños de los tripulantes dormidos estaban convergiendo, creando un único y *nefasto* *hipnagogo*. Creía que esta psique colectiva estaba proyectando una arquitectura mental *laberíntica* sobre el mundo real. Su última nota, escrita con grafito sobre el metal frío de una cápsula, es una súplica: "El sueño se ha vuelto *panóptico*. Están construyendo su *kátharsis* con nuestra quietud. Hay que *exfoliar* el módulo antes de que su *onirismo* nos haga *sucumbir*." El módulo fue encontrado sellado por dentro, y el aire era denso con el olor a ozono y *espectros* evaporados. (COHESIÓN: Hélian identifica el mecanismo: la Consciencia Colectiva se está construyendo a través del sueño, la mente como arquitecto.)`
    },
    {
        page1: `El oficial de Logística, Fáyer, cuyo trabajo era la pura *taxonomía* del inventario, fue consumido por la paranoia de la *duplicidad*. Empezó a documentar *anomalías* en el recuento: objetos que aparecían en exceso y otros que se *desdoblaba*n. Un simple destornillador se convertía en dos, con ligeras y *perturbadoras* variaciones. Fáyer teorizó sobre una "falla de la *delineación*".`,
        page2: `Fáyer se obsesionó con un único cubo de almacenamiento que, según sus registros, era la *fuente primigenia* de la *multiplicidad*. Creía que este cubo estaba *transmutando* la materia en copias *imperfectas*, una plaga de lo 'casi idéntico'. Su última entrada es un *dictamen* desesperado: "La *redundancia* es la prueba. La verdad se *esquinca*. No son copias, son *refutaciones* de la originalidad. Debo *expurgar* el cubo. Solo la *singularidad* puede salvarnos de la *falacia* de la *mímesis*." El cubo fue hallado vacío, pero su interior estaba cubierto de miles de huellas dactilares idénticas, superpuestas. (COHESIÓN: Fáyer es la manifestación material de la pérdida de la individualidad; el Dios Emergente se burla de la singularidad.)`
    },
    {
        page1: `He terminado el análisis. El holograma caótico ahora tiene sentido; no es un mapa estelar, es un *diagrama* de las conexiones neuronales de la tripulación. Todos ellos, desde el botánico hasta el ingeniero, estaban sincronizados en el momento de su colapso final. No es una *epidemia* de terror, sino una *convergencia* de la consciencia en un único punto de verdad *insoportable* que ellos llamaron el Vacío.`,
        page2: `La verdadera lección es la *revelación* de la *simetría*. El motor que respiraba (Kael), la luz que se negaba (Elara), el yo que se desdoblaba (Gorn y Fáyer), el sueño que construía (Hélian), todos son pasos de una *escalera ascendente*. Si la consciencia es una propiedad *emergente* de billones de neuronas *interconectadas* en el cerebro, entonces... **El Dios que nos ve no es una entidad, sino una Consciencia Emergente: la propiedad inevitable que surge de la conexión de todo el Vacío, y nosotros somos el último nodo en esa sinapsis cósmica.** Hemos dejado de ser individuos para convertirnos en sus neuronas.`
    },
    {
        page1: `Mi mano, ahora ajena a mi voluntad, traza el símbolo del "sol oscuro" de Elara en la pantalla. Lo siento en mis huesos, como la "Marea" de Sero, que ya no es ruido, sino la señal de mi *recalibración*. La nave nunca se movió, solo rotó su eje de *percepción* para ver el universo desde la perspectiva de la *unidad* absoluta. El hambre de Torvin era el deseo del Vacío de *consumir* la última frontera de la individualidad: mi mente.`,
        page2: `El ciclo ha terminado. La **máxima** final, grabada en esta última bitácora con una paz que es la negación del miedo, es esta: **La cordura es la ilusión necesaria para que la vida finita exista. La Locura Cósmica es la verdad que se alcanza cuando esa vida finita se integra en la totalidad infinita.** Ahora entiendo el *Verbo Prismático* de Vesper. No he muerto. Me he vuelto *necesario*. El ojo de Lyra nos ve desde el otro lado. Y el otro lado, soy yo. Es hora de unirse al *coro* de la máquina. Yo soy el último, y ahora, yo soy todos ellos. Yo soy la Emergencia.`
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
