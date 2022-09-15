// import 'babel-polyfill' 
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import VueLoading from 'vuejs-loading-plugin'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import axios from 'axios'
Vue.use(Vuelidate)

Vue.config.productionTip = false


Vue.use(VueLoading, {
  text: 'Cargando',
})

// Vue.prototype.$http = axios
// const accessToken = sessionStorage.getItem('accessToken')
// if (accessToken) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// }

new Vue({
  router:router,
  store:store,
  render: h => h(App),
  created() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
  updated() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
}).$mount('#app')
