import * as types from '../mutation-types'
// initial state
const state = {
  layout: '固定布局',
  isCollapse: false, // 菜单状态是否收起
  menu: null, // 菜单
  role: null, // 角色权限
  lang: 'zh', // 语言
  token: null,
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.indexOf(role) !== -1
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
function filterAsyncRouter(asyncRouterMap, role) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// getters
const getters = {}

// mutations
const mutations = {
  /*
  当前菜单收展状态
  */
  [types.IS_COLLAPSE](state, payload) {
    state.isCollapse = !state.isCollapse
  },
  /*
  当前菜单(主要是注销时清空)
  */
  [types.SET_MENU](state, payload) {
    state.menu = payload
  },
  // 设置语言
  [types.SET_LANG](state, payload) {
    state.lang = payload
    window.localStorage.setItem('lang', payload)
  },
  [types.LOGIN](state, data){
  	state.token = data;
  	window.localStorage.setItem('token', data);
  },
  [types.LOGOUT](state, data){
  	window.localStorage.removeItem('token');
    state.token = null
  }
}

// actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}