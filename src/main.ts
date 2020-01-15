import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'

Vue.use(VueCompositionApi)

Vue.config.productionTip = false

Vue.prototype.$store = store()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
