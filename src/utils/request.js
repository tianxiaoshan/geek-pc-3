import axios from 'axios'
import { getTokenInfo } from './storage'

// 创建instance实例
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0/',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // ;<Spin />
    // 在发送请求之前做些什么

    // const token = getTokenInfo().token
    // if (token) {
    //   config.headers.Authorization = 'Bearer ' + token
    // // }
    // console.log(getTokenInfo().token, 'getTokenInfo')
    // console.log(getTokenInfo(), 'getTokenInfo')
    // // const e = getTokenInfo()
    // console.log('e', e)
    // const { token } = e
    // console.log(token, 'token')
    if (config.url !== 'authorizations') {
      config.headers.Authorization = `Bearer ${getTokenInfo().token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // ;<Spin spinning={false} />
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
