<template>
  <div>
    <div class="s-form">
      <input
        ref="p1"
        class="s-form-textbox -p1 u-ml-0"
        type="number"
        min="-1"
        max="1"
        step="0.1"
        required
        v-model.number="cubicBezierEditable[0]"
        @keydown.enter="onNext(1)"
        @input="onInput(1)"
      />
      <div class="s-form_comma">,</div>
      <input
        ref="p2"
        class="s-form-textbox -p2"
        type="number"
        min="-1.5"
        max="1.5"
        step="0.1"
        required
        v-model.number="cubicBezierEditable[1]"
        @keydown.enter="onNext(2)"
        @input="onInput(2)"
      />
      <div class="s-form_comma">,</div>
      <input
        ref="p3"
        class="s-form-textbox -p3"
        type="number"
        min="-1.5"
        max="1.5"
        step="0.1"
        required
        v-model.number="cubicBezierEditable[2]"
        @keydown.enter="onNext(3)"
        @input="onInput(3)"
      />
      <div class="s-form_comma">,</div>
      <input
        ref="p4"
        class="s-form-textbox -p4 u-mr-0"
        type="number"
        min="-1.5"
        max="1.5"
        step="0.1"
        required
        v-model.number="cubicBezierEditable[3]"
        @keydown.enter="onNext(4)"
        @input="onInput(4)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  watch,
  Ref as RefType,
  SetupContext
} from '@vue/composition-api'

import { sliceMaxLength } from '@/utils'

export enum ECubicBezierType {
  P1 = 1,
  P2 = 2,
  P3 = 3,
  P4 = 4
}

export default createComponent({
  name: 'GeneratorHeader',

  setup (props, { root: { $store } }:SetupContext) {
    const store = $store.generatorStore
    const cubicBezier = store.getters.cubicBezier
    const cubicBezierEditable:RefType<number[]> = ref(store.cubicBezier.value)

    const p1:RefType<HTMLElement|null> = ref(null)
    const p2:RefType<HTMLElement|null> = ref(null)
    const p3:RefType<HTMLElement|null> = ref(null)
    const p4:RefType<HTMLElement|null> = ref(null)

    const onNext = (type:ECubicBezierType) => {
      switch (type) {
        case ECubicBezierType.P1:
          p2.value!.focus()
          break
        case ECubicBezierType.P2:
          p3.value!.focus()
          break
        case ECubicBezierType.P3:
          p4.value!.focus()
          break
        case ECubicBezierType.P4:
          p4.value!.blur()
          break
      }

      store.actions.updateCubicBezier(cubicBezierEditable.value)
    }

    const onInput = (type:ECubicBezierType) => {
      switch (type) {
        case ECubicBezierType.P1:
          cubicBezierEditable.value[0] = sliceMaxLength(Math.min(1, Math.max(cubicBezierEditable.value[0], 0)), 4)
          break
        case ECubicBezierType.P2:
          cubicBezierEditable.value[1] = sliceMaxLength(Math.min(2, Math.max(cubicBezierEditable.value[1], -2)), 4)
          break
        case ECubicBezierType.P3:
          cubicBezierEditable.value[2] = sliceMaxLength(Math.min(1, Math.max(cubicBezierEditable.value[2], 0)), 4)
          break
        case ECubicBezierType.P4:
          cubicBezierEditable.value[3] = sliceMaxLength(Math.min(2, Math.max(cubicBezierEditable.value[3], -2)), 4)
          break
      }
    }

    watch(() => {
      cubicBezierEditable.value = cubicBezier.value
    })

    return {
      p1,
      p2,
      p3,
      p4,
      cubicBezierEditable,
      onNext,
      onInput
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

::v-deep {
  --btn-height: 3.5rem;
  --btn-font-size: 1.25rem;
}

.s-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.s-form_comma {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
}

.s-form-textbox {
  // <button> reset
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
  border-radius: var(--radius-base);
  margin-left: 4px;
  margin-right: 4px;
  width: 100%;
  letter-spacing: -0.05em;

  // base style
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
  font-size: var(--btn-font-size);
  font-weight: var(--font-weight-bold);
  height: var(--btn-height);
  padding: 0 0.25rem;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.s-form-textbox {
  box-shadow: 0 1px 3px 0 rgba(14, 30, 37, 0.05);
  color: currentColor;
  background-color: var(--c-btn);
  border: 1px solid var(--c-btn-border);

  @include FR_HOVER {
    background-color: var(--c-btn-hover);
  }

  &:focus {
    border-color: var(--c-btn-focus-border);
    box-shadow: 0 0 0 3px var(--c-btn-focus-outline);
  }
}
</style>
