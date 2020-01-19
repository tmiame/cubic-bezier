<template>
  <header class="s-header">
    <RouterLink to="/" class="s-header_logo">
      <svg
        class="s-hesder-logoPath"
        viewBox="0 0 300 300"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="logoPath"
            :d="`M${p[0].x + 1} ${p[0].y - 1} C ${p[1].x} ${p[1].y}, ${p[2].x} ${p[2].y}, ${p[3].x - 1} ${p[3].y + 1}`"
          />
        </defs>
        <use class="s-hesder-logoPath_line" xlink:href="#logoPath" fill="none" />
        <circle
          :cx="p[0].x"
          :cy="p[0].y"
          r="5"
          fill="currentColor"
          class="s-header_logoDot -top"
        />
        <circle
          :cx="p[3].x"
          :cy="p[3].y"
          r="5"
          fill="currentColor"
          class="s-header_logoDot -bottom"
        />
        <text class="s-hesder-logoPath_text" letter-spacing="2" >
          <textPath
            xlink:href="#logoPath"
            startOffset="50%"
            text-anchor="middle"
            alignment-baseline="middle"
            lengthAdjust="spacingAndGlyphs">CUBIC BEZIER</textPath>
        </text>
      </svg>
    </RouterLink>

    <nav class="s-header_nav">
      <RouterLink to="/" exact>Editor</RouterLink>
      <RouterLink to="/explore">Explore</RouterLink>
    </nav>
    <button class="s-header_mode" @click="onToggleColorscheme">
      <CarbonIcon :name="theme === THEMES.light ? 'darkmode': 'lightmode'" />
    </button>
  </header>
</template>

<script lang="ts">
import { createComponent, SetupContext, inject, computed, Ref, reactive } from '@vue/composition-api'
import { THEME_SYMBOL, THEME_DEFAULT, THEMES } from '@/constants'
import CarbonIcon from '@/components/base/CarbonIcon.vue'

type TPoint2D = {
  [key in 'x' | 'y'] : number
}

export default createComponent({
  name: 'Header',
  components: {
    CarbonIcon
  },
  setup (props, { emit, root: { $store } }:SetupContext) {
    const theme = inject(THEME_SYMBOL, THEME_DEFAULT)
    const store = $store.generatorStore
    const cubicBezier = store.getters.cubicBezier

    const state = reactive({
      size: 200,
      sizeY: 100,
      offset: 50
    })

    const onToggleColorscheme = () => {
      emit('toggle-colorscheme')
    }

    const p: Ref<{ [index:number]:TPoint2D }> = computed(():TPoint2D[] => {
      const [x1, y1, x2, y2] = cubicBezier.value
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
      theme,
      THEMES,
      cubicBezier,
      p,
      onToggleColorscheme
    }
  }
})
</script>

<style lang="scss" scoped>
.s-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-left: var(--size-30);
  padding-right: var(--size-30);
  height: var(--header-height);
  z-index: var(--zindex-fixed);
  border-bottom: 1px solid var(--c-border);
}

.s-header_logo {
  position: relative;
  width: var(--header-height);
  height: var(--header-height);
  transform: scale(2);
  transform-origin: 0 50%;
}

.s-hesder-logoPath {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: rotate(45deg);
}

.s-hesder-logoPath_line {
  stroke: var(--c-secondary);
  stroke-width: 20;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.s-hesder-logoPath_text {
  fill: currentColor;
  text-align: center;
  text-transform: uppercase;
  font-size: 40px;
  font-weight: var(--font-weight-black);
}

.s-header_nav a {
  font-weight: var(--font-weight-bold);
  margin-left: 0.5em;
  margin-right: 0.5em;

  &.router-link-exact-active {
    opacity: 0.5;
    text-decoration: line-through;
  }
}

.s-header_mode {
  /* <button> reset */
  background-color: transparent;
  text-align: left;
  appearance: none;
  border: 0 solid transparent;
  box-shadow: none;
  outline: 0;

  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50px;

  &:focus {
    appearance: none;
    border-color: #0070c9;
    box-shadow: 0 0 0 3px rgba(131,192,253,0.5);
  }

  background-color: #000000;
  color: #ffffff;
  border-color: #000000;

  html[dark] & {
    background-color: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }
}
</style>
