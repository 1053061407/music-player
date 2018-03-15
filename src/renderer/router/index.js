import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [{path:'', component: require('@/components/musicList/musicList').default},
        {path:'mySongList', component: require('@/components/musicList/mySongList').default},
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
