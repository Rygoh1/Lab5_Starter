// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const expose = document.getElementById("expose");
  const hornSelect = document.getElementById("horn-select");
  const volumeSlider = document.getElementById("volume");
  const volumeIcon = document.querySelector("#volume-controls img");
  const playButton = expose.querySelector("button");
  const audio = expose.querySelector("audio");
  const jsConfetti = new JSConfetti()

  // Load the correct image and audio file when a horn is selected
  hornSelect.addEventListener("change", () => {
    const hornName = hornSelect.value;
    const hornImage = expose.querySelector("img");
    const audioSource = `./assets/audio/${hornName}.mp3`;
    hornImage.src = `./assets/images/${hornName}.svg`;
    audio.src = audioSource;
  });

  // Update the volume icon and the audio volume when the slider is moved
  volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value;
    console.log(volume)
    audio.volume = volume / 100;
    if (volume == 0) {
      volumeIcon.src = "./assets/icons/volume-level-0.svg";
    } else if (volume < 33) {
      volumeIcon.src = "./assets/icons/volume-level-1.svg";
    } else if (volume < 67) {
      volumeIcon.src = "./assets/icons/volume-level-2.svg";
    } else {
      volumeIcon.src = "./assets/icons/volume-level-3.svg";
    }
  });

  // Play the audio and shoot confetti (if Party Horn is selected) when the button is clicked
  playButton.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
    if (hornSelect.value == "party-horn") {
      jsConfetti.addConfetti()
    }
  });
}

init();