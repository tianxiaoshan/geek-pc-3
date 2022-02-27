import request from '../../utils/request'

// 保存用户个人信息发哦redux
export const saveProfile = (payload) => {
  return {
    type: 'save/profile',
    payload,
  }
}

// 用户个人信息
export const profile = () => {
  return async (dispatch) => {
    const res = await request('user/profile')

    dispatch(saveProfile(res.data))
  }
}

// 上传头像
export const upload = (data) => {
  return async (dispatch) => {
    await request.patch('user/photo', data)
    dispatch(saveProfile(data))
  }
}
