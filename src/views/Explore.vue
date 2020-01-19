<template>
  <div class="s-view">
    <div class="s-view_hero u-text-center">
      <h1>Explore👀</h1>
    </div>

    <section class="s-section">
      <h2 class="s-section_title">Basic</h2>
      <div class="s-cards --5">
        <Card class="s-card" :cubicBezier="[0.25, 0.1, 0.25, 1.0]" title="ease" />
        <Card class="s-card" :cubicBezier="[0.0, 0.0, 1.0, 1.0]" title="linear" />
        <Card class="s-card" :cubicBezier="[0.42, 0, 1.0, 1.0]" title="ease-in" />
        <Card class="s-card" :cubicBezier="[0, 0, 0.58, 1.0]" title="ease-out" />
        <Card class="s-card" :cubicBezier="[0.42, 0, 0.58, 1.0]" title="ease-in-out" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Quad</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.55, 0.085, 0.68, 0.53]" title="easeInQuad" />
        <Card class="s-card" :cubicBezier="[0.25, 0.46, 0.45, 0.94]" title="easeOutQuad" />
        <Card class="s-card" :cubicBezier="[0.455, 0.03, 0.515, 0.955]" title="easeInOutQuad" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Quart</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.895, 0.03, 0.685, 0.22]" title="easeInQuart" />
        <Card class="s-card" :cubicBezier="[0.165, 0.84, 0.44, 1]" title="easeOutQuart" />
        <Card class="s-card" :cubicBezier="[0.77, 0, 0.175, 1]" title="easeInOutQuart" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Expo</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.95, 0.05, 0.795, 0.035]" title="easeInExpo" />
        <Card class="s-card" :cubicBezier="[0.19, 1, 0.22, 1]" title="easeOutExpo" />
        <Card class="s-card" :cubicBezier="[1, 0, 0, 1]" title="easeInOutExpo" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Back</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.6, -0.28, 0.735, 0.045]" title="easeInBack" />
        <Card class="s-card" :cubicBezier="[0.175, 0.885, 0.32, 1.275]" title="easeOutBack" />
        <Card class="s-card" :cubicBezier="[0.68, -0.55, 0.265, 1.55]" title="easeInOutBack" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Sine</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.47, 0, 0.745, 0.715]" title="easeInSine" />
        <Card class="s-card" :cubicBezier="[0.39, 0.575, 0.565, 1]" title="easeOutSine" />
        <Card class="s-card" :cubicBezier="[0.445, 0.05, 0.55, 0.95]" title="easeInOutSine" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Cubic</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.55, 0.055, 0.675, 0.19]" title="easeInCubic" />
        <Card class="s-card" :cubicBezier="[0.215, 0.61, 0.355, 1]" title="easeOutCubic" />
        <Card class="s-card" :cubicBezier="[0.645, 0.045, 0.355, 1]" title="easeInOutCubic" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Quint</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.755, 0.05, 0.855, 0.06]" title="easeInQuint" />
        <Card class="s-card" :cubicBezier="[0.23, 1, 0.32, 1]" title="easeOutQuint" />
        <Card class="s-card" :cubicBezier="[0.86, 0, 0.07, 1]" title="easeInOutQuint" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title"><small>Easing Functions:</small> Circ</h2>
      <div class="s-cards --3">
        <Card class="s-card" :cubicBezier="[0.6, 0.04, 0.98, 0.335]" title="easeInCirc" />
        <Card class="s-card" :cubicBezier="[0.075, 0.82, 0.165, 1]" title="easeOutCirc" />
        <Card class="s-card" :cubicBezier="[0.785, 0.135, 0.15, 0.86]" title="easeInOutCirc" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title">Google Material Design</h2>
      <div class="s-cards">
        <Card class="s-card" :cubicBezier="[0.4, 0, 0.2, 1]" />
        <Card class="s-card" :cubicBezier="[0.4, 0, 1, 1]" />
        <Card class="s-card" :cubicBezier="[0.2, 0, 0.38, 0.9]" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title">IBM Design</h2>
      <div class="s-cards --4">
        <Card class="s-card" :cubicBezier="[0.2, 0, 0.38, 0.9]" />
        <Card class="s-card" :cubicBezier="[0.4, 0.14, 0.3, 1]" />
        <Card class="s-card" :cubicBezier="[0, 0, 0.38, 0.9]" />
        <Card class="s-card" :cubicBezier="[0, 0, 0.3, 1]" />
      </div>
    </section>

    <section class="s-section">
      <h2 class="s-section_title">Uber</h2>
      <div class="s-cards --4">
        <Card class="s-card" :cubicBezier="[0.2, 0.8, 0.4, 1]" title="type:ease-out" />
        <Card class="s-card" :cubicBezier="[0.9, 0, 0.1, 1]" title="type:ease-in-out" />
        <Card class="s-card" :cubicBezier="[0.8, 0, 0.2, 1]" title="type:ease-in-out" />
        <Card class="s-card" :cubicBezier="[0.25, 0.46, 0.45, 0.94]" title="easeOutQuad" />
        <Card class="s-card" :cubicBezier="[0.19, 1, 0.22, 1]" title="easeOutExpo" />
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
    font-weight: var(--font-weight-bold);
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
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  font-style: italic;
}

.s-cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  padding-left: var(--size-30);
  padding-right: var(--size-30);

  &:not(.--5):not(.--4) {
    padding-left: var(--size-100);
    padding-right: var(--size-100);
  }
}

.s-card {
  margin-right: 1rem;

  .s-cards:not(.--5):not(.--4) & {
    width: calc((100% - 2rem) / 3);
    margin-top: 1rem;
    margin-right: 1rem;

    &:nth-child(3n) { margin-right: 0; }
    &:nth-child(-n+3) { margin-top: 0; }
  }

  .s-cards.--4 & {
    width: calc((100% - 3rem) / 4);
    margin-top: 1rem;
    margin-right: 1rem;

    &:nth-child(4n) { margin-right: 0; }
    &:nth-child(-n+4) { margin-top: 0; }
  }

  .s-cards.--5 & {
    width: calc((100% - 2rem) / 5);
    margin-top: 0.5rem;
    margin-right: 0.5rem;

    &:nth-child(5n) { margin-right: 0; }
    &:nth-child(-n+5) { margin-top: 0; }
  }
}
</style>
