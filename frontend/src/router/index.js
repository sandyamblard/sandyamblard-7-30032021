import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Article from '../views/Article.vue'
import User from '../views/User.vue'
import Comment from '../views/Comment.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/comment/:id',
    name: 'Comment',
    component: Comment
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
