import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: "Easy Web TV: Online SmartTV"
      }
    },
    {
      path: '/routes/countries',
      name: 'Countries',
      component: () => import('../views/Countries.vue'),
      meta: {
        title: "TV Channels"
      }
    },
    {
      path: '/routes/languages',
      name: 'Languages',
      component: () => import('../views/Languages.vue'),
      meta: {
        title: "TV Channels"
      }
    },
    {
      path: '/routes/category',
      name: 'Category',
      component: () => import('../views/Category.vue'),
      meta: {
        title: "TV Channels"
      }
    },
    {
      path: '/routes/comprehensive',
      name: 'Theater',
      component: () => import('../views/Comprehensive.vue'),
      meta: {
        title: "Theater"
      }
    },
    {
      path: '/routes/radio',
      name: 'Radio',
      component: () => import('../views/Radio.vue'),
      meta: {
        title: "Radio"
      }
    },
    {
      path: '/routes/novel',
      name: 'Novel',
      component: () => import('../views/Novel.vue'),
      meta: {
        title: "Novel"
      }
    },
    {
      path: '/routes/manga',
      name: 'Manga',
      component: () => import('../views/Manga.vue'),
      meta: {
        title: "Novel"
      }
    },
    {
      path: '/routes/music',
      name: 'Music',
      component: () => import('../views/Music.vue'),
      meta: {
        title: "Music"
      }
    },
    {
      path: '/routes/game',
      name: 'Game',
      component: () => import('../views/Game.vue'),
      meta: {
        title: "Game"
      }
    },
    {
      path: '/routes/adult',
      name: 'Adult',
      component: () => import('../views/Adult.vue'),
      meta: {
        title: "Adult"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title as string
  }
  
  next()
})

export default router
