import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/books/add',
    name: 'addBook',
    component: () => import(/* webpackChunkName: "addBook" */ '../views/AddBookView.vue')
  },
  {
    path: '/books/:id',
    name: 'book',
    component: () => import(/* webpackChunkName: "book" */ '../views/BookView.vue')
  }, 
  {
    path: '/books/:id/edit',
    name: 'editbook',
    component: () => import(/* webpackChunkName: "book" */ '../views/EditBookView.vue')
  },  
]

const router = new VueRouter({
  routes
})

export default router
