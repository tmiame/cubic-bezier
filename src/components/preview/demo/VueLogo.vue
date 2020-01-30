<template>
  <div class="s-demo">
    <div class="s-demo_item">
      <div class="s-demo_title">Current</div>
      <div ref="animeTarget" class="s-demo_icon">
        <img alt="Vue logo" src="@/assets/logo.png">
      </div>
    </div>
    <div class="s-demo_item">
      <div class="s-demo_title">Compare</div>
      <div ref="compareAnimeTarget" class="s-demo_icon">
        <img alt="Vue logo" src="@/assets/logo.png">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, watch } from '@vue/composition-api'
import anime from 'animejs'
import demo from '@/plugins/demo'
import { nextTick } from '@/utils'
import { IDemoProps } from '@/types'

export default createComponent<IDemoProps>({
  name: 'DemoVueLogo',
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
      required: true
    },
    repeat: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const {
      animeTarget,
      animeRepeat,
      animeCubicBezier,
      animeValues
    } = demo()

    const {
      animeTarget: compareAnimeTarget,
      animeRepeat: compareAnimeRepeat,
      animeCubicBezier: compareAnimeCubicBezier,
      animeValues: compareAnimeValues
    } = demo()

    const animeParams = {
      duration: props.duration,
      scale: [0, 1],
      opacity: [0, 1]
    }

    animeCubicBezier.value = props.cubicBezier
    animeRepeat.value = props.repeat
    animeValues.value = {
      ...animeValues.value,
      ...animeParams
    }

    compareAnimeCubicBezier.value = props.compareCubicBezier
    compareAnimeRepeat.value = props.repeat
    compareAnimeValues.value = {
      ...compareAnimeValues.value,
      ...animeParams
    }

    watch(() => props.repeat, (val) => {
      animeRepeat.value = val
      compareAnimeRepeat.value = val
    })
    watch(() => props.cubicBezier, (val) => {
      animeCubicBezier.value = val
    })
    watch(() => props.compareCubicBezier, (val) => {
      compareAnimeCubicBezier.value = val
    })
    watch(() => props.duration, (val) => {
      animeValues.value.duration = val
      compareAnimeValues.value.duration = val
    })

    return {
      animeTarget,
      compareAnimeTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.s-demo {
  padding-left: var(--size-60);
  padding-right: var(--size-60);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.s-demo_item {
  text-align: center;
  width: 50%;
}

.s-demo_icon {
  width: 70%;
  height: 70%;
  pointer-events: none;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
