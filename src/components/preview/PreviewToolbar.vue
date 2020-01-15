<template>
  <div class="s-toolbar">
    <Button type="select" class="u-mr-1">
      <template #beforeIcon>
        <CarbonIcon name="timer" />
      </template>
      <label>
        {{ `${(selected / 1000)}s` }}
        <select v-model="selected">
          <option value="150">0.15s</option>
          <option value="250">0.25s</option>
          <option value="350">0.35s</option>
          <option value="500">0.5s</option>
          <option value="750">0.75s</option>
          <option value="1000" selected>1s</option>
          <option value="1500">1.5s</option>
          <option value="2000">2s</option>
        </select>
      </label>
    </Button>

    <Button
      type="button"
      :theme="repeated ? 'primary' : 'base'"
      class="s-repeat u-mr-1 u-ml-auto"
      :class="{ '--active': repeated }"
      @click.native="onToggleRepeat"
    >
      <template #beforeIcon>
        <CarbonIcon name="repeat" />
      </template>
      Repeat
    </Button>

    <Button type="button" @click.native="onFocusRun">
      <template #beforeIcon>
        <CarbonIcon name="renew" />
      </template>
      Rerun
    </Button>
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

import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'

export default createComponent({
  name: 'PreviewToolbar',
  components: {
    Button,
    CarbonIcon
  },
  setup (props, { emit }:SetupContext) {
    const selected:RefType<number> = ref(1000)
    const repeated:RefType<boolean> = ref(true)

    const onToggleRepeat = () :void => {
      repeated.value = !repeated.value
    }

    const onFocusRun = () :void => {
      emit('focus-run')
    }

    watch(() => selected.value, (newVal) => {
      emit('change-duration', Number(newVal))
    })

    watch(() => repeated.value, (newVal) => {
      emit('change-repeat', newVal)
    })

    return {
      selected,
      repeated,
      onToggleRepeat,
      onFocusRun
    }
  }
})
</script>

<style lang="scss" scoped>
.s-toolbar {
  display: flex;
  padding-top: var(--size-30);
  padding-left: var(--size-30);
  padding-right: var(--size-30);
}
</style>
