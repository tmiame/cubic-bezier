import {
  ref,
  Ref as RefType,
  watch,
  reactive,
  onMounted,
  onUnmounted
} from '@vue/composition-api'

import anime from 'animejs'
import eventemitter from '@/plugins/eventemitter'
import { nextTick } from '@/utils'

type StateType = {
  animeInstance: anime.AnimeInstance|null
}

export default function useClipboard () {
  const animeRepeat = ref(true)
  const animeCubicBezier:RefType<number[]> = ref([0, 0, 0, 0])
  const animeTarget:RefType<HTMLCanvasElement|null> = ref(null)
  const animeValues:RefType<anime.AnimeParams> = ref({
    duration: 1000
  })

  const state:StateType = reactive({
    animeInstance: null
  })

  const initAnime = () => {
    destroyAnime()
    nextTick(createAnime)
  }

  const createAnime = () => {
    const baseParams:anime.AnimeParams = {
      targets: animeTarget.value,
      delay: 250,
      endDelay: 1500,
      easing: `cubicBezier(${animeCubicBezier.value})`,
      begin: onAnimeBegin,
      complete: onAnimeComplete
    }
    state.animeInstance = anime({
      ...baseParams,
      ...animeValues.value
    })
  }

  const destroyAnime = () => {
    if (state.animeInstance) {
      anime.remove(animeTarget.value)
      state.animeInstance = null
    }
  }

  const onAnimeBegin = () => {
    eventemitter.emit('demo-begin')
  }

  const onAnimeComplete = () => {
    eventemitter.emit('demo-complete')
    checkRepeat()
  }

  const focusRun = () => {
    initAnime()
  }

  const checkRepeat = () => {
    if (!animeRepeat.value) {
      destroyAnime()
    } else {
      initAnime()
    }
  }

  watch(() => animeRepeat.value, (newVal) => {
    if (newVal && !state.animeInstance) {
      initAnime()
    }
  })

  watch(() => animeCubicBezier.value, () => {
    if (!animeRepeat.value) {
      initAnime()
    }
  })

  onMounted(() => {
    initAnime()
    eventemitter.on('demo-focus-run', focusRun)
  })

  onUnmounted(() => {
    destroyAnime()
    eventemitter.removeListener('demo-focus-run', focusRun)
  })

  return {
    animeTarget,
    animeRepeat,
    animeCubicBezier,
    animeValues
  }
}
