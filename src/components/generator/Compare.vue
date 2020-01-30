<template>
  <div class="s-compare">
    <div class="swiper-container" ref="swiperElement">
      <div class="swiper-wrapper">
        <Card
          class="swiper-slide s-styles_item"
          v-for="(style, index) of styles"
          :key="style.id"
          :class="{ '--active': currentStyle.id === style.id }"
          :cubicBezier="style.cubicBezier"
          @click.native="onChangeStyle(style, index + 1)"
        />
      </div>
      <div class="swiper-scrollbar"></div>
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

import Card from '@/components/generator/CompareCard.vue'

interface IDemoStyle {
  id: string
  name: string
  cubicBezier: string
}

export default createComponent({
  name: 'GeneratorCompare',
  components: {
    Card
  },
  setup (props, { emit, root: { $store } }:SetupContext) {
    const store = $store.generatorStore

    let swiper:Swiper|null = null
    const swiperElement:RefType<HTMLElement|null> = ref(null)
    const styles:RefType<IDemoStyle[]> = ref([
      {
        id: 'linear',
        name: '[0, 0, 1, 1]',
        cubicBezier: [0, 0, 1, 1]
      },
      {
        id: 1,
        name: '[0.4, 0, 0.2, 1]',
        cubicBezier: [0.4, 0, 0.2, 1]
      },
      {
        id: 2,
        name: '[0.4, 0, 1, 1]',
        cubicBezier: [0.4, 0, 1, 1]
      },
      {
        id: 3,
        name: '[0.2, 0, 0.38, 0.9]',
        cubicBezier: [0.2, 0, 0.38, 0.9]
      },
      {
        id: 4,
        name: '[0.2, 0, 0.38, 0.9]',
        cubicBezier: [0.2, 0, 0.38, 0.9]
      },
      {
        id: 5,
        name: '[0.2, 0.8, 0.4, 1]',
        cubicBezier: [0.2, 0.8, 0.4, 1]
      },
      {
        id: 6,
        name: '[0.87, -0.41, 0.19, 1.44]',
        cubicBezier: [0.87, -0.41, 0.19, 1.44]
      }
    ])
    const currentStyle = ref(styles.value[0])

    const onChangeStyle = (style:IDemoStyle, index: number) => {
      currentStyle.value = style
      swiper!.slideTo(index)
    }

    const initSwiper = () => {
      swiper = new Swiper(swiperElement.value!, {
        speed: 200,
        spaceBetween: 16,
        slidesOffsetAfter: 100,
        slidesPerView: 5,
        slidesPerGroup: 4,
        mousewheel: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        }
      })
    }

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
  padding-top: var(--size-30);
  padding-bottom: var(--size-30);
  padding-left: var(--size-30);
}

.s-styles {
  width: 100%;
  overflow: hidden;
}

.s-styles_item {
  position: relative;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--radius-base);
  color: currentColor;
  background-color: var(--c-btn);
  border: 1px solid var(--c-btn-border);

  @include FR_HOVER {
    background-color: var(--c-btn-hover);
    border-color: var(--c-btn-focus-border);
    box-shadow: 0 0 0 3px var(--c-btn-focus-outline);
  }

  &.--active {
    background-color: var(--c-btn-hover);
    border-color: var(--c-btn-focus-border);
    box-shadow: 0 0 0 3px var(--c-btn-focus-outline);
  }
}
</style>
