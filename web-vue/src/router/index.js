import { createRouter, createWebHistory } from 'vue-router'
import FlaskTop from '../views/FlaskTop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FlaskTop',
      component: FlaskTop
    },
    {
      path: '/FlaskLogin',
      name: 'FlaskLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FlaskLogin.vue')
    },
    {
      path: '/FlaskHome',
      name: 'FlaskHome',
      component: () => import('../views/FlaskHome.vue')
    },
    {
      path: '/FlaskSettings',
      name: 'FlaskSettings',
      component: () => import('../views/FlaskSettings.vue')
    }
  ]
})

export default router
