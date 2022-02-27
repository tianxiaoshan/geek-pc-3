const initValues = {
  token: '',
  refresh_token: '',
}
export default function reducer(state = initValues, action) {
  const { type, payload } = action
  if (type === 'save/token') {
    return payload
  }
  return state
}
