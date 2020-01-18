<template>
  <div class="s-view">
    <div class="s-view_generator">
      <template v-if="editorType === 'current'">
        <Output
          class="s-view_generator_topbar"
          :cubicBezier="cubicBezier"
          @input="onUpdateCubicBezier"
        />
        <div class="s-view_generator_generator">
          <Generator
            type="current"
            :cubicBezierX="cubicBezier"
            :compareCubicBezier="compareCubicBezier"
            @input="onUpdateCubicBezier"
          />
        </div>
        <Actions
          class="s-view_generator_actions"
          :cubicBezier="cubicBezier"
          @compare-edit="onEditCompare"
        />
      </template>
      <template v-else>
        <Output
          class="s-view_generator_topbar"
          :cubicBezier="compareCubicBezier"
          @input="onUpdateCompareCubicBezier"
        />
        <div class="s-view_generator_generator">
          <Generator
            type="compare"
            :cubicBezierX="compareCubicBezier"
            :compareCubicBezier="cubicBezier"
            @input="onUpdateCompareCubicBezier"
          />
        </div>
        <Actions
          class="s-view_generator_actions"
          :cubicBezier="compareCubicBezier"
          @compare-edit="onEditCompare"
        />
        <GeneratorCompare
          class="s-view_compareView"
          @edit="onEditCompare"
        />
      </template>
    </div>
    <Preview class="s-view_secondaryView" :cubicBezier="cubicBezier" :compareCubicBezier="compareCubicBezier" />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  watch,
  SetupContext,
  ref
} from '@vue/composition-api'

import Generator from '@/components/generator/Generator.vue'
import GeneratorCompare from '@/components/generator/Compare.vue'
import Preview from '@/components/preview/Preview.vue'
import Output from '@/components/generator/Output.vue'
import Actions from '@/components/generator/Actions.vue'
import useReplaceHistory from '@/plugins/replaceHistory'
import { TCubic } from '@/types'

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
    const store = root.$store.generatorStore
    const cubicBezier = store.getters.cubicBezier
    const compareCubicBezier = store.getters.compareCubicBezier
    const editorType = ref('current')
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

    const onUpdateCubicBezier = (value:TCubic) => {
      store.actions.updateCubicBezier(value)
    }

    const onUpdateCompareCubicBezier = (value:TCubic) => {
      store.actions.updateCompareCubicBezier(value)
    }

    const onEditCompare = () => {
      editorType.value = editorType.value === 'compare' ? 'current' : 'compare'
    }

    watch(() => cubicBezier.value, (newVal) => {
      onReplaceState(newVal)
    })

    return {
      editorType,
      cubicBezier,
      compareCubicBezier,
      onUpdateCubicBezier,
      onUpdateCompareCubicBezier,
      onEditCompare
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
