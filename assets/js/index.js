const minutos = document.querySelector(".minutos");
const segundos = document.querySelector(".segundos");
const botaoPlay = document.getElementById("botao-play");
const botaoPause = document.getElementById("botao-pause");
const botaoStop = document.getElementById("botao-stop");
const botaoMais = document.getElementById("botao-mais");
const botaoMenos = document.getElementById("botao-menos");

const focusSound = new Audio("./assets/sounds/focus-sound.mp3")
focusSound.loop = true
focusSound.volume = 0.2

const timerStartSound = new Audio("./assets/sounds/timer-start.mp3")
const timerEndSound = new Audio("./assets/sounds/timer-ends.mp3")

let intervalo;

const focusTimer = {
  minutos: 0,
  segundos: 10,

  adicionaMinutos() {
    if (this.minutos == 60) {
      return;
    } else {
      this.minutos += 5;
    }
    return this.minutos;
  },

  subtraiMinutos() {
    if (this.minutos == 0) {
      return;
    } else {
      this.minutos -= 5;
    }
    return this.minutos;
  },

  temporizador() {
    if (this.segundos == 0) {
      this.segundos = 60;
      this.minutos--;
    }
    this.segundos--;
  },
};

function updateTimer() {
  minutos.innerHTML = focusTimer.minutos.toString().padStart("2", 0);
  segundos.innerHTML = focusTimer.segundos.toString().padStart("2", 0);
}

botaoMais.addEventListener("click", () => {
  focusTimer.adicionaMinutos();
  updateTimer();
});

botaoMenos.addEventListener("click", () => {
  focusTimer.subtraiMinutos();
  updateTimer();
});

botaoPlay.addEventListener("click", () => {
  botaoPause.classList.remove("hidden");
  botaoPlay.classList.add("hidden");
  botaoMais.classList.add("not-active");
  botaoMenos.classList.add("not-active");
  timerStartSound.play()
  contagemRegressiva();
  focusSound.play()
});

botaoPause.addEventListener("click", () => {
  botaoPause.classList.toggle("hidden");
  botaoPlay.classList.toggle("hidden");
  clearTimeout(intervalo);
  focusSound.pause()
});

botaoStop.addEventListener("click", () => {
  botaoPause.classList.add("hidden");
  botaoPlay.classList.remove("hidden");
  botaoMais.classList.remove("not-active");
  botaoMenos.classList.remove("not-active");
  setTimeToZero()
  stopFocusSound()
  updateTimer();
});

function setTimeToZero() {
  focusTimer.minutos = 0;
  focusTimer.segundos = 0;
}

function stopFocusSound() {
  focusSound.pause()
  focusSound.currentTime = 0
}

function contagemRegressiva() {
  intervalo = setTimeout(() => {
    let timerZerado = focusTimer.minutos <= 0 && focusTimer.segundos <= 0;

    updateTimer();
    if (timerZerado) {
      botaoPlay.classList.remove("hidden");
      botaoPause.classList.add("hidden");
      botaoMais.classList.remove("not-active");
      botaoMenos.classList.remove("not-active");
      stopFocusSound()
      timerEndSound.play()
      return;
    }

    focusTimer.temporizador()
    updateTimer();

    contagemRegressiva();
  }, 1000);
}

updateTimer();
