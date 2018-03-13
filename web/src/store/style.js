const state = {
  isPositive: true
}

const mutations = {
  togglePositive (state) {
    state.isPositive = !state.isPositive
  }
}

const actions = {}

const getters = {
  getIsPositive: (state) => {
    return state.isPositive
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
