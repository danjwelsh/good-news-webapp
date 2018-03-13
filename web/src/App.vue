<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view/>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import TitleBar from './components/views/TitleBar.vue'
import FooterBar from './components/views/FooterBar.vue'
export default {
  name: 'app',
  components: {
    TitleBar,
    FooterBar
  },
  mounted () {
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
