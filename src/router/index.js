import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/pages/layout/Layout'
//在开发环境下不要懒加载，在生产环境下再进行懒加载
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component:_import('login'),
    hidden:true
  },
  {
    path:'/custom',
    component:Layout,
    hidden:true,
    redirect: '/custom/list',
  },
  {
    path:'/system',
    component:_import('systemButton'),
    hidden:true
  },
  {
    path:'/backstageInfo',
    component:_import('backstageInfo'),
    hidden:true
  },
  // {
  //   path:'/addCheckCard',
  //   component:_import('addCheckCard'),
  //   hidden:true
  // },
  // {
  //   path:'/addActivateCard',
  //   component:_import('addActivateCard'),
  //   hidden:true
  // },
  // {
  //   path:'/card',
  //   component:_import('card'),
  //   hidden:true
  // }
]
export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [

]