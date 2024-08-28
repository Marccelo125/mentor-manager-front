import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !sessionStorage.getItem('token')) {
    next({ name: 'login' })
  }
  if (to.name === 'login' && sessionStorage.getItem('token')) {
    next({ name: 'home' })
  }
  if (to.name === 'register' && sessionStorage.getItem('token')) {
    next({ name: 'home' })
  }
  next()
})

export default router
