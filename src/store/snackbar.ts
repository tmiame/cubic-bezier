import {
  toRefs,
  computed,
  reactive
} from '@vue/composition-api'
import { ESnackbarType } from '@/types'

type TSnackbarItem = {
  id: number,
  text: string,
  type: ESnackbarType,
  timeout?: number,
  cb?: () => void,
  close: () => void
}

type TState = {
  items: TSnackbarItem[],
}

const store = () => {
  const state:TState = reactive({
    items: []
  })

  const stateAsRefs = toRefs(state)

  const getters = {
    items: computed(() => stateAsRefs.items.value)
  }

  const mutations = {
    SET_CUBIC_BEZIER (value: TSnackbarItem): void {
      const id = Date.now() + Math.random()

      stateAsRefs.items.value.push({
        ...value,
        id,
        close () {
          if (value.cb) {
            value.cb()
          }
          stateAsRefs.items.value = stateAsRefs.items.value.filter(item => item.id !== id)
        }
      })

      if (value.timeout) {
        setTimeout(() => {
          stateAsRefs.items.value = stateAsRefs.items.value.filter(item => item.id !== id)
          console.log('auto close')
        }, value.timeout)
      }
    }
  }

  const actions = {
    addSnackbar (value: TSnackbarItem): void {
      console.log('addSnackbar', value)
      mutations.SET_CUBIC_BEZIER(value)
    }
  }

  return {
    ...stateAsRefs,
    getters,
    actions
  }
}

export default store
