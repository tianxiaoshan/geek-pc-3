const edit = {
  cover: {
    type: 1,
    images: [],
  },
}
export default function reducer(state = edit, action) {
  const { type, payload } = action
  if (type === 'save/edit') {
    return payload
  }
  return state
}
