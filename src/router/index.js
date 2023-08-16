import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'Search',
          component: () => import(/* webpackChunkName: "search" */'@/views/SearchView.vue')
        },
        {
          path: 'track/:id',
          name: 'Track',
          component: () => import(/* webpackChunkName: "track" */'@/views/TrackView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */'@/views/NotFoundView.vue')
    }
  ]
})

export default router
