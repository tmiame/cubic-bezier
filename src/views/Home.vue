<template>
  <div class="s-view">
    <div class="s-view_generator">
      <Output class="s-view_generator_topbar" :cubicBezier="cubicBezier"/>
      <div class="s-view_generator_generator">
        <Generator :cubicBezierX="cubicBezier" :compareCubicBezier="compareCubicBezier" />
      </div>
      <Actions class="s-view_generator_actions" :cubicBezier="cubicBezier"/>
      <GeneratorCompare class="s-view_compareView" />
    </div>
    <Preview class="s-view_secondaryView" :cubicBezier="cubicBezier" :compareCubicBezier="compareCubicBezier" />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  watch,
  inject,
  SetupContext
} from '@vue/composition-api'

import { THEME_SYMBOL, THEME_DEFAULT } from '@/constants'

import Generator from '@/components/generator/Generator.vue'
import GeneratorCompare from '@/components/generator/Compare.vue'
import Preview from '@/components/preview/Preview.vue'
import Output from '@/components/generator/Output.vue'
import Actions from '@/components/generator/Actions.vue'
import useReplaceHistory from '@/plugins/replaceHistory'

export default createComponent({
  name: 'Home',
  components: {
    Generator,
    GeneratorCompare,
    Output,
    Preview,
    Actions
  },
  setup (props, { root }:SetupContext) {
    const theme = inject(THEME_SYMBOL, THEME_DEFAULT)
    const store = root.$store.generatorStore
    const cubicBezier = store.getters.cubicBezier
    const compareCubicBezier = store.getters.compareCubicBezier
    const { onReplaceState, getURLHash } = useReplaceHistory()

    const getInitURLHash = () :void => {
      const pMatch = getURLHash()

      if (!pMatch) {
        return
      }

      const p = pMatch[0].split(',').map(Number)
      store.actions.updateCubicBezier(p)
    }

    getInitURLHash()

    watch(() => cubicBezier.value, (newVal) => {
      onReplaceState(newVal)
    })

    return {
      theme,
      cubicBezier,
      compareCubicBezier
    }
  }
})
</script>

<style lang="scss" scoped>
.s-view {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "view_generator view_secondaryView";
  padding-top: var(--header-height);
  user-select: none;
  overflow: hidden;
  height: 100%;
}

.s-view_secondaryView {
  grid-area: view_secondaryView;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  overflow-anchor: none;
  overscroll-behavior-y: none;
  -webkit-overflow-scrolling: touch;
  background-color: var(--general-background-b);

  html[dark] & {
    border-left: 1px solid var(--c-border);
    background-color: transparent;
  }
}

.s-view_generator {
  grid-area: view_generator;
  position: relative;
  display: grid;
  grid-template-rows: auto 3fr auto auto;
  grid-template-areas:
    "view_generator_topbar"
    "view_generator_generator"
    "view_generator_actions"
    "view_compareView";
  grid-row-gap: var(--size-30);
  background-color: var(--general-background-a);

  html[dark] & {
    background-color: transparent;
  }
}

.s-view_generator_topbar {
  grid-area: view_generator_topbar;
  padding-top: var(--size-30);
  padding-left: var(--size-30);
  padding-right: var(--size-30);
}

.s-view_generator_generator {
  grid-area: view_generator_generator;
  position: relative;
}

.s-view_generator_actions {
  grid-area: view_generator_actions;
  padding-left: var(--size-30);
  padding-right: var(--size-30);
}

.s-view_compareView {
  grid-area: view_compareView;
  position: relative;
  overflow-x: hidden;

  html[dark] & {
    border-top: 1px solid var(--c-border);
    background-color: transparent;
  }
}
</style>
