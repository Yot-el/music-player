<script setup>
  import { ref } from 'vue'
  import { useSongsStore } from '@/stores/songs.js'
  import { Icon } from '@iconify/vue'
  import TrackLink from '@/components/TrackLink.vue'
  import * as utils from '@/utils/utils.js'
  
  const songsStore = useSongsStore()

  const isScrollEnd = ref(false)
  const bottomElement = ref(null)

  const checkScrollEnd = (event) => {
    if (event.target.scrollTop + event.target.offsetHeight >= event.target.scrollHeight) {
      isScrollEnd.value = true
      return
    }

    isScrollEnd.value = false
  }

  const scrollDelay = 50
  const optimizedScrollHandler = utils.throttle(checkScrollEnd, scrollDelay)
  
  const scrollToBottom = () => {
    bottomElement.value.scrollIntoView({behavior: "smooth"})
  }
</script>

<template>
  <main class="search-results">
    <h1 class="visually-hidden">Search page</h1>
    <section class="search-results__inner">
      <h2 class="visually-hidden">List of songs found</h2>
      <div v-if="songsStore.songs.length" class="search-results__content">
        <ul @scroll="optimizedScrollHandler" class="search-results__list" aria-label="Songs found">
          <TrackLink
            v-for="song in songsStore.songs"
            :key="song.id"
            :song="song" />
          <div ref="bottomElement"></div>
        </ul>
        <button v-if="!isScrollEnd" @click="scrollToBottom" class="button search-results__button search-results__button--bottom">
          <Icon icon="material-symbols:arrow-back-ios-new" width="30" height="30"/>
          <span class="visually-hidden">To the end of search list</span>
        </button>
      </div>
      <span v-else class="search-results__note">No songs found</span>
    </section>
    <div class="search-results__buttons">
      <button v-if="songsStore?.prevUrl" @click="songsStore.getPrevSongs" class="button search-results__button search-results__button--prev">
        <Icon icon="material-symbols:arrow-back-ios-new" width="30" height="30"/>
        <span class="visually-hidden">Previous page</span>
      </button>
      <button v-if="songsStore?.nextUrl" @click="songsStore.getNextSongs" class="button search-results__button search-results__button--next">
        <Icon icon="material-symbols:arrow-back-ios-new" width="30" height="30"/>
        <span class="visually-hidden">Next page</span>
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .search-results {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      flex-grow: 1;
    }
  }
  .search-results__inner {
    height: 450px;
    align-self: stretch;
    display: flex;
    padding: 20px 30px;
    justify-content: center;
    background-color: $main-background;
    border-radius: 20px;
    overflow: hidden;

    @media (max-width: $phone) {
      border-radius: 20px 20px 0 0;
      padding: 20px 15px 65px;
      flex-grow: 1;
    }
  }
  .search-results__content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .search-results__list {
    margin: 0;
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;

    list-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    /* Firefox scrollbar */
    scrollbar-width: none;
  }
  .search-results__note {
    align-self: center;
  }
  .search-results__button {
    width: 50px;
    height: 50px;
    
    background-color: transparentize($second-background, 0.2);
    border-radius: 50%;

    &--bottom {
      z-index: 1;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: rotate(-90deg);
    }

    &--next {
      transform: rotate(180deg);
    }
  }
  .search-results__buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateY(100%);
    gap: 10px;

    @media (max-width: $phone) {
      transform: translateY(0);
    } 
  }
</style>
