import Vue from 'vue';
import VueWaiting from '../../src/vue-waiting';
import { OrbitSpinner } from 'epic-spinners';

import main from './main.vue';

Vue.use(VueWaiting);

Vue.component('orbit-spinner', OrbitSpinner);

new Vue({
  el: '#app',
  wait: new VueWaiting({ registerComponents: false }),
  render: function(createElement) {
    return createElement(main);
  }
});
