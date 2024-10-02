let startTime, updatedTime, difference;
let tInterval;
let running = false;
let laps = [];
let lapCount = 0;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("laps");
const toggleThemeButton = document.getElementById("toggleTheme");

startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
toggleThemeButton.addEventListener("click", toggleTheme);

function startPauseTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    running = true;
    startPauseButton.textContent = "Pause";
    resetButton.disabled = false;
    lapButton.disabled = false;
  } else {
    clearInterval(tInterval);
    running = false;
    startPauseButton.textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00:000";
  startPauseButton.textContent = "Start";
  resetButton.disabled = true;
  lapButton.disabled = true;
  laps = [];
  lapCount = 0;
  lapList.innerHTML = "";
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
  if (milliseconds < 10) milliseconds = "00" + milliseconds;

  display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

function recordLap() {
  lapCount++;
  const lapTime = formatTime(difference);
  laps.push(lapTime);

  const lapItem = document.createElement("li");
  lapItem.classList.add("lap-item");
  lapItem.innerHTML = `Lap ${lapCount}: ${lapTime} <button onclick="deleteLap(this)">Delete</button>`;
  lapItem.addEventListener('click', () => highlightLap(lapItem));
  lapList.appendChild(lapItem);
  lapItem.style.transform = 'scale(0.5)';
  setTimeout(() => {
    lapItem.style.transform = 'scale(1)';
  }, 0);
}

function formatTime(ms) {
  let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((ms % 1000));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
  if (milliseconds < 10) milliseconds = "00" + milliseconds;

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function highlightLap(item) {
  document.querySelectorAll(".lap-item").forEach(el => el.classList.remove("selected"));
  item.classList.add("selected");
}

function deleteLap(button) {
  button.parentNode.remove();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
