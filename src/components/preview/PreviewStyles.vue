<template>
  <div class="s-styles">
    <div class="swiper-container" ref="swiperElement">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide s-styles_item"
          v-for="style of styles"
          :key="style.id"
          :class="{ '--active': currentStyle.id === style.id }"
          @click="onChangeStyle(style)"
        >
          {{ style.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  computed,
  reactive,
  onMounted,
  watch,
  Ref as RefType,
  SetupContext
} from '@vue/composition-api'

import Swiper from 'swiper'
import 'swiper/css/swiper.css'

interface IDemoStyle {
  id: string
  name: string
  component: string
}

export default createComponent({
  name: 'PreviewStyles',
  setup (props, { emit }:SetupContext) {
    let swiper = null
    const swiperElement:RefType<HTMLElement|null> = ref(null)
    const styles:RefType<IDemoStyle[]> = ref([
      {
        id: 'snapshot',
        name: 'Dots',
        component: 'DemoSnapshot'
      },
      {
        id: 'vue',
        name: 'Vue logo',
        component: 'DemoVueLogo'
      }
    ])
    const currentStyle = ref(styles.value[0])

    const onChangeStyle = (style:IDemoStyle) => {
      currentStyle.value = style
    }

    const initSwiper = () => {
      swiper = new Swiper(swiperElement.value!, {
        spaceBetween: 16,
        slidesOffsetAfter: 100,
        slidesPerView: 4
      })
    }

    watch(() => {
      emit('change-style', currentStyle.value)
    })

    onMounted(() => {
      initSwiper()
    })

    return {
      styles,
      currentStyle,
      swiperElement,
      onChangeStyle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.swiper-wrapper {
  padding-top: 3px;
  padding-bottom: var(--size-30);
  padding-left: var(--size-30);
}

.s-styles {
  width: 100%;
  overflow: hidden;
}

.s-styles_item {
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0.5px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: end;
  justify-content: flex-end;
  position: relative;
  padding: 6rem 1rem 1rem;
  overflow: hidden;
  border-radius: var(--radius-base);
  line-height: 1;
  color: currentColor;
  background-color: var(--c-btn);
  border: 1px solid var(--c-btn-border);

  @include FR_HOVER {
    background-color: var(--c-btn-hover);
    border-color: var(--c-btn-focus-border);
    box-shadow: 0 0 0 3px var(--c-btn-focus-outline);
  }

  &.--active {
    background-color: var(--general-background-c);
  }
}
</style>
