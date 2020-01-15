<template>
  <div class="bezier">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 300 300"
    >
      <rect
        class="s-svg_bg"
        x="50"
        y="50"
        width="200"
        height="200"
      />
      <line
        class="s-svg_line-1"
        x1="50"
        x2="250"
        v-for="i in 9"
        :key="`keyX${i}`"
        :y1="50 + (200 / 10 * i)"
        :y2="50 + (200 / 10 * i)"
      />
      <line
        class="s-svg_line-1"
        y1="50"
        y2="250"
        v-for="i in 9"
        :key="`keyY${i}`"
        :x1="50 + (200 / 10 * i)"
        :x2="50 + (200 / 10 * i)"
      />

      <!-- line -->
      <line
        class="s-svg_line-2"
        :x1="p[0].x"
        :y1="p[0].y"
        :x2="p[1].x"
        :y2="p[1].y"
      />
      <line
        class="s-svg_line-2"
        :x1="p[2].x"
        :y1="p[2].y"
        :x2="p[3].x"
        :y2="p[3].y"
      />

      <line
        class="s-svg_baseLine"
        x1="50"
        x2="250"
        y1="250"
        y2="50"
      />
      <path
        class="s-svg_bezierLine"
        :d="`M${p[0].x + 1} ${p[0].y - 1} C ${p[1].x} ${p[1].y}, ${p[2].x} ${p[2].y}, ${p[3].x - 1} ${p[3].y + 1}`"
      />

      <circle
        :cx="p[1].x"
        :cy="p[1].y"
        r="5"
        class="s-svg_grabDot -top"
      />
      <circle
        :cx="p[2].x"
        :cy="p[2].y"
        r="5"
        class="s-svg_grabDot -bottom"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  computed,
  reactive,
  onMounted,
  Ref
} from '@vue/composition-api'

type PropType = {
  value: [number, number, number, number],
  size: number
}

type TPoint2D = {
  [key in 'x' | 'y'] : number
}

export default createComponent({
  props: {
    value: {
      type: Array,
      default () {
        return [0.4, 0, 0.2, 0]
      }
    }
  },
  setup (props: PropType, context: any) {
    const state = reactive({
      size: 200,
      offset: 50
    })

    const p: Ref<{ [index:number]:TPoint2D }> = computed(():TPoint2D[] => {
      const [x1, y1, x2, y2] = props.value
      const p1x = x1 * state.size + state.offset
      const p1y = y1 * state.size + state.offset
      const p2x = x2 * state.size + state.offset
      const p2y = y2 * state.size + state.offset

      return [
        {
          x: state.offset,
          y: state.size + state.offset
        },
        {
          x: p1x,
          y: state.size + (state.offset * 2) - p1y
        },
        {
          x: p2x,
          y: state.size + (state.offset * 2) - p2y
        },
        {
          x: state.size + state.offset,
          y: state.offset
        }
      ]
    })

    return {
      p
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.s-svg_bg {
  fill: rgba(0,0,0,0.025);
  stroke: rgba(255,255,255,0.25);
  stroke-width: 1;

  html[dark] & {
    fill: rgba(255,255,255,0.025);
    stroke: rgba(255,255,255,0.25);
  }
}

.s-svg_line-1 {
  fill: rgba(0,0,0,0.1);
  stroke: rgba(0,0,0,0.1);
  stroke-width: 0.5;

  html[dark] & {
    fill: rgba(255,255,255,0.1);
    stroke: rgba(255,255,255,0.1);
  }
}

.s-svg_line-2 {
  fill: rgba(0,0,0,0.1);
  stroke: rgba(0,0,0,0.1);
  stroke-width: 3;

  html[dark] & {
    fill: rgba(255,255,255,0.1);
    stroke: rgba(255,255,255,0.1);
  }
}

.s-svg_baseLine {
  fill: none;
  stroke: rgba(0,0,0,0.1);
  stroke-width: 0.5;
  stroke-linecap: round;

  html[dark] & {
    stroke: rgba(255,255,255,0.1);
  }
}

.s-svg_bezierLine {
  fill: none;
  stroke: rgba(0,0,0,0.4);
  stroke-width: 3;
  stroke-linecap: round;

  html[dark] & {
    stroke: rgba(255,255,255,0.5);
  }
}

.s-svg_grabDot {
  fill: var(--text-primary);
}
</style>
