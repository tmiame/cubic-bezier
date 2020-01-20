import { URL_PARAM_SEPARATED } from '@/constants'
import { TCubic } from '@/types'

export default function useSnackbar () {
  const onReplaceState = (cubicBezier:TCubic, compareCubicBezier:TCubic) => {
    const url = new URL(window.location.href)

    url.searchParams.set('c', cubicBezier.join(URL_PARAM_SEPARATED))
    url.searchParams.set('c2', compareCubicBezier.join(URL_PARAM_SEPARATED))

    window.history.replaceState('', '', `?${url.searchParams.toString()}`)
  }

  const getURLHash = () => {
    const url = new URL(window.location.href)

    const currentParam = url.searchParams.get('c') || ''
    const compareParam = url.searchParams.get('c2') || ''

    const currentMatch:string[]|null = currentParam.match(/^([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)$/g)
    const compareMatch:string[]|null = compareParam.match(/^([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)_([+-]?[0-9](\.[0-9]{0,3})?)$/g)

    return {
      currentMatch,
      compareMatch
    }
  }

  return {
    getURLHash,
    onReplaceState
  }
}
