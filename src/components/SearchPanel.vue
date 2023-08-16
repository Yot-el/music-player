<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { Icon } from '@iconify/vue'
  import { ref } from 'vue'
  import { useSongsStore } from '@/stores/songs.js'

  const searchText = ref('')
  const route = useRoute()
  const router = useRouter()
  const songsStore = useSongsStore()
  
  const getSearchResults = () => {
    const params = encodeURIComponent(searchText.value.toLowerCase())
    songsStore.getSongs(params)

    if (route.params.id) {
      router.back()
    }
  }
</script>

<template>
  <header class="search-panel">
    <button v-if="route.fullPath !== '/'" class="search-panel__back button button--muted" @click="router.back()">
      <Icon icon="material-symbols:arrow-back-ios-new" width="30" height="30"/>
      <span class="visually-hidden">Go back to search</span>
    </button>
    <form @submit.prevent="getSearchResults" class="search-panel__form">
      <input v-model="searchText" class="search-panel__input" placeholder="Search" type="search" />
      <button class="search-panel__search button button--muted" type="submit">
        <Icon icon="iconamoon:search" width="30" height="30"/>
        <span class="visually-hidden">Search</span>
      </button>
    </form>
  </header>
</template>

<style lang="scss" scoped>
  .search-panel {
    padding: 0 30px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 20px;
    min-height: 70px;

    @media (max-width: $phone) {
      column-gap: 5px;
      padding: 0 10px;
    }
  }
  .search-panel__back {
    grid-column: span 2;
  }
  .search-panel__form {
    grid-column: 3 / span 10;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 20px;
  }
  .search-panel__input {
    grid-column: span 8;
    display: flex;
    padding: 0;

    font-family: $font-family;
    color: $muted-text;
    font-size: 18px;
    line-height: 1.5em;
    text-align: center;

    background-color: transparent;
    border: none;

    transition: all 0.3s ease;

    @include mix.hover {
      color: $main-text;
    }

    &:focus {
      outline: none;
    }

    &:active {
      border: none;
    }
  }

  .search-panel__search {
    grid-column: span 2;
  }
</style>