import { URL_PARAM_SEPARATED } from '@/constants'
import { TCubic } from '@/types'

export default function useSnackbar () {
  const getSearchParamsToString = (params:{ cubicBezier?:TCubic, compareCubicBezier?:TCubic }) => {
    const searchParams = new URLSearchParams('')

    if (params.cubicBezier) {
      searchParams.set('c', params.cubicBezier.join(URL_PARAM_SEPARATED))
    }

    if (params.compareCubicBezier) {
      searchParams.set('c2', params.compareCubicBezier.join(URL_PARAM_SEPARATED))
    }

    return `?${searchParams.toString()}`
  }

  const getURLQueryToString = (params:{ cubicBezier?:TCubic, compareCubicBezier?:TCubic }) => {
    const url = new URL(window.location.href)

    if (params.cubicBezier) {
      url.searchParams.set('c', params.cubicBezier.join(URL_PARAM_SEPARATED))
    }

    if (params.compareCubicBezier) {
      url.searchParams.set('c2', params.compareCubicBezier.join(URL_PARAM_SEPARATED))
    }

    return `?${url.searchParams.toString()}`
  }

  const onReplaceState = (cubicBezier:TCubic, compareCubicBezier:TCubic) => {
    const query = getURLQueryToString({ cubicBezier, compareCubicBezier })

    window.history.replaceState('', '', query)
  }

  const getURLParams = () => {
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
    getURLParams,
    getURLQueryToString,
    getSearchParamsToString,
    onReplaceState
  }
}
