import Vue from 'vue'
import Vuex from 'vuex'
import VueWaiting from '../../src/vue-waiting'

import main from './main.vue'

Vue.use(VueWaiting)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 1
  },
  getters: {
    count: (state) => state.counter
  },
  actions: {
    incrementAsync({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 3000)
      })
    }
  },
  mutations: {
    increment(state) {
      state.counter += 1
    }
  }
})

const waiting = new VueWaiting({
  useVuex: true,
  vuexModuleName: 'vuex-example-module',
  accessorName: '$l'
})

new Vue({
  el: '#app',
  store,
  waiting,
  render: function(createElement) {
    return createElement(main)
  }
})
