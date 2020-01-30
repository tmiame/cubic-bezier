<template>
  <div class="s-view">
    <div class="s-view_generator">
      <div class="s-view_hero u-text-center">
        <h1>Search🔍</h1>
      </div>
      <div class="s-view_generator_generator">
        <Generator
          type="current"
          :cubicBezierX="cubicBezier"
          @input="onUpdateCubicBezier"
        />
      </div>
    </div>

    <div class="s-view_secondaryView">
      <transition-group
        name="vfade"
        mode="out-in"
        tag="div"
        class="s-nearList"
      >
        <div
          class="s-nearList_item"
          v-for="(item, index) of nearItems"
          :key="index"
        >
          <EaseLine class="s-nearList_item_easeLine" :value="item.ease" />
          <div class="s-nearList_item_content">
            <h2>{{ item.name }}</h2>
            <!-- {{ item.passed }} {{ Math.round(item.score) }} - {{ item.diff }} -->
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { DEFAULT_CUBIC } from '@/constants'
import list from '@/constants/list'
import { TCubic } from '@/types'

import Card from '@/components/explore/Card.vue'
import EaseLine from '@/components/HelloWorld.vue'
import Generator from '@/components/generator/Generator.vue'

export default createComponent({
  name: 'Search',
  components: {
    Card,
    EaseLine,
    Generator
  },
  setup () {
    const cubicBezier = ref([0, 0, 1, 1])

    const nearItems = computed(() => {
      const diffList = list.map(item => {
        const difference = (a:number, b:number) :number => Math.abs(a - b)
        const normalize = (num:number) :number => Math.floor(1000 * num) / 1000

        const diff = item.ease.map((p, index) => normalize(difference(p, cubicBezier.value[index])))
        const passed = diff.every((p, index) => {
          return (index === 0 || index === 2) ? p <= 0.45 : p <= 0.25
        })
        const score = (1.6 - diff.reduce((result, p) => result + p, 0)) / 1.6 * 100

        return {
          ...item,
          diff,
          score,
          passed
        }
      })

      return diffList.filter((item) => item.passed).sort((a, b) => {
        if (a.score > b.score) return -1
        if (a.score < b.score) return 1
        return 0
      })
    })

    const onUpdateCubicBezier = (value:TCubic) => {
      cubicBezier.value = value
    }

    return {
      nearItems,
      cubicBezier,
      onUpdateCubicBezier
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
  border-left: 1px solid var(--c-border);

  html[dark] & {
    border-left: 1px solid var(--c-border);
  }
}

.s-view_hero {
  padding: var(--size-80);
  padding-bottom: 0;
  text-align: center;
  pointer-events: none;
  user-select: none;

  h1 {
    font-size: 6rem;
    font-weight: var(--font-weight-bold);
  }
}

.s-view_generator {
  grid-area: view_generator;
  position: relative;
}

.s-nearList {
  width: 100%;
}

.s-nearList_item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.s-nearList_item_easeLine {
  width: 10rem;
}
</style>
