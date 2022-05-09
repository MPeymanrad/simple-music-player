const $ = document;
const audioElem = $.querySelector("audio");
const posterImg = $.querySelector(".poster");
const musicTitle = $.querySelector(".title");
const artistName = $.querySelector(".artist");
const timeElapsed = $.getElementById("timeElapsed");
const timeRemaining = $.getElementById("timeRemaining");
const timeLine = $.querySelector(".timeline");
const speedCombo = $.querySelector('.speed_combo')
const speedComboItems = $.querySelectorAll('.speed_combo_item')
//action buttons
const playBtn = $.getElementById("playBtn");
const prevBtn = $.getElementById("prevBtn");
const backwardBtn = $.getElementById("backwardBtn");
const forwardBtn = $.getElementById("forwardBtn");
const nextBtn = $.getElementById("nextBtn");
const speedBtn = $.getElementById('speedBtn')

let isPlaying = false;

let musicNum = Math.floor(Math.random() * 3);

let musics = [
  {
    source:'res/music/Fereydoun Asraei - Aslan (320).mp3',
    name: 'Aslan',
    artist: 'Fereydon Asraei',
    cover: 'res/posters/Fereydoun-Asraei-Aslan.jpg',
  },
  {
    source:'res/music/Ehsan khajeh amiri _ Bigharar (320).mp3',
    name: 'Bigharar',
    artist: 'Ehasan Khaje amiri',
    cover: 'res/posters/bigharar.jpg',
  },
  {
    source:'res/music/Homayoun Shajarian _ Zollf Bar Bad Madeh (320).mp3',
    name: 'Zolf Bar Bad Madeh',
    artist: 'Homayoun Shajarian',
    cover: 'res/posters/zolf.jpg',
  },
]

let calcTimeLineTimer;
let showElapsedTimeTimer;
let showRemaningTimeTimer;
function pausePrevMusic() {
  audioElem.pause()
  audioElem.currentTime = 0
  clearInterval(calcTimeLineTimer);
  clearInterval(showElapsedTimeTimer);
  clearInterval(showRemaningTimeTimer);
}
function playMusic() {
  audioElem.play();
  isPlaying = true;

  calcTimeLineTimer = calcTimeLine(audioElem);
  showElapsedTimeTimer = showElapsedTime(audioElem);
  showRemaningTimeTimer = showRemainingTime(audioElem);
  musicTitle.innerHTML = musics[musicNum].name;
  artistName.innerHTML = musics[musicNum].artist;
  posterImg.src = musics[musicNum].cover;
  playBtn.src = "res/icons/pause.svg";
}
function stopMusic() {
  audioElem.pause();
  isPlaying = false;
  playBtn.src = "res/icons/play.svg";
  clearInterval(calcTimeLineTimer);
  clearInterval(showRemaningTimeTimer);
  clearInterval(showElapsedTimeTimer);
}
function handlePlayBtn() {
  if (isPlaying) {
    stopMusic();
  } else {
    playMusic();
  }
}
function showElapsedTime() {
  let timer = setInterval(function () {
    let minute = Math.floor(audioElem.currentTime / 60);
    let sec = Math.floor(audioElem.currentTime % 60);
    if (minute === 0 && sec < 10) {
      timeElapsed.textContent = "00 : 0" + sec;
    } else if (minute === 0 && sec > 10) {
      timeElapsed.textContent = "00 : " + sec;
    } else if (minute > 0 && sec < 10) {
      timeElapsed.textContent = minute + " : 0" + sec;
    } else if (minute > 0 && sec > 10) {
      timeElapsed.textContent = minute + " : " + sec;
    }
  }, 1000);
  return timer;
}
function showRemainingTime() {
  let timer = setInterval(function () {
    let minute = Math.floor((audioElem.duration - audioElem.currentTime) / 60);
    let sec = Math.floor((audioElem.duration - audioElem.currentTime) % 60);
    if (minute === 0 && sec < 10) {
      timeRemaining.textContent = "00 : 0" + sec;
    } else if (minute === 0 && sec > 10) {
      timeRemaining.textContent = "00 : " + sec;
    } else if (minute > 0 && sec < 10) {
      timeRemaining.textContent = minute + " : 0" + sec;
    } else if (minute > 0 && sec > 10) {
      timeRemaining.textContent = minute + " : " + sec;
    }
  }, 1000);
  return timer;
}
function calcTimeLine() {
  let timer = setInterval(function () {
    const timeLineValue = (audioElem.currentTime * 100) / audioElem.duration;
    timeLine.value = timeLineValue;
  }, 1000);
  if (timeLine.value === "100") {
    clearInterval(timer);
    playBtn.src = "res/icons/pause.svg";
  }
  return timer;
}
function selectRandomMusic() {
  audioElem.src = musics[musicNum].source
  playMusic();
}
function goForward() {
  audioElem.currentTime += 10;
}
function goBackward() {
  audioElem.currentTime -= 10;
}
function goToNextMusic() {
  pausePrevMusic();
  let numberOfMusics = musics.length;
  if (musicNum + 1 === numberOfMusics) {
    musicNum = 0;
    audioElem.src = musics[musicNum].source
    playMusic();
  } else {
    musicNum += 1;
    audioElem.src = musics[musicNum].source
    playMusic();
  }
}
function goToPrevMusic() {
  pausePrevMusic();
  let numberOfMusics = musics.length;
  if (musicNum + 1 === 1) {
    musicNum = numberOfMusics - 1;
    audioElem.src = musics[musicNum].source
    playMusic();
  } else {
    musicNum -= 1;
    audioElem.src = musics[musicNum].source
    playMusic();
  }
}

function progressClickHandler(e) {
  const width = e.target.clientWidth;
  const clickX = e.offsetX
  const duration = audioElem.duration
  audioElem.currentTime = (clickX / width) * duration
}
function setMusicSpeed (e) {
  audioElem.playbackRate = e.target.innerHTML
  speedBtn.textContent = e.target.innerHTML + 'X'
  speedCombo.style.display = 'none'
}
playBtn.addEventListener("click", handlePlayBtn);
nextBtn.addEventListener("click", goToNextMusic);
prevBtn.addEventListener('click',goToPrevMusic)
backwardBtn.addEventListener("click", function () {
  goBackward();
});
forwardBtn.addEventListener("click", function () {
  goForward();
});
timeLine.addEventListener("click", function (e) {
  progressClickHandler(e);
});
speedBtn.addEventListener('click',function () {
  if (speedCombo.style.display === 'block') {
    speedCombo.style.display = 'none'
  } else {
    speedCombo.style.display = 'block'
  }
  
})
speedComboItems.forEach (function (item) {
  item.addEventListener('click',function (e) {
    setMusicSpeed(e)
  })
})
window.addEventListener("load", selectRandomMusic);
