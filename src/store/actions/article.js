import request from '../../utils/request'

// 保存到redux
export const saveArticle = (payload) => {
  return {
    type: 'save/article',
    payload,
  }
}
export const getArticle = (params) => {
  return async (dispatch) => {
    const res = await request({
      url: 'mp/articles',
      method: 'get',
      params,
    })
    dispatch(saveArticle(res.data))
  }
}
// 发布文章
export const uploadArticle = (data, draft) => {
  return async (dispatch) => {
    await request({
      url: `mp/articles/?draft=${draft}`,
      method: 'post',
      data,
    })
  }
}
