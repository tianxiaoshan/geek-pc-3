const profile = {}
export default function reducer(state = profile, action) {
  const { type, payload } = action
  if (type === 'save/profile') {
    return payload
  }
  return state
}
