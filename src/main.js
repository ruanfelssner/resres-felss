import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAL5CLsnbv6ski9X4qdHInt9tvj3u-lsJw',
    libraries: 'places',
    componentName: 'googleNovo',
    autobindAllEvents: true,
    installComponents: true
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
