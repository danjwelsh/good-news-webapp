import pos from './../content/en-pos.json'
import neg from './../content/en-neg.json'
import store from './../store/index'

const update = () => {
  if (store.getters.getIsPositive) {
    store.commit('updateContent', pos)
  } else {
    store.commit('updateContent', neg)
  }
}

export default {
  update
}
