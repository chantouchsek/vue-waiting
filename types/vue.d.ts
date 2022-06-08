/**
 * Extends interfaces in Vue.js
 */

import Vue from 'vue';
import VueWaiting from './';

declare module '@nuxt/types' {
  interface Context {
    $wait: VueWaiting;
  }
  interface NuxtAppOptions {
    $wait: VueWaiting;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $waiting: VueWaiting;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    waiting?: VueWaiting;
  }
}
