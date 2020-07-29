import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Foo from '@/components/Foo.vue'
import Bar from '@/components/Bar.vue'

// store
import store from '@/store'

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
          {
            name: 'Foo',
            path: 'foo',
            component: Foo
          },
          {
            path: 'bar',
            component: Bar
          }
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          noNeedLogin: true
        },
      },
    ],
  })
  
  
// navigation guard
router.beforeEach((to, from, next) => {
  if (!to.meta.noNeedLogin && !store.state.isLoggedIn) next({ path: '/login' })
  else next();
});

export default router;