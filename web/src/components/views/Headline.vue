<template lang="html">
  <div id="headline">
    <div class="columns is-mobile">
      <div class="column is-12 headline-title">
        <a :href="headline.link" target="_blank">
          <p class="is-size-4">
            {{headline.headline}}
          </p>
        </a>
      </div>
    </div>
    <div class="columns is-mobile headline-info">
      <div class="column is-12">
        <p>
          <span class="semantic-value is-size-5">
            {{headline.semantic_value}} {{source}}, {{published}}
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-mobile headline-meta">
      <div class="column is-12">
        <p>
          <!-- 👍  👎 -->
          <button class="button" :disabled="voted" v-on:click="votePos">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                    <g id="Artboard-4" transform="translate(-356.000000, -115.000000)" stroke="#333333" stroke-width="2">
                        <g id="8" transform="translate(356.000000, 115.000000)" v-bind:class="{pos: votedPos}">
                            <path d="M21,6 L9,18" id="Path-14"></path>
                            <path d="M9,13 L4,18" id="Path-14" transform="translate(6.500000, 15.500000) scale(-1, 1) translate(-6.500000, -15.500000) "></path>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
          <button class="button" :disabled="voted" v-on:click="voteNeg">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                    <g id="Artboard-4" transform="translate(-312.000000, -115.000000)" stroke="#333333" stroke-width="2">
                        <g id="7" transform="translate(312.000000, 115.000000)" v-bind:class="{neg: votedNeg}">
                            <path d="M19,5 L5,19" id="Path-14"></path>
                            <path d="M19,5 L5,19" id="Path-14" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "></path>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
        </p>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>

import Moment from 'moment'
import api from './../../api/'

export default {
  name: 'headline',
  components: {
  },
  props: [
    'headline'
  ],
  data () {
    return {
      // vote: 0
    }
  },
  computed: {
    source () {
      let source = this.headline.origin
      source = source.replace('-', ' ')
      source = source.replace('-', ' ') // NY Times uses a different '-' character
      source = source.replace('-', ' ') // NY Times uses a different '-' character
      // Title case from: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
      source = source.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })

      switch (source) {
        case 'Bbc News':
          source = 'BBC News'
          break
        case 'Cnn':
          source = 'CNN'
          break
        case 'The Guardian Uk':
          source = 'The Guardian UK'
          break
        default:
          break
      }

      return source
    },
    voted () {
      if (this.headline.vote !== 0) {
        return true
      }
      return false
    },
    votedNeg () {
      if (this.headline.vote < 0) {
        console.log(this.headline.vote)
        return true
      }
      return false
    },
    votedPos () {
      if (this.headline.vote > 0) {
        return true
      }
      return false
    },
    published () {
      return new Moment(this.headline.published_at).fromNow()
    }
  },
  // TODO: update UI when user votes, and save vote to local storage to update UI with on next session
  methods: {
    async votePos () {
      let userId = this.$cookies.get('user_id')

      try {
        await api.headlines.postVote(this.headline.id, userId, 1)
      } catch (e) {
        console.error(e)
        return
      }
      this.headline.vote = this.headline.vote + 1
      this.$store.commit('updateVote', {id: this.headline.id, vote: 1})
    },
    async voteNeg () {
      let userId = this.$cookies.get('user_id')
      try {
        await api.headlines.postVote(this.headline.id, userId, -1)
      } catch (e) {
        console.error(e)
        return
      }
      this.headline.vote = this.headline.vote + -1
      this.$store.commit('updateVote', {id: this.headline.id, vote: -1})
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
#headline {
  margin-top: 2%;

  .headline-title {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .headline-info {
    margin-bottom: 0;
  }

  svg {
    .pos {
      stroke: $yellow;
    }

    .neg {
      stroke: $yellow;
    }
  }

  a {
    color: #666666;
  }

  a:hover {
    color: #222222;
  }
}
</style>
