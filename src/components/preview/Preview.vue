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
  Ref as RefType
} from '@vue/composition-api'

import eventemitter from '@/plugins/eventemitter'
import { nextTick } from '@/utils'

import PreviewToolbar from '@/components/preview/PreviewToolbar.vue'
import PreviewStyles from '@/components/preview/PreviewStyles.vue'
import DemoVueLogo from '@/components/preview/demo/VueLogo.vue'
import DemoDialog from '@/components/preview/demo/Dialog.vue'
import DemoSnapshot from '@/components/preview/demo/Snapshot.vue'

import { DEFAULT_CUBIC, DEFAULT_COMPARE_CUBIC, DEFAULT_PREVIEW_DURATION, DEFAULT_PREVIEW_REPEAT } from '@/constants'
import { TCubic, IDemoStyle } from '@/types'

type PropType = {
  cubicBezier: TCubic
  compareCubicBezier: TCubic
}

export default createComponent<PropType>({
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
        return DEFAULT_CUBIC
      }
    },
    compareCubicBezier: {
      type: Array,
      default () {
        return DEFAULT_COMPARE_CUBIC
      }
    }
  },
  setup (props, { emit }) {
    const duration = ref(DEFAULT_PREVIEW_DURATION)
    const repeat = ref(DEFAULT_PREVIEW_REPEAT)
    const previewStyle:RefType<IDemoStyle> = ref({})

    const onChangeDuration = (newDurationValue:number) => {
      duration.value = newDurationValue

      nextTick(() => {
        eventemitter.emit('demo-focus-run')
      })
    }

    const onChangeRepeat = (newValue:boolean) => {
      repeat.value = newValue
    }

    const onChangeStyle = (style:IDemoStyle) => {
      previewStyle.value = style
    }

    const onFocusRun = () => {
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
