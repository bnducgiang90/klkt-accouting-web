import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const accessTokenKey = 'Access-Token'
const refreshTokenKey = 'Refresh-Token'
const userInfoKey = 'User-Info'

export function getToken() {
  // return Cookies.get(TokenKey)
  const token = localStorage.getItem(accessTokenKey)
  return token
}

export function setToken(accessToken) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(accessTokenKey, accessToken)
}

export function getRefreshToken() {
  const token = localStorage.getItem(refreshTokenKey)
  return token
}

export function setRefreshToken(refreshToken) {
  return localStorage.setItem(refreshTokenKey, refreshToken)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  // return localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey) // nếu có
  localStorage.removeItem(userInfoKey)
}

// User trong localStorage
export function setUser(user) {
  return localStorage.setItem(userInfoKey, JSON.stringify(user))
}

export function getUser() {
  const user = localStorage.getItem(userInfoKey)
  return user ? JSON.parse(user) : null
}
