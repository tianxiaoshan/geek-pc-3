import request from '../../utils/request'

// 保存编辑的文章
export const saveEditArticle = (payload) => {
  return {
    type: 'save/edit',
    payload,
  }
}

// 编辑文章
export const editArticle = (id) => {
  return async (dispatch) => {
    const res = await request({
      url: `mp/articles/${id}`,
      method: 'get',
    })
    dispatch(saveEditArticle(res.data))
  }
}
