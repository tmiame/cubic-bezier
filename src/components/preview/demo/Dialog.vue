<template>
  <div>
    <div ref="animeTarget" class="s-dialog">
      <h3>Hello</h3>
      <p>aliquam faucibus purus in massa</p>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, watch } from '@vue/composition-api'
import anime from 'animejs'
import eventemitter from '@/plugins/eventemitter'
import demo from '@/plugins/demo'
import { IDemoProps } from '../types'

export default createComponent({
  name: 'DemoVueLogo',
  props: {
    cubicBezier: {
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
  setup (props:IDemoProps, { emit }:SetupContext) {
    const {
      animeTarget,
      animeRepeat,
      animeCubicBezier,
      animeValues
    } = demo()

    const animeParams = {
      translateX: ['-50%', '-50%'],
      translateY: ['10%', '-50%'],
      opacity: {
        value: [0, 1],
        duration: (props.duration * 1.2)
      }
    }

    animeRepeat.value = props.repeat
    animeCubicBezier.value = props.cubicBezier
    animeValues.value = {
      ...animeValues.value,
      ...animeParams
    }

    watch(() => props.repeat, (val) => {
      animeRepeat.value = val
    })
    watch(() => props.cubicBezier, (val) => {
      animeCubicBezier.value = val
    })
    watch(() => props.duration, (val) => {
      animeValues.value.duration = val
    })

    return {
      animeTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.s-dialog {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: var(--size-40);
  background-color: var(--brand-background-solid);
  border-radius: var(--radius-medium);
  box-shadow: 0 5px 20px rgba(#000000, 0.1)
}
</style>
