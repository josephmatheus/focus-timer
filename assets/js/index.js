const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const plusBtn = document.getElementById("plus-btn");
const minusBtn = document.getElementById("minus-btn");

const focusSound = new Audio("./assets/sounds/focus-sound.mp3")
focusSound.loop = true
focusSound.volume = 0.5

const timerStartSound = new Audio("./assets/sounds/timer-start.mp3")
const timerEndSound = new Audio("./assets/sounds/timer-ends.mp3")

let interval;

const focusTimer = {
  workTime: {
    minutes: 0,
    seconds: 3,
  },

  addMinutes() {
    if (this.workTime.minutes == 60) {
      return;
    } else {
      this.workTime.minutes += 5;
    }
    return this.workTime.minutes;
  },

  removeMinutes() {
    if (this.workTime.minutes == 0) {
      return;
    } else {
      this.workTime.minutes -= 5;
    }
    return this.workTime.minutes;
  },

  countdown() {
    if (this.workTime.seconds == 0) {
      this.workTime.seconds = 60;
      this.workTime.minutes--;
    }
    this.workTime.seconds--;
  },
};

function updateTimer() {
  minutes.innerHTML = focusTimer.workTime.minutes.toString().padStart("2", 0);
  seconds.innerHTML = focusTimer.workTime.seconds.toString().padStart("2", 0);
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
  pauseBtn.classList.remove("hidden");
  playBtn.classList.add("hidden");
  plusBtn.classList.add("not-active");
  minusBtn.classList.add("not-active");
  timerStartSound.play()
  countdown();
  focusSound.play()
});

pauseBtn.addEventListener("click", () => {
  pauseBtn.classList.toggle("hidden");
  playBtn.classList.toggle("hidden");
  clearTimeout(interval);
  focusSound.pause()
});

stopBtn.addEventListener("click", () => {
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
  plusBtn.classList.remove("not-active");
  minusBtn.classList.remove("not-active");
  setTimeToZero()
  stopFocusSound()
  updateTimer();
});

function setTimeToZero() {
  focusTimer.workTime.minutes = 0;
  focusTimer.workTime.seconds = 0;
}

function stopFocusSound() {
  focusSound.pause()
  focusSound.currentTime = 0
}

function timesOver(){
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  plusBtn.classList.remove("not-active");
  minusBtn.classList.remove("not-active");
  stopFocusSound()
  timerEndSound.play()
}

function countdown() {
  interval = setTimeout(() => {
    let timeOver = focusTimer.workTime.minutes <= 0 && focusTimer.workTime.seconds <= 0;

    updateTimer();

    if (timeOver) {
      timesOver()
      return;
    }

    focusTimer.countdown()
    updateTimer();

    countdown();
  }, 1000);
}

updateTimer();
