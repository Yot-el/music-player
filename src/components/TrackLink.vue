<script setup>
  import { RouterLink } from 'vue-router'

  const props = defineProps({
    song: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <RouterLink
    :style="{backgroundImage: `url(${song.album.cover_big})`}"
    :to="`track/${song.id}`"
    class="track-link" >
    <div class="track-link__inner"> 
      <span class="track-link__name">{{ song.title }}</span>
      <span class="track-link__artist">{{ song.artist.name }}</span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .track-link {
    position: relative;
    padding: 20px 20px 30px 20px;
    display: flex;

    color: $main-text;
    text-decoration: none;

    background-color: $second-background;
    background-repeat: no-repeat;
    background-position: right;
    background-size: 45%;
    border-radius: 20px;

    transition: color 0.3s ease;

    @include mix.hover {
      color: $primary;
    }

    &:after {
      z-index: 0;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(90deg, $second-background 63%, transparent 81%);
      border-radius: 20px;
    }
  }

  .track-link__inner {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    z-index: 1;
  }
  .track-link__name {
    width: 70%;
    font-weight: 700;
  }
  .track-link__artist {
    font-size: 12px;
    line-height: 1.5em;
  }
</style>