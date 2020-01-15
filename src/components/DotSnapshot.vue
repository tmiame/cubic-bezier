<template>
  <div class="s-dots">
    <canvas ref="canvas" :class="`--${direction}`" />
  </div>
</template>

<script lang="ts">
import anime from 'animejs'
import bezier from 'bezier-easing'
import {
  createComponent,
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeMount,
  watch,
  inject,
  Ref as RefType
} from '@vue/composition-api'
import { THEME_SYMBOL, THEME_DEFAULT, THEMES } from '@/constants'
import useResize from '@/plugins/resize'
import { TCubic } from './generator/types'

export enum EDirection {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

type PropType = {
  value: TCubic
  direction: EDirection
  repeat: boolean
  duration: number
}

type StateType = {
  rafId: any
  ctx: CanvasRenderingContext2D|null
  ctxWidth: number
  ctxHeight: number
  snapshotSize: number
  snapshotOffsetX: number
  snapshotOffsetY: number
}

export default createComponent({
  props: {
    value: {
      type: Array,
      default () {
        return [0.4, 0, 0.2, 1]
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    duration: {
      type: Number,
      default: 1000
    },
    repeat: {
      type: Boolean,
      default: true
    }
  },

  setup (props:PropType) {
    const state:StateType = reactive({
      ctx: null,
      ctxWidth: 0,
      ctxHeight: 0,
      rafId: '',
      snapshotOffsetX: 100,
      snapshotOffsetY: 100,
      snapshotSize: 0
    })

    const theme:any = inject(THEME_SYMBOL, THEME_DEFAULT)
    const rgb = computed(() => (theme.value === THEMES.dark) ? '255,255,255' : '0,0,0')
    const canvas:RefType<HTMLCanvasElement|null> = ref(null)

    let now = performance.now()
    const easing = ref(bezier(...props.value))
    const endTime = ref(0)
    const lastDrawPosition = ref(0)

    const startDelay = 500
    const endDelay = 2000

    const setSize = () => {
      const el = canvas.value
      if (!el) {
        return
      }
      state.ctx = el.getContext('2d')
      state.ctxWidth = el.width = el.clientWidth * 3
      state.ctxHeight = el.height = el.clientHeight * 3
      state.snapshotSize = Math.round(Math.min(state.ctxWidth, state.ctxHeight) / 2)
      state.snapshotOffsetX = state.ctxWidth * 0.1
      state.snapshotOffsetY = state.ctxHeight * 0.1
    }

    const init = () => {
      setSize()
      state.rafId = window.requestAnimationFrame(render)
    }

    const animeParams = computed(() => [
      state.snapshotSize + state.snapshotOffsetX,
      state.ctxWidth - state.snapshotSize - state.snapshotOffsetX,
      state.snapshotSize + state.snapshotOffsetY,
      state.ctxHeight - state.snapshotSize - state.snapshotOffsetY
    ])

    const snapshots = computed(() => {
      const o = []
      for (let index = 0; index <= 1; index += 0.08) {
        o.push(easing.value(index))
      }
      return o
    })

    const destroyAnime = () => {
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId)
        state.rafId = null
      }
    }

    const render = (time:number) => {
      state.rafId = window.requestAnimationFrame(render)

      if (endTime.value > 0) {
        let tEnd = (time - endTime.value) / endDelay
        if (tEnd > 1) {
          endTime.value = 0
          lastDrawPosition.value = 0
          now = performance.now()
        }
        return
      }

      let t = (time - now) / props.duration
      if (t > 1) {
        t = 1
        endTime.value = performance.now()

        if (!props.repeat) {
          destroyAnime()
        }
      }

      state.ctx!.clearRect(0, 0, state.ctxWidth, state.ctxHeight)

      if (props.direction === EDirection.horizontal) {
        renderX(t)
      } else {
        renderX(t)
      }
    }

    const renderX = (t:number) => {
      const {
        ctx,
        ctxWidth,
        ctxHeight,
        snapshotSize: size,
        snapshotOffsetX: offsetX
      } = state

      const x = (animeParams.value[1] - animeParams.value[0]) * easing.value(t) + animeParams.value[0]
      lastDrawPosition.value = Math.max(lastDrawPosition.value, x)
      const startSnapAlpha = 0.1
      ctx!.beginPath()
      ctx!.arc(size + offsetX, size, size, 0, 2 * Math.PI)
      ctx!.fillStyle = `rgba(${rgb.value}, ${startSnapAlpha})`
      ctx!.fill()

      snapshots.value.forEach(snap => {
        const range = (animeParams.value[1] - animeParams.value[0])
        const sx = (range * snap) + animeParams.value[0]
        const passed = lastDrawPosition.value >= sx
        const alpha = snap * 0.25

        if (passed) {
          ctx!.beginPath()
          ctx!.arc(sx, size, size, 0, 2 * Math.PI)
          ctx!.fillStyle = `rgba(${rgb.value}, ${Math.max(0.05, alpha)})`
          ctx!.fill()
        }
      })

      ctx!.beginPath()
      ctx!.arc(x, size, size, 0, 2 * Math.PI)
      ctx!.fillStyle = `rgba(${rgb.value}, 1)`
      ctx!.fill()
    }

    const { resizeCallback } = useResize()
    resizeCallback.value = () => {
      setSize()
    }

    watch(() => props.value, () => {
      easing.value = bezier(...props.value)
    })

    watch(() => props.repeat, (newVal) => {
      if (newVal && !state.rafId) {
        init()
      }
    })

    onMounted(() => {
      init()
    })

    onBeforeMount(() => {
      destroyAnime()
    })

    return {
      rgb,
      canvas
    }
  }
})
</script>

<style lang="scss" scoped>
.s-dots {
  position: relative;
  overflow: hidden;
}

.s-dots canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  vertical-align: bottom;

  &.--vertical {
    transform: rotate(180deg);
  }
}
</style>
