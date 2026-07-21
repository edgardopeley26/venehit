const contador = document.getElementById("contador");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const anio = document.getElementById("anio");

const qrDiv = document.getElementById("qr");

const btnSiguiente = document.getElementById("siguiente");
const btnRevelar = document.getElementById("revelar");
const btnNuevaPartida = document.getElementById("nuevaPartida");

let canciones = [];
let cancionesPendientes = [];
let cancionActual = null;

// Cargar canciones
fetch("../canciones.json?v=" + Date.now())
    .then(res => res.json())
    .then(data => {

    canciones = data;

   console.log("Total canciones cargadas:", canciones.length);
   
    iniciarPartida();

})
    .catch(err => {

        console.error(err);
        alert("No se pudo cargar canciones.json");

    });

// ---------------------------

function iniciarPartida(){

    cancionesPendientes = [...canciones];

    // Mezclar canciones
    for(let i = cancionesPendientes.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [cancionesPendientes[i], cancionesPendientes[j]] =
        [cancionesPendientes[j], cancionesPendientes[i]];
    }

    cancionActual = null;

    qrDiv.innerHTML = "";

    titulo.textContent = "?????";
    artista.textContent = "";
    anio.textContent = "";

    contador.textContent = `Canciones disponibles: ${cancionesPendientes.length}`;

    btnSiguiente.style.display = "inline-block";
    btnNuevaPartida.style.display = "inline-block";

}

// ---------------------------

function siguienteCancion(){

    console.log("Botón siguiente presionado");
    console.log("Pendientes:", cancionesPendientes.length);

    if(cancionesPendientes.length === 0){

        contador.textContent = "🏁 Fin de la partida";

        btnSiguiente.style.display = "none";
        btnNuevaPartida.style.display = "inline-block";

        qrDiv.innerHTML = "";

        return;
    }

    cancionActual = cancionesPendientes.pop();

    
    titulo.textContent = "?????";
    artista.textContent = "";
    anio.textContent = "";

    contador.textContent = `Carta ${cancionActual.id} · Restan ${cancionesPendientes.length}`;

    qrDiv.innerHTML = "";

    const url = `https://edgardopeley26.github.io/venehit/v2/player.html?id=${cancionActual.id}`;

    new QRCode(qrDiv,{
        text:url,
        width:300,
        height:300
    });

}

// ---------------------------

function revelarCancion(){

    if(!cancionActual) return;

    // Ocultar todo antes de revelar
    anio.textContent = "";
    titulo.textContent = "";
    artista.textContent = "";

    const tarjeta = document.getElementById("tarjetaAnio");

    tarjeta.classList.remove("revelado");

    void tarjeta.offsetWidth;

    // 1. Aparece el año
    setTimeout(() => {

        anio.textContent = cancionActual.anio;
        tarjeta.classList.add("revelado");

    }, 300);

    // 2. Aparece el título
setTimeout(() => {

    titulo.textContent = cancionActual.titulo;

    titulo.classList.remove("animacionTexto");
    void titulo.offsetWidth;
    titulo.classList.add("animacionTexto");

}, 1000);

// 3. Aparece el artista
setTimeout(() => {

    artista.textContent = cancionActual.artista;

    artista.classList.remove("animacionTexto");
    void artista.offsetWidth;
    artista.classList.add("animacionTexto");

}, 1700);

}

// ---------------------------

btnSiguiente.onclick = siguienteCancion;

btnRevelar.onclick = revelarCancion;

btnNuevaPartida.onclick = iniciarPartida;

btnNuevaPartida.style.display = "inline-block";
console.log("Botón nueva partida mostrado", btnNuevaPartida);

console.log(btnNuevaPartida);