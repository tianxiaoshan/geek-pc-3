const channels = []

export default function reducer(state = channels, action) {
  const { type, payload } = action
  if (type === 'save/channel') {
    return payload
  }
  return state
}
