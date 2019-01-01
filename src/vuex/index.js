import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultOrigin: 'http://127.0.0.1:3000/'
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })