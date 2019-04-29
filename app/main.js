import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';
import VueDevtools from 'nativescript-vue-devtools'

Vue.registerElement('BottomBar', () => require('nativescript-bottombar').BottomBar);
Vue.registerElement('BottomBarItem', () => require('nativescript-bottombar').BottomBarItem);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '10.10.134.123' })
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('Frame', [ h(App)] )
}).$start()
