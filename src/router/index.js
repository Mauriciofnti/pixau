import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MonitoresView from '../views/Monitores.vue'
import PerifericosView from '../views/prod.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import About from '@/views/AboutView.vue'
import ProductDetails from '@/views/ProductDetails.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/monitores',
      name: 'monitores',
      component: About,
    },
        {
      path: '/perifericos',
      name: 'perifericos',
      component: PerifericosView,
    },
    {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/products/:category',
    name: 'Products',
    component: Products,
    props: true // Passa o parâmetro :category como prop
  },    
  {
    path: '/products/:pathMatch(.*)*',
    redirect: to => `/products/${to.params.pathMatch[0] || 'Monitores'}`
  }
  ],
})

export default router
