const audio = document.getElementById("audio");
const play = document.getElementById("play");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("../canciones.json")
.then(res => res.json())
.then(canciones => {

    const cancion = canciones.find(c => String(c.id) === String(id));

    if(!cancion){

        alert("Canción no encontrada");

        return;

    }

    audio.src = "https://edgardopeley26.github.io/venehit-audios/" + cancion.archivo;

    play.onclick = async () => {

        if(audio.paused){

            await audio.play();

            play.textContent = "⏸️ Pausar";

        }else{

            audio.pause();

            play.textContent = "▶️ Reproducir";

        }

    }

    audio.onended = ()=>{

        play.textContent="▶️ Reproducir";

    };

});