let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}


function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
    playTrack();
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    playTrack();
}

document.querySelector('.prev').addEventListener('click', playPreviousTrack);
document.querySelector('.next').addEventListener('click', playNextTrack);

let audio = new Audio();
let audioTracks = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3'];
let currentTrackIndex = 0;
let isPlaying = false;

function playTrack() {
  audio.src = audioTracks[currentTrackIndex];
  audio.play();
  isPlaying = true;
  document.querySelector('.play-pause i').classList.remove('fa-play');
  document.querySelector('.play-pause i').classList.add('fa-pause');
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  document.querySelector('.play-pause i').classList.remove('fa-pause');
  document.querySelector('.play-pause i').classList.add('fa-play');
}

function togglePlayPause() {
  if (isPlaying) {
      pauseTrack();
  } else {
      playTrack();
  }
}

document.querySelector('.play-pause').addEventListener('click', togglePlayPause);


const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

 
audio.addEventListener('play', () => {
    audioCtx.resume().then(() => {
        draw();
    });
});
