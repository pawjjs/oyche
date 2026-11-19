import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

//tablica routingow (endpointow/sciezek)
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
     path: '/game',
     name: 'game',
     component: GameView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
