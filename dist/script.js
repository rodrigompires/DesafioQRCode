import musicList from "./musicList.js";
const $iconChange = document.querySelector('.change__icon');
let on = false;
$iconChange.addEventListener('pointerdown', (e) => {
    const $body = document.querySelector('body');
    $body.classList.toggle('player');
    $body.classList.contains('player') ? on = true : on = false;
    if (on) {
        startData(indexMusic);
    }
    else {
        $img.src = './assets/images/image-qr-code.png';
        pauseMusic();
    }
});
const btn = document.querySelector('.fa-bars');
const cardL = document.querySelector('.musics');
const close = document.querySelector('.musics__close');
btn.addEventListener('click', () => {
    showList();
    cardL.classList.add('show');
});
close.addEventListener('click', () => {
    cardL.classList.remove('show');
});
const amountSongs = musicList.length;
let indexMusic = 0;
let $timeDuration = document.querySelector('.duration__duration');
let $currentTime = document.querySelector('.duration__current');
const $artistName = document.querySelector('.artist__name');
const $musicName = document.querySelector('.artist__music');
const musicAudio = document.createElement('audio');
function startData(index) {
    musicAudio.setAttribute('src', musicList[index].music);
    musicAudio.addEventListener('loadeddata', () => {
        $artistName.textContent = musicList[index].artist;
        $musicName.textContent = musicList[index].name;
        $img.src = musicList[index].src;
        $timeDuration.textContent = secondsMinutes(Math.floor(musicAudio.duration));
        $progress.value = `${0}`;
    });
}
const $progress = document.querySelector('.timer__range');
window.changeTime = function () {
    let updatedTimeMusic = musicAudio.duration * (+$progress.value / 100);
    musicAudio.currentTime = updatedTimeMusic;
};
musicAudio.addEventListener('timeupdate', () => {
    let time = Math.floor((musicAudio.currentTime / musicAudio.duration) * 100);
    $progress.value = `${time}`;
    secondsMinutes(musicAudio.currentTime);
    $currentTime.textContent = secondsMinutes(Math.floor(musicAudio.currentTime));
});
function secondsMinutes(seconds) {
    let musicMinutes = Math.floor(seconds / 60);
    let musicSeconds = seconds % 60;
    let musicSecondsString = musicSeconds.toString();
    if (musicSeconds < 10)
        musicSecondsString = `0${musicSeconds}`;
    return `${musicMinutes}:${musicSecondsString}`;
}
let isMusicPlaying = false;
const $controlPlay = document.querySelector('.controls__plays');
function playPauseMusic() {
    isMusicPlaying ? pauseMusic() : playMusic();
}
const $strokes = document.querySelectorAll('.wave__stroke');
$controlPlay.addEventListener('click', () => {
    playPauseMusic();
});
const $disco = document.querySelector('.card__boximg');
const $img = document.querySelector('.card__img');
function playMusic() {
    $disco.classList.add('rotate');
    $disco.style.animationPlayState = 'running';
    musicAudio.play();
    isMusicPlaying = true;
    $controlPlay.innerHTML = '<i class="fa-solid fa-pause controls__play"></i>';
    $strokes.forEach((element) => {
        element.classList.add('show');
    });
}
function pauseMusic() {
    musicAudio.pause();
    isMusicPlaying = false;
    $disco.style.animationPlayState = 'paused';
    $controlPlay.innerHTML = '<i class="fa-solid fa-play controls__play"></i>';
    $strokes.forEach((element) => {
        element.classList.remove('show');
    });
}
const $nextMusic = document.querySelector('.fa-forward');
const $previousMusic = document.querySelector('.fa-backward');
$nextMusic.addEventListener('click', () => {
    indexMusic++;
    indexMusic >= amountSongs ? indexMusic = 0 : indexMusic;
    startData(indexMusic);
    $disco.classList.remove('rotate');
    pauseMusic();
});
$previousMusic.addEventListener('click', () => {
    indexMusic--;
    indexMusic < 0 ? indexMusic = amountSongs - 1 : indexMusic;
    startData(indexMusic);
    $disco.classList.remove('rotate');
    pauseMusic();
});
const $progressVolume = document.querySelector('.volume__range');
$progressVolume.addEventListener('input', (e) => {
    volume();
});
function volume() {
    let sliderVolume = +$progressVolume.value;
    musicAudio.volume = sliderVolume / 100;
}
const audioOthers = document.createElement('audio');
const like = document.querySelector('.icons__hearts');
like.addEventListener('click', () => {
    audioOthers.src = './assets/audio/iPhone Message Sound Effects.mp3';
    audioOthers.play();
    const heartsItens = document.querySelectorAll('.icons__heart');
    heartsItens.forEach((heart) => {
        heart.classList.toggle('show');
    });
});
function showList() {
    const $ul = document.querySelector('.musics__list');
    audioOthers.src = './assets/audio/click.mp3';
    audioOthers.play();
    musicList.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('musics__item');
        li.setAttribute('id', `${item.id}`);
        li.innerHTML = `
        <div class="musics__row">
            <span class="musics__singer">${item.artist}</span>
            <p class="musics__music">${item.name}</p>
        </div>
             <span class="musics__duration">${item.duration}</span>
    `;
        $ul.appendChild(li);
        li.addEventListener('click', (e) => {
            const buttonTarget = e.currentTarget;
            startData(+buttonTarget.id);
            $disco.classList.remove('rotate');
            playPauseMusic();
        });
    });
}
//# sourceMappingURL=script.js.map