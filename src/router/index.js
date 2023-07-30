import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth.vue')
    }
  ]
})

/**
 * Предотвращение несанкционированного доступа
 */

axios.interceptors.response.use(
  (response) => {
    next()
    return response
  },
  async (err) => {
    const authStore = useAuthStore()
    console.log('authStore', authStore.tokens.token)

    if (err.config.url.indexOf('account/token/refresh/') !== -1) {
      store.dispatch('logout')
      next('/login')
      return
    }

    if (err.response.status === 401) {
      const refresh = localStorage.getItem('refreshToken')
      return await store
        .dispatch('refreshToken', { refresh: refresh })
        .then((res) => {
          err.config.headers.Authorization = `JWT ${res.data.access}`
          localStorage.setItem('token', res.data.access)
          localStorage.setItem('refreshToken', res.data.refresh)
          axios.request(err.config)
          location.reload()
          return res
        })
        .catch((err) => err)
    }

    throw err
  }
)

export default router
