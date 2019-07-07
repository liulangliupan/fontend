import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sys
    // permission
  }
})

export default store