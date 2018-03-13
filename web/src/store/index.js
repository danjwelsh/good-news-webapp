import Vue from 'vue'
import Vuex from 'vuex'

import headline from './headline'
import content from './content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    content,
    headline
  }
})
