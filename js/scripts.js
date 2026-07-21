const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("/venehit/canciones.json")
  .then(res => res.json())
  .then(canciones => {

    const cancion = canciones.find(c => c.id === id);

    if (!cancion) {
      alert("Canción no encontrada");
      return;
    }

    audio.src = "audios/" + cancion.archivo;

    playButton.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await audio.play();
          playButton.textContent = "⏸️ Pausar";
        } else {
          audio.pause();
          playButton.textContent = "▶️ Reproducir";
        }
      } catch (e) {
        console.error(e);
        alert("No se pudo reproducir el audio.");
      }
    });

    audio.addEventListener("ended", () => {
      playButton.textContent = "▶️ Reproducir";
    });

  })
 .catch(async err => {
  console.error(err);

  alert(
    "Nombre: " + err.name +
    "\n\nMensaje: " + err.message +
    "\n\nRevisa la consola para más detalles."
  );
});
  