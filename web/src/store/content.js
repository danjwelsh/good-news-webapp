import pos from './../content/en-pos.json'
import utils from './../utils'

const state = {
  isPositive: true,
  content: pos
}

const mutations = {
  togglePositive (state) {
    state.isPositive = !state.isPositive
    utils.content.update()
  },
  updateContent (state, payload) {
    state.content = payload
  }
}

const actions = {}

const getters = {
  getIsPositive: (state) => {
    return state.isPositive
  },
  getContent: (state) => {
    return state.content
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
