export default function useDebounce () {
  let debounceTimer:any = null

  const debounce = (debounceCallback:() => void = () => {}, delay = 250) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }

    debounceTimer = setTimeout(debounceCallback, delay)
  }

  return {
    debounce
  }
}
