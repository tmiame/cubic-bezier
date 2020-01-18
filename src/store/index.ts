import generator from './generator'
import snackbar from './snackbar'

export const store = () => {
  return {
    generatorStore: generator(),
    snackbar: snackbar()
  }
}

export default store
