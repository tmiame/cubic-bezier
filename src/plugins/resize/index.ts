import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export default function useResize () {
  let debounce:any = null

  const delay = 250
  const resizeCallback:Ref<() => void> = ref(() => {})

  const debounceResize = () => {
    if (debounce) {
      clearTimeout(debounce)
      debounce = null
    }

    debounce = setTimeout(resizeCallback.value, delay)
  }

  onMounted(() => {
    window.addEventListener('resize', debounceResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debounceResize)
  })

  return {
    resizeCallback
  }
}
