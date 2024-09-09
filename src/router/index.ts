import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      props: (route) => ({
        timestamp: route.query.time !== undefined ? Number(route.query.time) : undefined
      })
    }
  ]
})

export default router
