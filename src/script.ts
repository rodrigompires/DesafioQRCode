import musicList from "./musicList.js";

const $iconChange = document.querySelector('.change__icon') as Element;
let on = false;

$iconChange.addEventListener('pointerdown', (e: Event) => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    $body.classList.toggle('player');
    $body.classList.contains('player') ? on = true : on = false;
    if (on) {
        startData(indexMusic);
    } else {
        $img.src = './assets/images/image-qr-code.png';
        pauseMusic()
    }
})

const btn = document.querySelector('.fa-bars') as HTMLElement;
const cardL = document.querySelector('.musics') as HTMLDivElement;

const close = document.querySelector('.musics__close') as HTMLSpanElement;

btn.addEventListener('click', () => {
    showList()
    cardL.classList.add('show');
})

close.addEventListener('click', () => {
    cardL.classList.remove('show');
})


const amountSongs: number = musicList.length;
let indexMusic: number = 0;
let $timeDuration = document.querySelector('.duration__duration') as HTMLSpanElement;
let $currentTime = document.querySelector('.duration__current') as HTMLSpanElement;
const $artistName = document.querySelector('.artist__name') as HTMLSpanElement;
const $musicName = document.querySelector('.artist__music') as HTMLSpanElement;
const musicAudio = document.createElement('audio');




function startData(index: number) {
    // debugger
    musicAudio.setAttribute('src', musicList[index].music);
    musicAudio.addEventListener('loadeddata', () => {
        $artistName.textContent = musicList[index].artist;
        $musicName.textContent = musicList[index].name;
        $img.src = musicList[index].src;
        $timeDuration.textContent = secondsMinutes(Math.floor(musicAudio.duration));
        $progress.value = `${0}`;
    })
}


// TIME
// ____________________________________________________________________________________________

const $progress = document.querySelector('.timer__range') as HTMLInputElement;

(window as any).changeTime = function () {
    let updatedTimeMusic: number = musicAudio.duration * (+$progress.value / 100);
    musicAudio.currentTime = updatedTimeMusic;
}

musicAudio.addEventListener('timeupdate', () => {
    let time = Math.floor((musicAudio.currentTime / musicAudio.duration) * 100);
    $progress.value = `${time}`;
    secondsMinutes(musicAudio.currentTime);
    $currentTime.textContent = secondsMinutes(Math.floor(musicAudio.currentTime))

})

function secondsMinutes(seconds: number) {
    let musicMinutes = Math.floor(seconds / 60);
    let musicSeconds = seconds % 60;
    let musicSecondsString = musicSeconds.toString()
    if (musicSeconds < 10) musicSecondsString = `0${musicSeconds}`;
    return `${musicMinutes}:${musicSecondsString}`

}


// FUNÇÃO PLAY
// ____________________________________________________________________________________________
let isMusicPlaying = false;
const $controlPlay = document.querySelector('.controls__plays') as HTMLDivElement;

function playPauseMusic () {
    isMusicPlaying ? pauseMusic() : playMusic();
}
const $strokes = document.querySelectorAll('.wave__stroke') as NodeListOf < HTMLSpanElement >;

$controlPlay.addEventListener('click', () => {
    playPauseMusic();
})

const $disco = document.querySelector('.card__boximg') as HTMLDivElement;
const $img = document.querySelector('.card__img') as HTMLImageElement;

function playMusic() {
    // debugger

    // $img.src = musicList[indexMusic].src;
    $disco.classList.add('rotate');
    $disco.style.animationPlayState = 'running';

    musicAudio.play();
    isMusicPlaying = true;
    $controlPlay.innerHTML = '<i class="fa-solid fa-pause controls__play"></i>';
    $strokes.forEach((element) => {
        element.classList.add('show');
    })
}

function pauseMusic () {
    musicAudio.pause();
    isMusicPlaying = false;
    // $disco.classList.remove('rotate');
    $disco.style.animationPlayState = 'paused';
    $controlPlay.innerHTML = '<i class="fa-solid fa-play controls__play"></i>';
    $strokes.forEach((element) => {
        element.classList.remove('show');
    })

}

const $nextMusic = document.querySelector('.fa-forward') as HTMLElement;
const $previousMusic = document.querySelector('.fa-backward') as HTMLElement;

$nextMusic.addEventListener('click', () => {
    indexMusic++
    indexMusic >= amountSongs ? indexMusic = 0 : indexMusic;
    startData(indexMusic);
    $disco.classList.remove('rotate');
    pauseMusic()
})

$previousMusic.addEventListener('click', () => {
    indexMusic--;
    indexMusic < 0 ? indexMusic = amountSongs - 1 : indexMusic;
    startData(indexMusic);
    $disco.classList.remove('rotate');
    pauseMusic();
})


// FUNÇÃO VOLUME
// ____________________________________________________________________________________________
const $progressVolume = document.querySelector('.volume__range') as HTMLInputElement;
$progressVolume.addEventListener('input', (e: Event) => {
    volume();
})

function volume() {
    let sliderVolume = +$progressVolume.value;
    musicAudio.volume = sliderVolume / 100;
}


// FUNÇÃO LIKE
// ____________________________________________________________________________________________
const audioOthers = document.createElement('audio');
const like = document.querySelector('.icons__hearts') as HTMLDivElement
like.addEventListener('click', () => {
    audioOthers.src = './assets/audio/iPhone Message Sound Effects.mp3';
    audioOthers.play();
    const heartsItens = document.querySelectorAll('.icons__heart') as NodeListOf < Element >

        heartsItens.forEach((heart) => {
            heart.classList.toggle('show')
        })
})


// MOSTRAR LISTA DE MUSICAS
// ____________________________________________________________________________________________
function showList() {
    const $ul = document.querySelector('.musics__list') as HTMLUListElement;
    audioOthers.src = './assets/audio/click.mp3';
    audioOthers.play();
    // const id = event.target
    musicList.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('musics__item');
        li.setAttribute('id', `${item.id}`)
        li.innerHTML = `
        <div class="musics__row">
            <span class="musics__singer">${item.artist}</span>
            <p class="musics__music">${item.name}</p>
        </div>
             <span class="musics__duration">${item.duration}</span>
    `
        $ul.appendChild(li)
        li.addEventListener('click', (e: Event) => {
            const buttonTarget = e.currentTarget as HTMLElement;
            startData(+buttonTarget.id);
            $disco.classList.remove('rotate');
            playPauseMusic();
        })
    })
}
