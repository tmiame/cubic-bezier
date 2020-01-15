export default function useSnackbar () {
  const onReplaceState = (cubicBezier:number[]) => {
    window.history.replaceState('', '', `#${cubicBezier.join(',')}`)
  }

  const getURLHash = () => {
    const originalHash = window.location.hash
    const hash:string = originalHash.replace(/#/g, '')
    const pMatch:string[]|null = hash.match(/^([+-]?[0-9](\.[0-9]{0,2})?),([+-]?[0-9](\.[0-9]{0,2})?),([+-]?[0-9](\.[0-9]{0,2})?),([+-]?[0-9](\.[0-9]{0,2})?)$/g)

    return pMatch
  }

  return {
    getURLHash,
    onReplaceState
  }
}
