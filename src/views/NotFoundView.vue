<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found">
    <h1 class="not-found__title">404 - Not Found</h1>
    <p class="not-found__text">Whoops! Something went wrong.</p>
    <RouterLink class="not-found__link" to="/">Go to the search page</RouterLink>
  </main>
</template>

<style lang="scss" scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .not-found__title {
    margin: 0;
    line-height: 1.5em;
  }
  .not-found__text {
    margin: 0 0 40px 0;
  }
  .not-found__link {
    text-decoration: none;
    color: $secondary;

    transition: opacity 0.2s ease;

    @include mix.hover {
      opacity: 0.6;
    }
  }
</style>