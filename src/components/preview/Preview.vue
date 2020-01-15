<template>
  <div class="s-preview">
    <PreviewToolbar
      class="s-preview_topbar"
      @change-duration="onChangeDuration"
      @change-repeat="onChangeRepeat"
      @focus-run="onFocusRun"
    />

    <div class="s-preview_view">
      <component
        v-if="previewStyle && previewStyle.component"
        :is="previewStyle.component"
        :duration="duration"
        :repeat="repeat"
        :cubicBezier="cubicBezier"
        :compareCubicBezier="compareCubicBezier"
      />
    </div>

    <PreviewStyles
      class="s-preview_styles"
      @change-style="onChangeStyle"
    />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  Ref as RefType,
  SetupContext
} from '@vue/composition-api'
import {
  nextTick
} from '@/utils'
import eventemitter from '@/plugins/eventemitter'

import PreviewToolbar from '@/components/preview/PreviewToolbar.vue'
import PreviewStyles from '@/components/preview/PreviewStyles.vue'
import DemoVueLogo from '@/components/preview/demo/VueLogo.vue'
import DemoDialog from '@/components/preview/demo/Dialog.vue'
import DemoSnapshot from '@/components/preview/demo/Snapshot.vue'

import { TCubic } from '../generator/types'
import { IDemoStyle } from './types'

type PropType = {
  cubicBezier: TCubic
  compareCubicBezier: TCubic
}

export default createComponent({
  name: 'Preview',
  components: {
    PreviewToolbar,
    PreviewStyles,
    DemoVueLogo,
    DemoDialog,
    DemoSnapshot
  },
  props: {
    cubicBezier: {
      type: Array,
      default () {
        return [1, 0, 0, 1]
      }
    },
    compareCubicBezier: {
      type: Array,
      default () {
        return [0, 0, 1, 1]
      }
    }
  },
  setup (props:PropType, { emit }:SetupContext) {
    const duration:RefType<number> = ref(1000)
    const repeat:RefType<boolean> = ref(false)
    const previewStyle:RefType<IDemoStyle> = ref({})

    const onChangeDuration = (newDurationValue:number) :void => {
      duration.value = newDurationValue

      nextTick(() => {
        eventemitter.emit('demo-focus-run')
      })
    }

    const onChangeRepeat = (newValue:boolean) :void => {
      repeat.value = newValue
    }

    const onChangeStyle = (style:IDemoStyle) :void => {
      previewStyle.value = style
    }

    const onFocusRun = () :void => {
      eventemitter.emit('demo-focus-run')
    }

    return {
      duration,
      repeat,
      previewStyle,
      onChangeDuration,
      onChangeRepeat,
      onChangeStyle,
      onFocusRun
    }
  }
})
</script>

<style lang="scss" scoped>
.s-preview {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "preview_topbar"
    "preview_view"
    "preview_styles";
}

.s-preview_topbar {
  grid-area: preview_topbar;
  position: relative;
  z-index: 2;
}

.s-preview_view {
  grid-area: preview_view;
}

.s-preview_styles {
  grid-area: preview_styles;
  position: relative;
  z-index: 2;
}
</style>
