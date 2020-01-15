<template>
  <div class="s-demo">
    <div class="s-demo_block">
      <div class="s-demo_title">Current Cubic {{ cubicBezier }}</div>
      <DotSnapshot
        class="s-demo_snapshot"
        :value="cubicBezier"
        :duration="duration"
        :repeat="repeat"
      />
    </div>

    <div class="s-demo_block">
      <div class="s-demo_title">Compare Cubic {{ compareCubicBezier }}</div>
      <DotSnapshot
        class="s-demo_snapshot"
        :value="compareCubicBezier"
        :duration="duration"
        :repeat="repeat"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, watch } from '@vue/composition-api'
import anime from 'animejs'

import DotSnapshot from '@/components/DotSnapshot.vue'
import demo from '@/plugins/demo'
import { IDemoProps } from '../types'

export default createComponent({
  name: 'DemoSnapshot',
  components: {
    DotSnapshot
  },
  props: {
    cubicBezier: {
      type: Array,
      required: true
    },
    compareCubicBezier: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      required: true,
      default: 1000
    },
    repeat: {
      type: Boolean,
      required: true,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.s-demo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding-bottom: var(--size-40);
}

.s-demo_block {
  margin-bottom: var(--size-40);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--size-30);
  padding-right: var(--size-30);
  width: 100%;
  max-width: 40rem;
  text-align: center;
}

.s-demo_title {
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-20);
}

.s-demo_snapshot {
  width: 100%;
  height: 3rem;
}
</style>
