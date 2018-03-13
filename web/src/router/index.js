import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Headlines from '@/components/pages/Headlines'
import CookiePolicy from '@/components/pages/CookiePolicy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Headlines',
      component: Headlines
    },
    {
      path: '/cookie-policy',
      name: 'CookiePolicy',
      component: CookiePolicy
    }
  ]
})
