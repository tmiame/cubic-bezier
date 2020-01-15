<template>
  <div class="s-card" @click="onSetCompare">
    <figure>
      <figcaption class="s-card_title" v-text="cubicBezierToString" />
      <BezierLine class="s-card_bezierLine" :value="cubicBezier" />
    </figure>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, SetupContext } from '@vue/composition-api'

import BezierLine from '@/components/HelloWorld.vue'
import { TCubic } from './types'

export default createComponent({
  name: 'CompareCard',
  components: {
    BezierLine
  },
  props: {
    cubicBezier: {
      type: Array,
      required: true
    }
  },
  setup (props, { root: { $store } }:SetupContext) {
    const store = $store.generatorStore
    const cubicBezierToString = computed(() => {
      return `${props.cubicBezier.join(',')}`
    })

    const onSetCompare = () => {
      store.actions.updateCompareCubicBezier(props.cubicBezier)
    }

    return {
      cubicBezierToString,
      onSetCompare
    }
  }
})
</script>

<style lang="scss" scoped>
.s-card {
  position: relative;
  text-align: center;
}

.s-card figure {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.s-card_bezierLine {
  position: absolute;
  top: -15%;
  left: -15%;
  width: 130%;
  height: 130%;
}

.s-card_title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  font-size: 0.8rem;
  font-weight: var(--font-weight-bold);
}
</style>
