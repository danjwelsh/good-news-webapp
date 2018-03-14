<template lang="html">
  <div id="title-bar">
    <section class="hero is-medium is-primary" v-bind:class="{ positive: isPositive, negative: !isPositive}">
      <div class="hero-head">
        <nav-bar></nav-bar>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{content.title}}
          </h1>
          <h2 class="subtitle">
            {{content.subtitle}}
          </h2>
          <p>
            Good News is a machine learning approach sentiment analysis over news headlines.
            <br />
            <br />
            <strong>Help improve Good News and vote up headlines if they are categorised correctly, or vote headlines down if it hasnt!</strong>
          </p>
        </div>
      </div>
      <div class="hero-footer">
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import NewsSelector from './NewsSelector.vue'
export default {
  name: 'title-bar',
  components: {
    NavBar,
    NewsSelector
  },
  data () {
    return {
    }
  },
  computed: {
    content () {
      return this.$store.getters.getContent
    },
    isPositive () {
      return this.$store.getters.getIsPositive
    }
  }
}
</script>

<style lang="scss" scoped>
  svg {
    fill: white;
    stroke: white;
  }

  .hero {
    transition: all $transition-delay ease;
  }

  .positive {
    background-color: $green;
    color: white;
  }

  .negative {
    background-color: $red;
  }

  .title {
    font-size: 3em;
  }

  .subtitle {
    font-size: 1.5em;
  }
</style>
