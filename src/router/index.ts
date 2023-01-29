import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/routes/countries',
      name: 'Countries',
      component: () => import('../views/Countries.vue')
    },
    {
      path: '/routes/languages',
      name: 'Languages',
      component: () => import('../views/Languages.vue')
    },
    {
      path: '/routes/category',
      name: 'Category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/routes/comprehensive',
      name: 'Theater',
      component: () => import('../views/Comprehensive.vue')
    },
    {
      path: '/routes/novel',
      name: 'Novel',
      component: () => import('../views/Novel.vue')
    },
    {
      path: '/routes/manga',
      name: 'Manga',
      component: () => import('../views/Manga.vue')
    },
    {
      path: '/routes/music',
      name: 'Music',
      component: () => import('../views/Music.vue')
    },
    {
      path: '/routes/game',
      name: 'Game',
      component: () => import('../views/Game.vue')
    },
    {
      path: '/routes/adult',
      name: 'Adult',
      component: () => import('../views/Adult.vue')
    }
  ]
})

export default router
