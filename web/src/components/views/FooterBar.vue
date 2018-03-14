<template lang="html">
  <div id="footer-bar">
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Good News!</strong> by <a href="https://dwelsh.uk">Daniel Welsh</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            <br />
            <i class="fa fa-github" aria-hidden="true"></i> Check out the code for the <a href="https://github.com/danjwelsh/good-news">API</a> and the <a href="https://github.com/danjwelsh/good-news-webapp">website</a>!
          </p>
        </div>
      </div>
      <cookie-law theme="blood-orange">
        <div slot="message">
          Good News! uses cookies to give you a better user experience. For more info <router-link to="cookie-policy">Click here</router-link>
        </div>
      </cookie-law>
    </footer>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'footer-bar',
  components: { CookieLaw },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
