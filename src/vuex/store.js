import { is, any, start, end, progress, percent, endProgress } from '../utils';

const mutations = {
  START: 'START',
  END: 'END',
  PROGRESS: 'PROGRESS'
};

export default {
  namespaced: true,
  state: {
    waitFor: [],
    progresses: {}
  },
  getters: {
    is: state => waiter => is(state.waitFor, waiter),
    any: state => any(state.waitFor),
    percent: state => waiter => percent(state.progresses, waiter)
  },
  actions: {
    start: ({ commit }, waiter) => commit(mutations.START, waiter),
    end: ({ commit }, waiter) => commit(mutations.END, waiter),
    progress: ({ commit }, progress) => commit(mutations.PROGRESS, progress)
  },
  mutations: {
    [mutations.START](state, waiter) {
      state.waitFor = start(state.waitFor, waiter);
    },
    [mutations.END](state, waiter) {
      state.waitFor = end(state.waitFor, waiter);
      state.progresses = endProgress(state.progresses, waiter);
    },
    [mutations.PROGRESS](state, { waiter, current, total }) {
      state.progresses = progress(state.progresses, waiter, current, total);
    }
  }
};
