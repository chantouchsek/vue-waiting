import Vue from 'vue'
import VueWaiting from '../../src/vue-waiting'

import main from './main.vue'

Vue.use(VueWaiting)

new Vue({
  el: '#app',
  waiting: new VueWaiting({
    registerComponents: false,
    componentName: 'my-waiter',
    useVuex: false
  }),
  render: function(createElement) {
    return createElement(main)
  }
})
