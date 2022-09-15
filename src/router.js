import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/apertura/:cuenta/step1',
      name: 'step1',
      component: () => import(/* webpackChunkName: "about" */ './views/Step1.vue'),
      // children: [
      //   { path: 'step-one', name: 'paso1', component }
      // ]
    },
    {
      path: '/apertura/:cuenta/step2',
      name: 'step2',
      component: () => import(/* webpackChunkName: "about" */ './views/Step2.vue'),
    },
    {
      path: '/apertura/:cuenta/step3',
      name: 'step3',
      component: () => import(/* webpackChunkName: "about" */ './views/Step3.vue'),
    },
    {
      path: '/apertura/:cuenta/step4',
      name: 'step4',
      component: () => import(/* webpackChunkName: "about" */ './views/Step4.vue'),
    },
    {
      path: '/apertura/:cuenta/detalle-cuenta',
      name: 'detallecuenta',
      component: () => import(/* webpackChunkName: "about" */ './views/DetalleCuenta.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/validate',
      name: 'validate',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/vuelidate.vue')
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
