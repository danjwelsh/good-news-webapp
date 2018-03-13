const state = {
  headlines: [],
  votes: {}
}

const mutations = {
  updateHeadlines (state, payload) {
    state.headlines = payload
  },
  updateVote (state, payload) {
    if (state.votes[payload.id] === undefined) {
      state.votes[payload.id] = payload.vote
    } else {
      state.votes[payload.id] = payload.vote
    }

    console.log(state.votes[payload.id])
  }
}

const actions = {}

const getters = {
  getHeadlines: (state) => {
    return state.headlines
  },
  getHeadlineVote: (state) => (id) => {
    return state.votes[id]
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
