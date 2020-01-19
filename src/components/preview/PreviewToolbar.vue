<template>
  <div class="s-toolbar">
    <Button type="select" class="s-toolbar_speed u-mr-1">
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
          <option value="5000">5s</option>
        </select>
      </label>
    </Button>
    <div class="s-toolbar_speedControl">
      <Button type="button" class="-up" @click.native="onDurationUp" :disabled="selected >= DURATION_MAX">
        <CarbonIcon name="add" />
      </Button>
      <Button type="button" class="-down" @click.native="onDurationDown" :disabled="selected <= DURATION_MIN">
        <CarbonIcon name="subtract" />
      </Button>
    </div>

    <Button
      type="button"
      :theme="repeated ? 'primary' : 'base'"
      class="u-mr-2 u-ml-auto"
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
  onUnmounted,
  watch,
  Ref as RefType
} from '@vue/composition-api'

import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'

export default createComponent({
  name: 'PreviewToolbar',
  components: {
    Button,
    CarbonIcon
  },
  setup (props, { emit }) {
    const selected = ref(1000)
    const repeated = ref(true)

    const DURATION_MAX = 10000
    const DURATION_MIN = 100

    const onToggleRepeat = () => {
      repeated.value = !repeated.value
    }

    const onFocusRun = () => {
      emit('focus-run')
    }

    const onDurationUp = () => {
      selected.value = Math.min(DURATION_MAX, selected.value + 100)
    }

    const onDurationDown = () => {
      selected.value = Math.max(DURATION_MIN, selected.value - 100)
    }

    watch(() => selected.value, (newVal) => {
      emit('change-duration', Number(newVal))
    })

    watch(() => repeated.value, (newVal) => {
      emit('change-repeat', newVal)
    })

    return {
      DURATION_MAX,
      DURATION_MIN,
      selected,
      repeated,
      onToggleRepeat,
      onFocusRun,
      onDurationUp,
      onDurationDown
    }
  }
})
</script>

<style lang="scss" scoped>
.s-toolbar {
  display: flex;
  padding-top: var(--size-25);
  padding-left: var(--size-25);
  padding-right: var(--size-25);
}

.s-toolbar_speed {
  border-radius: var(--radius-base) 0 0 var(--radius-base);

  .s-icon {
    stroke-width: 1;
  }
}

.s-toolbar_speedControl {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: var(--btn-height);

  &::v-deep .s-button {
    height: calc(50% - 2px);
    line-height: 1;
    padding-left: 1.2rem;
    padding-right: 1.2rem;

    .s-icon {
      stroke-width: 1.5;
    }
  }

  &::v-deep .s-button.-down {
    border-radius: 0 0 var(--radius-base) 0;
  }

  &::v-deep .s-button.-up {
    border-radius: 0 var(--radius-base) 0 0;
  }
}
</style>
