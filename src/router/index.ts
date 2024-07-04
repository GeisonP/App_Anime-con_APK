import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AnimeDetailsPage from '@/views/AnimeDetailsPage.vue';
import AnimeListPage from '@/views/AnimeListPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/list/genre/:genreId',
    name: 'ListByGenre',
    component: AnimeListPage
  },
  {
    path: '/anime/details/:id',
    name: 'AnimeDetails',
    component: AnimeDetailsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
