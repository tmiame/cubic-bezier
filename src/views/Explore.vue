<template>
  <div class="s-view">
    <div class="s-view_hero u-text-center">
      <h1>Explore👀</h1>
    </div>

    <section class="s-section">
      <h2 class="s-section_title">Google<br>Material Design</h2>
      <div class="s-cards">
        <Card class="s-card" :cubicBezier="[0.4, 0, 0.2, 1]" />
        <Card class="s-card" :cubicBezier="[0.4, 0, 1, 1]" />
        <Card class="s-card" :cubicBezier="[0.2, 0, 0.38, 0.9]" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title">IBM<br>Design</h2>
      <div class="s-cards">
        <Card class="s-card" :cubicBezier="[0.2, 0, 0.38, 0.9]" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title">IBM<br>Design</h2>
      <div class="s-cards">
        <Card class="s-card" :cubicBezier="[0.2, 0.8, 0.4, 1]" />
        <Card class="s-card" :cubicBezier="[0.87, -0.41, 0.19, 1.44]" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref } from '@vue/composition-api'
import { THEME_SYMBOL, THEME_DEFAULT } from '@/constants'

import Card from '@/components/explore/Card.vue'

export default createComponent({
  name: 'Explore',
  components: {
    Card
  },
  setup () {
    const theme = inject(THEME_SYMBOL, THEME_DEFAULT)

    return {
      theme
    }
  }
})
</script>

<style lang="scss" scoped>
.s-view {
  padding-bottom: var(--size-100);
  padding-top: var(--header-height);
  overflow: hidden;
  min-height: 100%;
}

.s-view_hero {
  padding: var(--size-80);
  text-align: center;

  h1 {
    font-size: 7rem;
    font-weight: 900;
  }
}

.s-section {
  margin-bottom: var(--size-100);
}

.s-section_title {
  padding-left: var(--size-30);
  padding-right: var(--size-30);
  margin-bottom: var(--size-30);
  line-height: 1;
  text-align: center;
  font-style: italic;
}

.s-cards {
  display: flex;
  align-items: stretch;
  padding-left: var(--size-30);
  padding-right: var(--size-30);
}

.s-card {
  width: calc((100% - 2rem) / 3);
  margin-right: 1rem;

  &:nth-child(3n) { margin-right: 0; }
}
</style>
