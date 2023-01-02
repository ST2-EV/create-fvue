import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { auth } from "../../firebase/credentials"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
      beforeEnter: (to, from, next) => {
        (!auth.currentUser) ? next({ path: '/login'}) : next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        (auth.currentUser) ? next({ path: '/home'}) : next();
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        (auth.currentUser) ? next({ path: '/home'}) : next();
      },
    }
  ]
})


export default router
