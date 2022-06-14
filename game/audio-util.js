const audioHandler = {}
const music23 = new Audio('./audio/scene23music.wav')
music23.loop = true
const music4 = new Audio('./audio/scene4music.wav')
music4.loop = true
const music5 = new Audio('./audio/scene5music.wav')
music5.loop = true

function playAudioOnce(audio){
    if(!audioHandler[audio]){
        const newAudio = new Audio(`./audio/${audio}.wav`)
        audioHandler[audio] = newAudio
    }

    audioHandler[audio].pause()
    audioHandler[audio].currentTime = 0
    audioHandler[audio].play()
}

function playFade(audio){
    audio.volume = 0
    audio.play()
    setTimeout(() => audio.volume = 0.2 , 20)
    setTimeout(() => audio.volume = 0.4 , 40)
    setTimeout(() => audio.volume = 0.6 , 60)
    setTimeout(() => audio.volume = 0.8 , 80)
    setTimeout(() => audio.volume = 1 , 100)

}

function stopFade(audio){
    setTimeout(() => audio.volume = 0.8 , 30)
    setTimeout(() => audio.volume = 0.6 , 60)
    setTimeout(() => audio.volume = 0.4 , 90)
    setTimeout(() => audio.volume = 0.2 , 120)
    setTimeout(() => audio.volume = 0 , 150)
    setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
    }, 180)

}
