// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // load voices
  const voicesSelect = document.querySelector('#voice-select');
  let voices = [];

  function loadVoices() {
    voices = speechSynthesis.getVoices();
    voicesSelect.innerHTML = '';
    voices.forEach((voice, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${voice.name} (${voice.lang})`;
      voicesSelect.appendChild(option);
    });
  }
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  // button click event
  const button = document.querySelector('button');
  const face = document.querySelector('img');
  const text = document.querySelector('#text-to-speak');
  let talking = false;
  let synth = null;

  button.addEventListener('click', () => {
    if (!talking) {
      // if not talking, start talking
      const selectedVoiceIndex = voicesSelect.value;
      const selectedVoice = voices[selectedVoiceIndex];
      if (!selectedVoice) return;
      synth = new SpeechSynthesisUtterance(text.value);
      synth.voice = selectedVoice;
      synth.onstart = () => {
        talking = true;
        face.src = 'assets/images/smiling-open.png';
      };
      synth.onend = () => {
        talking = false;
        face.src = 'assets/images/smiling.png';
      };
      speechSynthesis.speak(synth);
    } else {
      // if currently talking, cancel and set face to smiling
      speechSynthesis.cancel();
      talking = false;
      face.src = 'assets/images/smiling.png';
    }
  });
}