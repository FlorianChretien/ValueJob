import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
/*import VueDevtools from 'nativescript-vue-devtools'*/
import RadCartesianChart from 'nativescript-ui-chart/vue'
Vue.use(RadCartesianChart);

Vue.registerElement('BottomBar', () => require('nativescript-bottombar').BottomBar);
Vue.registerElement('BottomBarItem', () => require('nativescript-bottombar').BottomBarItem);

if(TNS_ENV !== 'production') {
  /*Vue.use(VueDevtools, { host: '192.168.0.163' })*/
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
  store,
  render: h => h('Frame', [ h(App)] )
}).$start()
