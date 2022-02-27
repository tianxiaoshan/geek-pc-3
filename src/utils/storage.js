// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-pc-1'
// 将 Token 信息存入缓存中
// @param{Object}getTokenInfo 从后端获取到的 Token 信息存入缓存中
export const setTokenInfo = (tokenInfo) => {
  return localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo)) // 单词写错 写错
}

// 从本地缓存中获取Token信息
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

// 删除本地缓存中的 Token 信息
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

// 判断本地缓存中是否存在 Token 信息

export const hasToken = () => {
  return !!getTokenInfo().token
}
