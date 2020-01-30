<template>
  <div class="s-root" @click="onClose">
    <div class="s-modal" @click.stop>

      <section class="s-modal_block">
        <div class="s-input">
          <input v-model="valueHyphen" class="s-input_textField" readonly ref="exportHyphen">
          <button class="s-input_append" @click.stop="onCopy(1)">
            <CarbonIcon name="copy" />
          </button>
        </div>
      </section>

      <section class="s-modal_block">
        <div class="s-input">
          <input v-model="valueCamel" class="s-input_textField" readonly ref="exportCamel">
          <button class="s-input_append" @click.stop="onCopy(2)">
            <CarbonIcon name="copy" />
          </button>
        </div>
      </section>

      <Button type="button" theme="primary" @click.native="onClose">Close</Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  Ref as RefType,
  computed
} from '@vue/composition-api'

import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'
import useClipboard from '@/plugins/clipboard'
import useReplaceHistory from '@/plugins/replaceHistory'
import useSnackbar from '@/plugins/snackbar'
import { ESnackbarType } from '@/types'

export enum EExportType {
  cubicBezierHyphen = 1,
  cubicBezierCamel = 2
}

export default createComponent({
  name: 'ShareDialog',
  components: {
    Button,
    CarbonIcon
  },
  setup (props, { emit, root: { $store } }) {
    const store = $store.generatorStore
    const cubicBezier = store.getters.cubicBezier
    const compareCubicBezier = store.getters.compareCubicBezier

    const { onCopy: onCopyText, copyText } = useClipboard()
    const { getSearchParamsToString } = useReplaceHistory()
    const { addSnackbar } = useSnackbar()

    const exportHyphen:RefType<HTMLInputElement|null> = ref(null)
    const exportCamel:RefType<HTMLInputElement|null> = ref(null)

    const valueHyphen = computed(() => {
      const query = getSearchParamsToString({ cubicBezier: cubicBezier.value })
      return `https://cubic-bezier.web.app/${query}`
    })
    const valueCamel = computed(() => {
      const query = getSearchParamsToString({ cubicBezier: cubicBezier.value, compareCubicBezier: compareCubicBezier.value })
      return `https://cubic-bezier.web.app/${query}`
    })

    const onSelectCopyText = (type:EExportType) => {
      switch (type) {
        case EExportType.cubicBezierHyphen:
          exportHyphen.value!.focus()
          exportHyphen.value!.select()
          copyText.value = valueHyphen.value
          break
        case EExportType.cubicBezierCamel:
          exportCamel.value!.focus()
          exportCamel.value!.select()
          copyText.value = valueCamel.value
          break
      }
    }

    const onCopy = (type:EExportType) => {
      addSnackbar({
        text: 'Copied to clipboard 👋',
        type: ESnackbarType.success,
        timeout: 2000
      })

      onSelectCopyText(type)
      onCopyText()
    }

    const onClose = () => {
      emit('close')
    }

    return {
      exportHyphen,
      exportCamel,
      valueHyphen,
      valueCamel,
      onClose,
      onCopy
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.s-root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}

.s-modal {
  position: relative;
  padding: var(--size-60) var(--size-60);
  background-color: var(--general-background-a);
  border-radius: var(--radius-base);
  max-width: 40rem;
  width: 100%;
  height: auto;
  cursor: auto;
}

.s-modal_block {
  position: relative;
  margin-bottom: var(--size-30);
}

.s-input {
  position: relative;
}

.s-input_append {
  position: absolute;
  display: block;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  font-size: var(--btn-font-size);

  svg { stroke-width: 1; }
}

.s-input_textField {
  // <button> reset
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
  border-radius: var(--radius-base);
  width: 100%;
  letter-spacing: -0.05em;

  // base style
  white-space: nowrap;
  font-size: var(--btn-font-size);
  font-weight: var(--font-weight-bold);
  height: var(--btn-height);
  padding: 0 3rem 0 1.5rem;

  &:focus {
    appearance: none;
    border-color: #0070c9;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(131,192,253,0.5);
  }

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.s-input_textField {
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
