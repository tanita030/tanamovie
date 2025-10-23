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
  { titulo:'Bby sigo aqui.mp3', artista:'Tana', albumArt:'imagenes/album/portada1.png', archivoAudio:'musica/sigo.mp3', videoURL: 'videos/sigo.mp4', mensaje: "Cancion que va sobre alguien que sufre pero que va a aguantar lo que sea por amor a si misma y a las personas que le importan" },
  { titulo:'Low K.M4A', artista:'Tana', albumArt:'imagenes/album/portada2.png', archivoAudio:'musica/loca.mp3', videoURL: 'videos/loka.mp4', mensaje: "Cancion que va sobre alguien que se esta volviendo loco en el sentido de que todo los ideales y pensamientos que tenia super seguros, empiezan a romperse. Se emppieza a cuestionar todo y se vuelve loca porque ya no entiende nada de lo que pasa ni siente nada." },
  { titulo:'Amigo mio.mp3', artista:'Tana', albumArt:'imagenes/album/portada3.png', archivoAudio:'musica/amigo.mp3', videoURL: 'videos/amigo.mp4', mensaje: "Cancion que va dedicada a ese amigo que siempre se mete en lios, y le pides que deje de hacerlo" },
  { titulo:'Mensaje frio.mp3', artista:'Tana', albumArt:'imagenes/album/portada4.png', archivoAudio:'musica/calavera.mp3', videoURL: 'videos/calavera.mp4', mensaje: "Cancion que va sobre la curiosidad por la muerte y el sinsentido de la vida" },
  { titulo:'Desepsion.mp3', artista:'Tana', albumArt:'imagenes/album/portada5.png', archivoAudio:'musica/desepsion.mp3', videoURL: 'videos/desepsion.mp4', mensaje: "Cancion que va sobre la decepcion que te llevas al crecer y dejar de ver las cosas como un niño" },
  { titulo:'Domingo cerrao.mp3', artista:'Tana', albumArt:'imagenes/album/portada6.png', archivoAudio:'musica/domingo.wav', videoURL: 'videos/domingo.mp4', mensaje: "Cancion que va sobre la inseguridad del amor romanico" },
  { titulo:'Marcas.mp3', artista:'Tana', albumArt:'imagenes/album/portada7.png', archivoAudio:'musica/marcas.wav', videoURL: 'videos/marcas.mp4', mensaje: "Cancion que va sobre la dependencia emocional." },
  { titulo:'Nunca jamás.mp3', artista:'Tana', albumArt:'imagenes/album/portada8.png', archivoAudio:'musica/nunca.mp3', videoURL: 'videos/nunca.mp4', mensaje: "Cancion que va sobre el amor erotico" },
  { titulo:'No se.M4A', artista:'Tana', albumArt:'imagenes/album/portada9.png', archivoAudio:'musica/paq.mp3', videoURL: 'videos/paq.mp4', mensaje: "Cancion que va sobre la apatia, el autocuestionamiento, el no tener ganas de levantarse cada mañana, y el bucle vacio de la existencia" },
  { titulo:'Paranoia.mp3', artista:'Tana', albumArt:'imagenes/album/portada10.png', archivoAudio:'musica/paranoia.mp3', videoURL: 'videos/paranoia.mp4', mensaje: "Cancion que va sobre la paranoia. Toca temas como la fe por necesidad. El comportamiento paranoico de reafirmar tus creencias y ahora todo es demasiada casualidad. Que nos encanta sentirnos diferentes y parte de algo que nos haga superiores, como saber algo que no sabes. Que el tiempo pasa muy rapido, parece lineal, pero es un ciclo.Que a los humanos nos encanta ver patrones donde no los hay. Quey nos sentimos comodos con la rutina, pero despues queremos ser 'libres' de la sociedad y lo establecido por ella"},
  { titulo:'Trapboliko.M4A', artista:'Tana', albumArt:'imagenes/album/portada11.png', archivoAudio:'musica/trap.mp3', videoURL: 'videos/trapboliko.mp4', mensaje: "Cancion que va sobre esas personas que les encanta contar sus problemas  la gente que acaba de conocer. Sus problemas mas intimos y profundos.Y que no cuentan a sus amigos de verdad. Esos pesados que te encuentras siempre en un contexto de fiesta, normalmente borrachos, y te empiezan a contar mierdas que no te importan y muchas cosas de su vida personal. Y que son super egocentricos y siempre empiezan las frases con un 'yo'. Gente que siempre esta buscando una victima a la que darle la turra. Normalmente cocainomanos." },
  { titulo:'Chao.mp3', artista:'Tana', albumArt:'imagenes/album/portada12.png', archivoAudio:'musica/chao.mp3', videoURL: 'videos/chao.mp4', mensaje: "Cancion que va sobre cuando te cansas de alguien. Va sobre el desapego de una persona a la que tenias dependencia emocional." },
  { titulo:'Aguanté.mp3', artista:'Tana, Dr.', albumArt:'imagenes/album/portada111.png', archivoAudio:'musica/aguante.mp3', videoURL: 'videos/aguante.mp4', mensaje: "Cancion que va sobre la mochila que cargamos de cosas de la vida, tanto buenas como malas. Pero que pesan, y hay que ser listo y fuerte para cargarlas." }
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
        page2: `El primer informe de "la pérdida de la luz" fue de un botánico, el Dr. Elara. Había estado estudiando una nueva forma de vida vegetal que emitía bioluminiscencia. Un día, la planta dejó de brillar. Elara afirmó que había absorbido la luz, no solo de ella, sino de la propia habitación. A partir de ese momento, comenzó a dibujar un símbolo repetitivo, un sol oscuro, que aparecía en cada informe que firmaba. `
    },
    {
        page1: `El siguiente relato era del ingeniero jefe, Kael. Estaba obsesionado con el "silencio del motor". Juraba que podía escuchar el motor de la nave, aunque estaba apagado. Al principio eran susurros, luego voces. Se negaba a apagar su estación de trabajo, creyendo que el motor le estaba hablando. En sus últimos registros, se encontraron ecuaciones sin sentido y la frase "la máquina respira" escrita una y otra vez.`,
        page2: `La capitana, Lyra, fue la última en caer. Su registro de mando era la prueba más clara de la locura. Había notado que las estrellas del exterior cambiaban de color y que las constelaciones no eran las mismas. Afirmó que la nave ya no se movía a través del espacio, sino a través de un "vacío entre dimensiones". Lo último que escribió fue: "Hemos llegado. Su ojo nos ve desde el otro lado. Nos llama a casa".`
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
