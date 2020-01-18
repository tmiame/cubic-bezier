import Vue from 'vue'
import { ESnackbarType } from '@/types'

type TSnackbarItem = {
  text: string,
  type: ESnackbarType,
  timeout?: number,
  cb?: () => void,
}

export default function useSnackbar () {
  const store = Vue.prototype.$store.snackbar

  const addSnackbar = (value:TSnackbarItem) => {
    store.actions.addSnackbar(value)
  }

  return {
    addSnackbar
  }
}
