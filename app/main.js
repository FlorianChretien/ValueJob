import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';
import VueDevtools from 'nativescript-vue-devtools'

require('nativescript-bottombar/vue').register(Vue);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: 'localhost:8098' })
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
