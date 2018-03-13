<template lang="html">
  <div id="headlines">
      <div class="container">
        <section class="section">
          <div class="spinner section" v-if="isBusy">
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
          </div>
          <div v-else="isBusy">
            <button class="button" v-on:click="setPositive" v-bind:class="{ positive: isPositive }">{{content.buttons.selectors.pos}}</button>
            <button class="button" v-on:click="setNegative" v-bind:class="{ negative: !isPositive }">{{content.buttons.selectors.neg}}</button>
            <headline v-for="headline in headlines" v-bind:headline="headline" ></headline>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
import api from './../../api'
import Headline from './../views/Headline.vue'

export default {
  name: 'headlines',
  components: {
    Headline
  },
  data () {
    return {
      headlines: [],
      isBusy: false
    }
  },
  async mounted () {
    let h = {}
    try {
      // Get headlines
      h = await api.headlines.fetchPositiveHeadlines()
    } catch (e) {
      console.error(e)
    }

    // Check for uuid, if not there, get one
    let uuid = this.$cookies.get('user_id')

    if (!uuid) {
      try {
        uuid = await api.user.fetchUserId()
        this.$cookies.set('user_id', uuid.uuid, '3m')
      } catch (e) {
        console.error(e)
      }
    }

    let annotations = {}
    try {
      annotations = await api.user.fetchUserAnnotations(uuid)

      Object.keys(annotations).forEach((key) => {
        this.$store.commit('updateVote', {id: key, vote: annotations[key]})
      })
    } catch (e) {
      console.error(e)
    }

    for (let i = 0; i < h.length; i++) {
      let annotation = annotations[h[i].id + '']
      if (annotation) {
        h[i].vote = annotation
      } else {
        h[i].vote = 0
      }
    }

    this.headlines = h
    this.$store.commit('updateHeadlines', h)
  },
  computed: {
    content () {
      return this.$store.getters.getContent
    },
    isPositive () {
      return this.$store.getters.getIsPositive
    }
  },
  methods: {
    setPositive: async function () {
      this.$store.commit('togglePositive')

      this.isBusy = true

      let posHeadlines = []

      try {
        posHeadlines = await api.headlines.fetchPositiveHeadlines()

        for (let i = 0; i < posHeadlines.length; i++) {
          let vote = this.$store.getters.getHeadlineVote(posHeadlines[i].id)

          if (vote) {
            posHeadlines[i].vote = vote
          } else {
            posHeadlines[i].vote = 0
          }
        }

        this.headlines = posHeadlines
        this.$store.commit('updateHeadlines', posHeadlines)

        this.isBusy = false
      } catch (e) {
        console.error(e)
      }
    },
    setNegative: async function () {
      this.$store.commit('togglePositive')

      this.isBusy = true

      let negHeadlines = []

      try {
        negHeadlines = await api.headlines.fetchNegativeHeadlines()

        for (let i = 0; i < negHeadlines.length; i++) {
          let vote = this.$store.getters.getHeadlineVote(negHeadlines[i].id)

          if (vote) {
            negHeadlines[i].vote = vote
          } else {
            negHeadlines[i].vote = 0
          }
        }

        this.headlines = negHeadlines

        this.$store.commit('updateHeadlines', negHeadlines)

        this.isBusy = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#headlines {

  .button {
    transition: all $transition-delay ease;
  }

  .positive {
    background-color: $green;
    color: white;
  }

  .negative {
    background-color: $red;
    color: white;
  }

  .spinner {
    text-align: center;
  }
}
</style>
