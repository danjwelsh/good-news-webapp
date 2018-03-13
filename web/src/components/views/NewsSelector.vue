<template lang="html">
  <div id="news-selector">
    <button class="button" v-on:click="setPositive">Good</button>
    <button class="button" v-on:click="setNegative">Bad</button>
  </div>
</template>

<script>
import api from './../../api'

export default {
  name: 'news-selector',
  data () {
    return {}
  },
  methods: {
    setPositive: async () => {
      console.log('pos')
      let posHeadlines = []

      try {
        posHeadlines = await api.headlines.fetchPositiveHeadlines()
        this.$store.commit('updateHeadlines', posHeadlines)
      } catch (e) {
        console.error(e)
      }
    },
    setNegative: async () => {
      console.log('neg')

      let negHeadlines = []

      try {
        negHeadlines = await api.headlines.fetchNegativeHeadlines()
        this.$store.commit('updateHeadlines', negHeadlines)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #news-selector {
    .selector {
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 1;
    }

  }
</style>
