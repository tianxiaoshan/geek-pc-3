const article = {}

export default function reducer(state = article, aciton) {
  const { type, payload } = aciton
  if (type === 'save/article') {
    return payload
  }
  return state
}
