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
          <img class="s-styleItem_image" v-if="style.image" :src="style.image">
          <div class="s-styleItem_title" v-text="style.name || style.id" />
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
  onUnmounted,
  watch,
  Ref as RefType
} from '@vue/composition-api'

import Swiper from 'swiper'
import 'swiper/css/swiper.css'

import { IDemoStyle } from '@/types'

export default createComponent({
  name: 'PreviewStyles',
  setup (props, { emit }) {
    let swiper:Swiper|null = null
    const swiperElement:RefType<HTMLElement|null> = ref(null)
    const styles:RefType<IDemoStyle[]> = ref([
      {
        id: 'snapshot',
        name: 'Dots',
        image: require('@/assets/demo-snapshot.png'),
        component: 'DemoSnapshot'
      },
      {
        id: 'vue',
        name: 'Vue logo',
        image: require('@/assets/logo.png'),
        component: 'DemoVueLogo'
      },
      {
        id: 'slide-out',
        name: 'SlideOut',
        component: 'DemoSlideOut'
      }
    ])
    const currentStyle = ref(styles.value[0])

    const onChangeStyle = (style:IDemoStyle) => {
      currentStyle.value = style
    }

    const initSwiper = () => {
      swiper = new Swiper(swiperElement.value!, {
        spaceBetween: 10,
        slidesOffsetAfter: 100,
        slidesPerView: 5
      })
    }

    const destroySwiper = () => {
      if (swiper) {
        swiper.destroy(true, true)
        swiper = null
      }
    }

    watch(() => {
      emit('change-style', currentStyle.value)
    })

    onMounted(() => {
      initSwiper()
    })

    onUnmounted(() => {
      destroySwiper()
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
  padding-bottom: var(--size-25);
  padding-left: var(--size-25);
}

.s-styles {
  width: 100%;
  overflow: hidden;
}

.s-styles_item {
  height: 100px;
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

.s-styleItem_image {
  position: absolute;
  top: calc(50% - 2rem);
  left: 0;
  width: 100%;
  height: 2rem;
  object-fit: contain;
  object-position: center;
}

.s-styleItem_title {
  // font-weight: var(--font-weight-bold);
}
</style>
