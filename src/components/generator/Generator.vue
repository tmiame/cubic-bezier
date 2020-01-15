<template>
  <div
    class="preview"
    ref="preview"
    :class="{ '--grabbing': grabbing }"
    @touchmove.prevent
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 500 500"
    >
      <rect x="100" y="100" width="300" height="300" class="s-svg_bg" />

      <!-- yokonorainn -->
      <line
        class="s-svg_line-1"
        x1="100"
        x2="400"
        y1="100"
        y2="100"
      />
      <line
        class="s-svg_line-1"
        x1="100"
        x2="400"
        v-for="i in 10"
        :key="`keyX${i}`"
        :y1="100 + (300 / 10 * i)"
        :y2="100 + (300 / 10 * i)"
      />
      <!-- <line
        class="s-svg_line-2 svg_progressbar_horizontal"
        x1="100"
        x2="400"
        y1="400"
        y2="400"
        :style="{ animationTimingFunction: `cubic-bezier(${cubicBezier})` }"
      /> -->

      <!-- tatenorainn -->
      <line
        class="s-svg_line-1"
        y1="100"
        y2="400"
        x1="100"
        x2="100"
      />
      <line
        class="s-svg_line-1"
        y1="100"
        y2="400"
        v-for="i in 10"
        :key="`keyY${i}`"
        :x1="100 + (300 / 10 * i)"
        :x2="100 + (300 / 10 * i)"
      />
      <!-- <line
        class="s-svg_line-2 svg_progressbar_vertical"
        y1="100"
        y2="400"
        x1="100"
        x2="100"
        :style="{ animationTimingFunction: `cubic-bezier(${cubicBezier})` }"
      /> -->

      <line
        class="s-svg_baseLine"
        x1="100"
        x2="400"
        y1="400"
        y2="100"
      />

      <!-- line -->
      <line
        class="s-svg_line-3"
        :x1="path[0].x"
        :y1="path[0].y"
        :x2="path[1].x"
        :y2="Math.max(size * 0.1, Math.min(path[1].y, size * 0.9))"
      />
      <line
        class="s-svg_line-3"
        :x1="path[2].x"
        :y1="Math.max(size * 0.1, Math.min(path[2].y, size * 0.9))"
        :x2="path[3].x"
        :y2="path[3].y"
      />

      <!-- bezier -->
      <path
        class="s-svg_bezierLine -compare"
        :d="`M${compareCubicToPath[0].x} ${compareCubicToPath[0].y} C ${compareCubicToPath[1].x} ${compareCubicToPath[1].y}, ${compareCubicToPath[2].x} ${compareCubicToPath[2].y}, ${compareCubicToPath[3].x} ${compareCubicToPath[3].y}`"
      />
      <path
        class="s-svg_bezierLine"
        :d="`M${path[0].x} ${path[0].y} C ${path[1].x} ${path[1].y}, ${path[2].x} ${path[2].y}, ${path[3].x} ${path[3].y}`"
      />

      <!-- s-svg_grabDot -->
      <circle
        ref="grab"
        :class="{ '--active': grabbingIndex === 1 }"
        :cx="path[1].x"
        :cy="Math.max(size * 0.1, Math.min(path[1].y, (size * 0.9)))"
        r="10"
        class="s-svg_grabDot -top"
        @pointerdown="onPointerDown(1)"
      />
      <circle
        :class="{ '--active': grabbingIndex === 2 }"
        :cx="path[2].x"
        :cy="Math.max(size * 0.1, Math.min(path[2].y, (size * 0.9)))"
        r="10"
        class="s-svg_grabDot -bottom"
        @pointerdown="onPointerDown(2)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  computed,
  reactive,
  onMounted,
  onUnmounted,
  Ref as RefType,
  SetupContext
} from '@vue/composition-api'

import { TCubic, TPoint2D } from './types'

type PropType = {
  size: number,
  cubicBezierX: TCubic,
  compareCubicBezier: TCubic
}

