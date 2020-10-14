import Vue from 'vue';
import VueWaiting from '../../src/vue-waiting';

import main from './main.vue';

Vue.use(VueWaiting);

new Vue({
  el: '#app',
  wait: new VueWaiting({ registerComponents: false }),
  render: function(createElement) {
    return createElement(main);
  }
});
