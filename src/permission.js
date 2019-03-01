import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/components/pages/layout/Layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import {
  getAsysRouter
} from '@/api/event.js'
import {
  getToken,
  setToken,
  getPermissionList,
  setPermissionList
} from '@/utils/auth'

const routers = [{
  path: '/custom',
  component: 'Layout',
  redirect: 'list',
  name: 'Custom',
  meta: {
    title: '客户管理',
    icon: 'example'
  },
  children: [{
    path: 'list',
    name: 'List',
    component: 'list',
    meta: {
      title: '案件列表',
      icon: 'table',
      keepAlive: true
    }
  }, {
    path: 'findCase',
    name: 'FindCase',
    component: 'findCase',
    meta: {
      title: '案件查询',
      icon: 'tree',
      keepAlive: true
    }
  }, {
    path: 'basic',
    name: 'Basic',
    component: 'basic',
    hidden: true,
    meta: {
      title: '案件录入',
      icon: 'link',
    }
  }, {
    path: 'date',
    name: 'Date',
    component: 'date',
    meta: {
      title: '日历',
      icon: 'nested',
      keepAlive: false
    }
  }]
}, {
  path: '/myTask',
  component: 'Layout',
  children: [{
    path: 'myTask',
    name: 'Mytask',
    component: 'myTask',
    meta: {
      title: '我的任务',
      icon: 'form',
      keepAlive: true
    }
  }]
},{
	path: '/card',
	component: 'Layout',
	children: [{
		path: 'card',
		name: 'card',
		component: 'card',
		meta: {
			title: '会员卡审核',
			icon: 'user',
			keepAlive: true
		}
	}]
}, {
  path: '/system',
  component: 'systemButton',
  hidden: true,
}, {
  path: '/oa',
  name: 'OA系统',
  hidden: true,
  component: 'OASystem'
}, {
  path: '/law',
  name: '律所系统',
  hidden: true,
  component: 'lawFirmSystem'
}]

var getRouter //用来获取后台拿到的路由
const whiteList = ['/login','/system']
router.beforeEach((to, from, next) => {
  console.log(0)
  console.log(getRouter)
  if (to.path === '/login') {
    next()
  } else {
    if (getToken()) {
      console.log(1)
      if (!getRouter) { //如果getRouter为空
        console.log(2)
        if (!getObjArr('router')) {
          getAsysRouter(store.getters.roles.userIndex).then(res => {
            console.log(res.data)
            saveObjArr('router', res.data.menuList)
            getRouter = res.data.menuList
            routerGo(to, next) //执行路由跳转方法
          }).catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({
                path: '/'
              })
            })
          })
        } else { //从localStorage拿到了路由
          getRouter = getObjArr('router') //拿到路由
          routerGo(to, next)
        }

      } else {
        console.log(3)
        next()
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next('/login') // 否则全部重定向到登录页
      }
    }
  }
})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  store.commit('SET_ROUTERS', getRouter)
  next({ ...to,
    replace: true
  })
}
function changeArr(info){
  let resp =info
  let firstCode = resp.charCodeAt(0)
  if (firstCode < 0x20 || firstCode > 0x7f) {
    resp = resp.substrign(1);
  }
  return resp
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  sessionStorage.setItem(name, changeArr(JSON.stringify(data)))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.sessionStorage.getItem(name));
}

function removeObjArr(name) {
  return window.sessionStorage.removeItem(name);
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}