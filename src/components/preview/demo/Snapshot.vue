<template>
  <div class="s-demo">
    <transition name="vfade">
      <div v-if="isActive" class="s-demo_block">
        <div class="s-demo_title">Current Cubic {{ cubicBezier }}</div>
        <DotSnapshot
          class="s-demo_snapshot"
          :value="cubicBezier"
          :duration="duration"
          :repeat="repeat"
        />
      </div>
    </transition>

    <transition name="vfade">
      <div v-if="isActive" class="s-demo_block">
        <div class="s-demo_title">Compare Cubic {{ compareCubicBezier }}</div>
        <DotSnapshot
          class="s-demo_snapshot"
          :value="compareCubicBezier"
          :duration="duration"
          :repeat="repeat"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, onUnmounted } from '@vue/composition-api'
import DotSnapshot from '@/components/DotSnapshot.vue'
import eventemitter from '@/plugins/eventemitter'
import { nextTick, sleep } from '@/utils'
import { DEFAULT_CUBIC, DEFAULT_COMPARE_CUBIC, DEFAULT_PREVIEW_DURATION, DEFAULT_PREVIEW_REPEAT } from '@/constants'
import { IDemoProps } from '@/types'

export default createComponent<IDemoProps>({
  name: 'DemoSnapshot',
  components: {
    DotSnapshot
  },
  props: {
    cubicBezier: {
      type: Array,
      required: true,
      default () {
        return DEFAULT_CUBIC
      }
    },
    compareCubicBezier: {
      type: Array,
      required: true,
      default () {
        return DEFAULT_COMPARE_CUBIC
      }
    },
    duration: {
      type: Number,
      required: true,
      default: DEFAULT_PREVIEW_DURATION
    },
    repeat: {
      type: Boolean,
      required: true,
      default: DEFAULT_PREVIEW_REPEAT
    }
  },
  setup (props) {
    const isActive = ref(true)

    const onFocusRun = async () => {
      isActive.value = false
      await sleep(250)
      isActive.value = true
    }

    onMounted(() => {
      eventemitter.on('demo-focus-run', onFocusRun)
    })

    onUnmounted(() => {
      eventemitter.removeListener('demo-focus-run', onFocusRun)
    })

    return {
      isActive
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
  padding-bottom: var(--size-60);
}

.s-demo_block {
  margin-bottom: var(--size-60);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--size-30);
  padding-right: var(--size-30);
  width: 100%;
  max-width: 40rem;
  text-align: center;
}

.s-demo_title {
  margin-bottom: var(--size-20);
}

.s-demo_snapshot {
  width: 100%;
  height: 3.5rem;
}
</style>
