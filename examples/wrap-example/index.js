import Vue from 'vue';
import VueWaiting from '../../src/vue-waiting';

import main from './main.vue';

Vue.use(VueWaiting);

new Vue({
  el: '#app',
  wait: new VueWaiting({
    registerComponents: false,
    componentName: 'my-waiter'
  }),
  render: function(createElement) {
    return createElement(main);
  }
});
