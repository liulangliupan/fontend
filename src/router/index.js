import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

//路由懒加载
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
