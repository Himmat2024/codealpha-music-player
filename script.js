const songs = [
  { title: "Pashto Song", artist: "Pashto Attan", src: "song1.mp3" },
  { title: "Dari Song", artist: "Dari Remix", src: "song2.mp3" },
  { title: "Arabic Song", artist: "Arabic Pop-up", src: "song3.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const playlistEl = document.getElementById("playlist");


function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylistUI(index);
}


function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}


function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}


function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


progressContainer.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  const rect = this.getBoundingClientRect();
  const clickX = touch.clientX - rect.left;
  const width = rect.width;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});


function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
}


function setVolume(value) {
  audio.volume = value;
}


function updatePlaylistUI(activeIndex) {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === activeIndex);
  });
}


function buildPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = "⏸️";
    };
    playlistEl.appendChild(li);
  });
}


audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);


buildPlaylist();
loadSong(currentSong);
