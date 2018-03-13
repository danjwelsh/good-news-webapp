<template lang="html">
  <div id="navbar">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://gdnws.co.uk">
          🗞 GN
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">

        <div class="navbar-end">
          <router-link class="link-item" to="/cookie-policy">{{content.nav.cookies}}</router-link>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
    }
  },
  computed: {
    content () {
      return this.$store.getters.getContent
    }
  }
}
</script>

<style lang="scss" scoped>
  #navbar {
    .link-item {
      margin-top: 20%;
      margin-right: 20%;
    }
  }
</style>
