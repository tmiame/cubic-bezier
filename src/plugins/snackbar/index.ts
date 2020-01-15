import { ref } from '@vue/composition-api'
import { sleep } from '@/utils'

export default function useSnackbar () {
  const snackbar = ref(false)

  const showSnackbar = () => {
    snackbar.value = true
  }

  const hideSnackbar = () => {
    snackbar.value = false
  }

  const hideTimerSnackbar = async (delay = 2000) => {
    await sleep(delay)

    snackbar.value = false
  }

  const autoHideSnackbar = async (delay = 2000) => {
    snackbar.value = true
    await sleep(delay)
    snackbar.value = false
  }

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    hideTimerSnackbar,
    autoHideSnackbar
  }
}
