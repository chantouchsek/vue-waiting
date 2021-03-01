import Vue from 'vue'
import VueWaiting from '../../src/vue-waiting'
import { OrbitSpinner } from 'epic-spinners'

import main from './main.vue'

Vue.use(VueWaiting)

Vue.component('orbit-spinner', OrbitSpinner)

new Vue({
  el: '#app',
  waiting: new VueWaiting({ registerComponents: false, useVuex: false }),
  render: function(createElement) {
    return createElement(main)
  }
})
