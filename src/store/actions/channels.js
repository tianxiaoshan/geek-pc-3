import request from '../../utils/request'

// 保存到redux里
export const saveChannel = (payload) => {
  return {
    type: 'save/channel',
    payload,
  }
}
export const getChannel = () => {
  return async (dispatch) => {
    const res = await request.get('channels')

    dispatch(saveChannel(res.data.channels))
  }
}
