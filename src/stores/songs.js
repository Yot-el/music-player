import { defineStore } from 'pinia'
import * as api from '@/utils/api.js'

export const useSongsStore = defineStore('songs', {
  state: () => ({
    songs: [],
    nextUrl: null,
    prevUrl: null,
    total: 0
  }),
  actions: {
    setData(data) {
      this.songs = data.data
      this.nextUrl = data.next ? data.next : null
      this.prevUrl = data.prev ? data.prev : null
      this.total = data.total
    },
    async getSongs(request) {
      const requestUrl = `${api.searchUrl}${request}`;
      const result = await api.getData(requestUrl)
      this.setData(result)
    },
    async getNextSongs() {
      const result = await api.getData(this.nextUrl)
      this.setData(result)
    },
    async getPrevSongs() {
      const result = await api.getData(this.prevUrl)
      this.setData(result)
    }
  },
  getters: {
    getSongById: (state) => {
      return (songId) => state.songs.find((song) => song.id === songId)
    }
  }
})
