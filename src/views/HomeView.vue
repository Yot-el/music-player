<script setup>
  import { RouterView } from 'vue-router'
  import SearchPanel from '@/components/SearchPanel.vue'
</script>

<template>
  <div class="home">
    <SearchPanel />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    width: 60vw;
    max-width: 800px;

    @media (max-width: $phone) {
      width: 100vw;
      max-width: none;
    }
  }
</style>