import generator from './generator'

export const store = () => {
  return {
    generatorStore: generator()
  }
}

export default store
