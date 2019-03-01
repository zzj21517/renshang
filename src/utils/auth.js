import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PermissionListKey='permission-list'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPermissionList() {
  return JSON.parse(localStorage.getItem(PermissionListKey))
}

export function setPermissionList(permissionList) {
  return localStorage.setItem(PermissionListKey, JSON.stringify(permissionList))
}

export function removePermissionList() {
  return localStorage.removeItem(PermissionListKey)
}