<template>
  <div class="s-dots">
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  computed,
  reactive,
  onMounted,
  watch,
  inject,
  Ref as RefType,
  onUnmounted
} from '@vue/composition-api'

import bezier from 'bezier-easing'
import useResize from '@/plugins/resize'
import useDebounce from '@/plugins/debounce'
import { nextTick } from '@/utils'
import { DEFAULT_CUBIC, THEME_SYMBOL, THEME_DEFAULT, THEMES } from '@/constants'
import { TCubic } from '@/types'

type TProps = {
  value: TCubic
  repeat: boolean
  duration: number
}

type StateType = {
  raf: boolean
  rafId: any
  ctx: CanvasRenderingContext2D|null
  ctxWidth: number
  ctxHeight: number
  snapshotSize: number
  snapshotOffsetX: number
  snapshotOffsetY: number
}

export default createComponent<TProps>({
  props: {
    value: {
      type: Array,
      default () {
        return DEFAULT_CUBIC
      }
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

  setup (props) {
    const state:StateType = reactive({
      ctx: null,
      ctxWidth: 0,
      ctxHeight: 0,
      raf: true,
      rafId: '',
      snapshotOffsetX: 100,
      snapshotOffsetY: 100,
      snapshotSize: 0
    })

    const theme:any = inject(THEME_SYMBOL, THEME_DEFAULT)
    const rgb = computed(() => (theme.value === THEMES.dark) ? '255,255,255' : '0,0,0')

    let nowTime = performance.now()

    const canvas:RefType<HTMLCanvasElement|null> = ref(null)
    const easing = ref(bezier(...props.value))
    const endTime = ref(0)
    const lastDrawPosition = ref(0)
    const startDelay = 500
    const endDelay = 2000

    const animeParams = computed(() => [
      state.snapshotSize + state.snapshotOffsetX,
      state.ctxWidth - state.snapshotSize - state.snapshotOffsetX,
      state.snapshotSize + state.snapshotOffsetY,
      state.ctxHeight - state.snapshotSize - state.snapshotOffsetY
    ])

    const snapshots = computed(() => {
      return [...Array(12).keys()].map(index => easing.value(index / 12))
    })

    const setSize = () => {
      const el = canvas.value
      if (!el) {
        return
      }
      state.ctx = el.getContext('2d')
      state.ctxWidth = el.width = el.clientWidth * 2
      state.ctxHeight = el.height = el.clientHeight * 2
      state.snapshotSize = Math.round(Math.min(state.ctxWidth, state.ctxHeight) / 2 - 1)
      state.snapshotOffsetX = state.ctxWidth * 0.1
      state.snapshotOffsetY = state.ctxHeight * 0.1
    }

    const init = () => {
      setSize()
      state.rafId = window.requestAnimationFrame(render)
    }

    const destroy = () => {
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId)
        state.rafId = null
      }
    }

    const render = (time:number) => {
      if (!state.raf) {
        window.cancelAnimationFrame(state.rafId)
        state.rafId = null
        return
      }

      if (endTime.value > 0) {
        const isComplete = (time - endTime.value) / endDelay
        if (isComplete > 1) {
          endTime.value = 0
          lastDrawPosition.value = 0
          nowTime = performance.now()
        }

        state.rafId = window.requestAnimationFrame(render)
        return
      }

      let t = (time - nowTime) / props.duration
      if (t > 1) {
        t = 1
        endTime.value = performance.now()

        if (!props.repeat) {
          destroy()
          return
        }
      }

      draw(t)

      state.rafId = window.requestAnimationFrame(render)
    }

    const draw = (t:number) => {
      const {
        ctx,
        ctxWidth,
        ctxHeight,
        snapshotSize: size,
        snapshotOffsetX: offsetX
      } = state

      if (!ctx) {
        return
      }

      ctx.clearRect(0, 0, ctxWidth, ctxHeight)

      const x = (animeParams.value[1] - animeParams.value[0]) * easing.value(t) + animeParams.value[0]
      lastDrawPosition.value = Math.max(lastDrawPosition.value, x)

      const startSnapAlpha = 0.1
      ctx.beginPath()
      ctx.arc(size + offsetX, size, size, 0, 2 * Math.PI)
      ctx.fillStyle = `rgba(${rgb.value}, ${startSnapAlpha})`
      ctx.fill()

      snapshots.value.forEach(snap => {
        const range = (animeParams.value[1] - animeParams.value[0])
        const sx = (range * snap) + animeParams.value[0]
        const passed = lastDrawPosition.value >= sx
        const alpha = snap * 0.25

        if (passed) {
          ctx.beginPath()
          ctx.arc(sx, size, size, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(${rgb.value}, ${Math.max(0.05, alpha)})`
          ctx.fill()
        }
      })

      ctx.beginPath()
      ctx.arc(x, size, size, 0, 2 * Math.PI)
      ctx.fillStyle = `rgba(${rgb.value}, 1)`
      ctx.fill()
    }

    const { resizeCallback } = useResize()
    const { debounce } = useDebounce()
    resizeCallback.value = () => {
      setSize()
    }

    watch(() => props.value, () => {
      debounce(() => {
        easing.value = bezier(...props.value)
      })
    })

    watch(() => props.repeat, (newVal) => {
      if (newVal && !state.rafId) {
        init()
      }
    })

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      state.raf = false
      destroy()
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
}
</style>
