import generator from '@/store/generator'
import snackbar from '@/store/snackbar'
import { IStore } from '@/types'

export const store = () :IStore => {
  return {
    generatorStore: generator(),
    snackbar: snackbar()
  }
}

export default store
