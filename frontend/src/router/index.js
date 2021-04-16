import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Article from '../views/Article.vue'
import User from '../views/User.vue'
import Comment from '../views/Comment.vue'
import Confirm from '../components/Confirm.vue'


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

  {
    path: '/success',
    name: 'success',
    component: Confirm
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
