const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");

const totalCycles = document.getElementById("total-cycles");
const shortPause = document.getElementById("short-pause-time");
const longPause = document.getElementById("long-pause-time");

const focusSound = new Audio("./assets/sounds/focus-sound.mp3");
focusSound.loop = true;
focusSound.volume = 0.5;

const timerStartSound = new Audio("./assets/sounds/timer-start.mp3");
const timerEndSound = new Audio("./assets/sounds/timer-ends.mp3");

let interval;

const focusTimer = {
  minutes: 0,
  seconds: 3,
  cycles: 0,
  shortPause: 0,
  longPause: 0,
  totalCycles: 0,

  setCyclesAndPauses() {
    this.totalCycles = totalCycles.value;
    this.shortPause = shortPause.value;
    this.longPause = longPause.value;
  },

  addMinutes() {
    if (this.minutes == 60) {
      return;
    } else {
      this.minutes++;
    }
    return this.minutes;
  },

  removeMinutes() {
    if (this.minutes == 0) {
      return;
    } else {
      this.minutes--;
    }
    return this.minutes;
  },

  countdown() {
    if (this.seconds == 0) {
      this.seconds = 60;
      this.minutes--;
    }
    this.seconds--;
  },
};

function updateTimer() {
  minutes.innerHTML = focusTimer.minutes.toString().padStart("2", 0);
  seconds.innerHTML = focusTimer.seconds.toString().padStart("2", 0);
}

plusBtn.addEventListener("click", () => {
  focusTimer.addMinutes();
  updateTimer();
});

minusBtn.addEventListener("click", () => {
  focusTimer.removeMinutes();
  updateTimer();
});

playBtn.addEventListener("click", () => {
  focusTimer.setCyclesAndPauses;
  pauseBtn.classList.remove("hidden");
  playBtn.classList.add("hidden");
  plusBtn.classList.add("not-active");
  minusBtn.classList.add("not-active");
  timerStartSound.play();
  startFocusTime();
  focusSound.play();
});

pauseBtn.addEventListener("click", () => {
  pauseBtn.classList.toggle("hidden");
  playBtn.classList.toggle("hidden");
  clearTimeout(interval);
  focusSound.pause();
});

stopBtn.addEventListener("click", () => {
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
  plusBtn.classList.remove("not-active");
  minusBtn.classList.remove("not-active");
  setTimeToZero();
  stopFocusSound();
  updateTimer();
});

function setTimeToZero() {
  focusTimer.minutes = 0;
  focusTimer.seconds = 0;
}

function stopFocusSound() {
  focusSound.pause();
  focusSound.currentTime = 0;
}

function timesOver() {
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  plusBtn.classList.remove("not-active");
  minusBtn.classList.remove("not-active");
  stopFocusSound();
  timerEndSound.play();
}

function startFocusTime() {
  interval = setTimeout(() => {
    let timeOver = focusTimer.minutes <= 0 && focusTimer.seconds <= 0;

    updateTimer();

    if (timeOver) {
      timesOver();
        return;
    }

    focusTimer.countdown();
    updateTimer();

    startFocusTime();
  }, 1000);
}

updateTimer();