export default createComponent({
  name: 'Generator',
  props: {
    size: {
      type: Number,
      default: 500
    },
    cubicBezierX: {
      type: Array,
      default () {
        return [1, 0, 0, 1]
      }
    },
    compareCubicBezier: {
      type: Array,
      default () {
        return [1, 0, 0, 1]
      }
    }
  },
  setup (props:PropType, { root: { $store } }:SetupContext) {
    const store = $store.generatorStore
    const grabbing:RefType<boolean> = ref(false)
    const grabbingIndex:RefType<number> = ref(0)
    const preview:RefType<HTMLElement|null> = ref(null)
    const grab:RefType<HTMLElement|null> = ref(null)

    const size = props.size * 0.6
    const min = props.size * 0.2
    const max = props.size * 0.8
    const path = computed(() :TPoint2D[] => [
      { x: min, y: max },
      { x: min + (size * props.cubicBezierX[0]), y: max - (size * props.cubicBezierX[1]) },
      { x: min + (size * props.cubicBezierX[2]), y: max - (size * props.cubicBezierX[3]) },
      { x: max, y: min }
    ])
    const compareCubicToPath = computed(():TPoint2D[] => [
      { x: min, y: max },
      { x: min + (size * props.compareCubicBezier[0]), y: max - (size * props.compareCubicBezier[1]) },
      { x: min + (size * props.compareCubicBezier[2]), y: max - (size * props.compareCubicBezier[3]) },
      { x: max, y: min }
    ])

    const cubicBezier = computed(() :TCubic => [
      normalize(path.value[1].x),
      normalize(props.size - path.value[1].y),
      normalize(path.value[2].x),
      normalize(props.size - path.value[2].y)
    ])

    const normalize = (num:number) :number => {
      return Math.floor(100 * (num - min) / size) / 100
    }

    const adjust = (num:number, type:string = 'x') :number => {
      const previewElement:HTMLElement = preview.value!
      const { width }:ClientRect = previewElement.getBoundingClientRect()
      const scale = props.size / width
      const center = width * 0.5 * scale

      if (type === 'x') {
        return Math.min(Math.max(min, Math.round(num + center)), max)
      } else {
        return Math.min(Math.max(-(props.size / 4), Math.round(num + center)), props.size + (props.size / 4))
      }
    }

    const onPointerMove = (e:PointerEvent) :void => {
      if (grabbingIndex.value !== 0) {
        const previewElement:HTMLElement = preview.value!
        const { left, top, width, height }:ClientRect = previewElement.getBoundingClientRect()
        const scale = props.size / width
        const x = (e.pageX - window.pageXOffset - left) - width / 2
        const y = (e.pageY - window.pageYOffset - top) - height / 2
        setPosition(grabbingIndex.value, x * scale, y * scale)
      }
    }

    const onPointerUp = (e:PointerEvent) :void => {
      grabbing.value = false
      grabbingIndex.value = 0
    }

    const onPointerDown = (index:number) :void => {
      grabbing.value = true
      grabbingIndex.value = index
    }

    const setPosition = (index:number, x:number, y:number) :void => {
      const newPath = [...path.value]
      newPath[index] = {
        x: adjust(x, 'x'),
        y: adjust(y, 'y')
      }

      const newCubicBezier = [
        normalize(newPath[1].x),
        normalize(props.size - newPath[1].y),
        normalize(newPath[2].x),
        normalize(props.size - newPath[2].y)
      ]

      store.actions.updateCubicBezier(newCubicBezier)
    }

    onMounted(() => {
      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    })

    onUnmounted(() => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    })

    return {
      path,
      compareCubicToPath,
      grab,
      grabbing,
      grabbingIndex,
      preview,
      onPointerDown,
      cubicBezier
    }
  }
})
</script>

<style lang="scss" scoped>
.preview {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  &.--grabbing { cursor: grab; }
  &.--grabbing:active { cursor: grabbing; }
}

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  vertical-align: bottom;
}

.s-svg_bg {
  fill: rgba(0,0,0,0.025);

  html[dark] & { fill: rgba(255,255,255,0.025); }
}

.s-svg_line-1 {
  fill: rgba(0,0,0,0.05);
  stroke: rgba(0,0,0,0.05);
  stroke-width: 1;

  html[dark] & {
    fill: rgba(255,255,255,0.05);
    stroke: rgba(255,255,255,0.05);
  }
}

.s-svg_line-2 {
  fill: rgba(0,0,0,0.05);
  stroke: rgba(0,0,0,0.05);
  stroke-width: 2;
  stroke-linecap: round;

  html[dark] & {
    fill: rgba(255,255,255,0.05);
    stroke: rgba(255,255,255,0.05);
  }
}

.s-svg_line-3 {
  fill: rgba(0,0,0,0.25);
  stroke: rgba(0,0,0,0.25);
  stroke-width: 2;
  stroke-linecap: round;

  html[dark] & {
    fill: rgba(255,255,255,0.25);
    stroke: rgba(255,255,255,0.25);
  }
}

.s-svg_baseLine {
  fill: rgba(0,0,0,0.05);
  stroke: rgba(0,0,0,0.05);
  stroke-width: 1;
  stroke-linecap: round;

  html[dark] & {
    fill: rgba(255,255,255,0.05);
    stroke: rgba(255,255,255,0.05);
  }
}

.s-svg_bezierLine {
  fill: none;
  stroke: rgba(0,0,0,0.8);
  stroke-width: 4;
  stroke-linecap: round;

  html[dark] & {
    stroke: rgba(255,255,255,0.8);
  }

  &.-compare {
    stroke: rgba(0,0,0,0.3);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 10px;

    html[dark] & {
      stroke: rgba(255,255,255,0.3);
    }
  }
}

.s-svg_grabDot {
  fill: var(--text-primary);
  cursor: pointer;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &.--active {
    stroke: var(--text-primary-inverse);
    stroke-width: 2;
  }
}

.svg_progressbar_horizontal {
  animation: 1.5s svg_progressbar_horizontal infinite 0.25s;
  will-change: transform, opacity;

  @keyframes svg_progressbar_horizontal {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY((-100% * 0.6));
    }
  }
}

.svg_progressbar_vertical {
  animation: 1.5s svg_progressbar_vertical infinite 0.25s;
  will-change: transform, opacity;

  @keyframes svg_progressbar_vertical {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX((100% * 0.6));
    }
  }
}
</style>
