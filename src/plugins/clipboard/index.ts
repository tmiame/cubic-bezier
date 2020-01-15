import {
  ref,
  Ref as RefType,
  onMounted,
  onUnmounted
} from '@vue/composition-api'

export default function useClipboard () {
  const copyText:RefType<string> = ref('')

  onMounted(() => {
    document.addEventListener('copy', onCopyHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('copy', onCopyHandler)
  })

  const onCopy = () :void => {
    document.execCommand('copy')
  }

  const onCopyHandler = (e:ClipboardEvent) :void => {
    e.clipboardData!.setData('text/plain', copyText.value)
    e.preventDefault()
  }

  return {
    copyText,
    onCopy,
    onCopyHandler
  }
}
