<template>
  <div class="s-wrapper" :class="{ '--active': items.length }">
    <transition-group name="vscale" tag="div">
      <div
        v-for="item of items"
        :key="item.id"
        :class="[`--${type}`]"
        class="s-snackbar"
      >
        <div class="s-snackbar_inner">
          <div class="s-snackbar_content">
            <CarbonIcon :name="getIconName(item.type)" />
            <span>{{ item.text || item.id }}</span>
          </div>
          <button v-if="item.timeout === 0" class="s-snackbar_close" @click="item.close">
            <CarbonIcon name="close" />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import CarbonIcon from '@/components/base/CarbonIcon.vue'
import { ESnackbarType } from '@/types'

export default createComponent({
  name: 'snackbars',
  components: {
    CarbonIcon
  },
  setup (props, { root: { $store } }) {
    const getIconName = (type:ESnackbarType) :string => {
      if (type === ESnackbarType.success) {
        return 'status-checkmark'
      }
      if (type === ESnackbarType.warning) {
        return 'status-warning'
      }
      return 'status-unknown'
    }

    return {
      ...$store.snackbar,
      getIconName
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.s-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
  padding: var(--size-20);
  z-index: var(--zindex-popover);
  pointer-events: none;

  &.--active {
    &:before {
      opacity: 1;
    }
  }
}

.s-snackbar {
  position: relative;
  margin-bottom: var(--size-20);
}

.s-snackbar_inner {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--size-10) var(--size-25);
  border-radius: 100px;
  box-shadow: var(--shadow-long);
  background-color: var(--text-primary);
  color: var(--text-primary-inverse);
}

.s-snackbar_content {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::v-deep .s-icon {
    margin-right: var(--space-2);
    font-size: 1.25rem;
  }
}

.s-snackbar_close {
  display: flex;
  margin-left: var(--space-2);
  pointer-events: auto;

  &::v-deep .s-icon {
    font-size: 1.3rem;
  }

  @include FR_HOVER() {
    opacity: 0.5;
  }
}
</style>
