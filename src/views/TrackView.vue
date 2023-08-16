<script setup>
  import { onMounted, toRaw } from 'vue'
  import { Icon } from '@iconify/vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useSongsStore } from '@/stores/songs.js'
  import { useCurrentSongStore } from '@/stores/currentSong.js'
  import Slider from '@/components/Slider.vue'

  const songsStore = useSongsStore()
  const currentSongStore = useCurrentSongStore()
  const { getSongById } = storeToRefs(songsStore)
  const route = useRoute()

  onMounted(() => {
    // check if page has been refreshed
    if (songsStore.songs.length) {
      const songId = +route.params.id

      if (currentSongStore.data.id !== songId) {
        const newSong = toRaw(getSongById.value(songId))
        currentSongStore.setCurrentSong(newSong)
      }
      
    }
  })
</script>

<template>
  <main class="track">
    <h1 class="visually-hidden">Track page</h1>
    <div v-if="Object.keys(currentSongStore.data).length" class="track__inner">
      <img :alt="currentSongStore.data.album.title" :src="currentSongStore.data.album.cover_big" class="track__image">
      <h1 class="track__name">{{ currentSongStore.data.title }}</h1>
      <span class="track__artist">{{ currentSongStore.data.artist.name }}</span>
      <div class="track__time">
        <span class="visually-hidden">Track time</span>
        <Slider
          :max="`${currentSongStore.data.duration}`"
          :value="`${currentSongStore.time}`"
          @updateValue="currentSongStore.changeTime"
          label="Change time"
          type="time" />
      </div>
      <div class="track__volume">
        <span class="visually-hidden">Volume</span>
        <Slider
          :value="`${currentSongStore.volume}`"
          @updateValue="currentSongStore.changeVolume"
          label="Change volume" />
      </div>
      <button @click="currentSongStore.toggleTimeBackward" class="button track__backward">
        <Icon icon="fa6-solid:backward-step" width="30" height="30"/>
        <span class="visually-hidden">Back</span>
      </button>
      <button @click="currentSongStore.togglePlay" class="button track__play">
        <div class="track__play-icon">
          <Transition name="fade" mode="out-in">
            <Icon v-if="!currentSongStore.isPlaying" icon="ion:play" width="50" height="50"/>
            <Icon v-else icon="akar-icons:pause" width="50" height="50"/>
          </Transition>
        </div>
        <span class="visually-hidden">Play or Pause</span>
      </button>
      <button @click="currentSongStore.toggleTimeForward" class="button track__forward">
        <Icon icon="fa6-solid:forward-step" width="30" height="30"/>
        <span class="visually-hidden">Forward</span>
      </button>
      <button :class="['button', 'track__repeat', {'track__repeat--active': currentSongStore.isLoop}]" @click="currentSongStore.toggleLoop">
        <Icon icon="solar:repeat-linear" width="30" height="30"/>
        <span class="visually-hidden">Repeat</span>
      </button>
    </div>
    <div v-else>Track not found</div>
  </main>
</template>

<style lang="scss" scoped>
  .track {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: $main-background;

    @media (max-width: $phone) {
      border-radius: 20px 20px 0 0;
      flex-grow: 1;
    } 
  }
  .track__inner {
    padding: 35px 30px;
    flex-grow: 1;
    align-self: stretch;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(5, min-content);
    column-gap: 20px;

    @media (max-width: $phone) {
      column-gap: 5px;
      row-gap: 10px;
    }
  }
  .track__image {
    border-radius: 10px;
    grid-column: span 6;
    grid-row: span 5;

    width: 100%;
    height: 100%;
    min-height: 320px;

    object-fit: cover;

    @media (max-width: $phone) {
      grid-column: span 12;
      grid-row: 1;
    }
  }
  .track__name {
    margin: 0;
    grid-column: span 6;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    line-height: 1.5em;
    text-align: center;

    @media (max-width: $phone) {
      grid-column: span 12;
    }
  }
  .track__artist {
    margin: 0 0 40px 0;
    grid-column: span 6;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      margin: 0;
      grid-column: span 12;
    }
  }
  .track__time {
    margin: 0 0 15px 0;
    grid-column: span 6;

    @media (max-width: $phone) {
      margin: 0;
      grid-column: span 12;
    }
  }
  .track__volume {
    margin: 0 0 30px 0;
    grid-column: span 6;

    @media (max-width: $phone) {
      margin: 0;
      grid-column: span 12;
    }
  }
  .track__forward,
  .track__backward {
    @media (max-width: $phone) {
      grid-column: span 3;
    }
  }
  .track__play {
    grid-column: span 2;
    @include mix.hover {
      & .track__play-icon {
        box-shadow: 0 0 29px 6px rgba(93, 228, 185, 0.2);
      }
    }
    &:active {
      opacity: 1;
    }

    @media (max-width: $phone) {
      grid-column: span 3;
    }
  }
  .track__play-icon {
    padding: 15px;
    color: $main-text;
    display: flex;
    width: min-content;
    border-radius: 50%;
    background-image: linear-gradient(110deg, $main-gradient);
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    transition: box-shadow 0.2s ease;
  }
  /* fade animation */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .track__repeat {
    grid-column: span 2;

    &--active {
      color: $primary;
    }
  }
</style>
