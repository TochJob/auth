import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        requiresAuth: true
      },
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
 * Предотвращение несанкционированного доступа.
 *
 * При необходимости, можно закоммитить и пустит в основное приложение
 */

// router.beforeEach((to, from, next) => {
//   const AuthStore = useAuthStore()
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (AuthStore.requiresAuth) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

/**
 * Обработчик просрочки токена и обновление refresh-token
 */

axios.interceptors.response.use(undefined, async (err) => {
  const authStore = useAuthStore()
  if (err.response.status === 401) {
    const refresh = localStorage.getItem('refreshToken')
    try {
      const response = await authStore.refreshToken()
      localStorage.setItem('token', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      axios.request(err.config)
      location.reload()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  throw err
})

export default router
