import request from '../../utils/request'
import { setTokenInfo } from '../../utils/storage'

// 把token存在redux中
export const saveToken = (payload) => {
  return {
    type: 'save/token',
    payload,
  }
}

export const loginToken = (mobile, code) => {
  return async (dispatch) => {
    const res = await request({
      url: 'authorizations',
      method: 'post',
      data: {
        mobile,
        code,
      },
    })
    dispatch(saveToken(res.data))
    setTokenInfo(res.data)
  }
}
