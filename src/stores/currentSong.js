import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import * as utils from '@/utils/utils.js'

export const useCurrentSongStore = defineStore('currentSong', () => {
  // data
  const audio = new Audio()
  const data = ref({})
  const setCurrentSong = (newData) => {
    data.value = newData
    audio.src = newData.preview
    isPlaying.value = false
    isLoop.value = false
    changeTime(0)
    sessionStorage.setItem('currentSong', JSON.stringify(newData))
  }

  // play / pause
  const isPlaying = ref(false)
  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
  }
  watch(isPlaying, (newValue) => {
    if (newValue) {
      audio.play()
      return
    }
    audio.pause()
  })

  // loop
  const isLoop = ref(false)
  const toggleLoop = () => {
    isLoop.value = !isLoop.value
  }
  watch(isLoop, (newValue) => {
    audio.loop = newValue
  })

  // volume
  const volume = ref(20)
  const changeVolume = (value) => {
    volume.value = value
  }
  watch(volume, (newVolume) => {
    audio.volume = newVolume / utils.percentValue
    sessionStorage.setItem('songVolume', newVolume)
  })

  // time
  const timeStep = 10
  const time = ref(0)
  const toggleTimeBackward = () => {
    audio.currentTime -= timeStep
  }
  const toggleTimeForward = () => {
    audio.currentTime += timeStep
  }
  const changeTime = (value) => {
    audio.currentTime = value
  }

  // audio event listener
  audio.addEventListener('timeupdate', () => {
    time.value = audio.currentTime
    sessionStorage.setItem('songTime', audio.currentTime)

    if (audio.ended) {
      isPlaying.value = false
    }
  })

  // session storage
  const songInSessionStorage = sessionStorage.getItem('currentSong')
  if (songInSessionStorage) {
    setCurrentSong(JSON.parse(songInSessionStorage))
    changeVolume(sessionStorage.getItem('songVolume'))
    changeTime(sessionStorage.getItem('songTime'))
  }

  return { data, isPlaying, isLoop, volume, time, setCurrentSong, toggleLoop, togglePlay, changeVolume, toggleTimeBackward, toggleTimeForward, changeTime }
})