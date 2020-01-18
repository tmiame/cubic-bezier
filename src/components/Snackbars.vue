<template>
  <div class="s-wrapper" :class="{ '--active': items.length }">
    <transition-group name="vfade" tag="div">
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
          <button class="s-snackbar_close" @click="item.close">
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

.vfade-enter-active,
.vfade-leave-active {
  will-change: opacity;
}

.vfade-enter-to,
.vfade-leave {
  opacity: 1;
  transition: opacity 300ms cubic-bezier(0.41,0.4,0.37,1.25);
}

.vfade-enter,
.vfade-leave-to {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

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
  min-height: 10rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10rem;
    background-image: linear-gradient(rgba(#000000, 0.25), rgba(#000000, 0));
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

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
  align-items: stretch;
  pointer-events: auto;
  padding: var(--size-15) var(--size-30);
  border-radius: 50px;
  background-color: var(--c-primary);
  color: var(--text-primary-inverse);
  backdrop-filter: blur(10px);
}

.s-snackbar_content {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::v-deep .s-icon {
    margin-right: var(--space-2);
    font-size: 1.5rem;
  }
}

.s-snackbar_close {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--size-15);

  &::v-deep .s-icon {
    font-size: 1.5rem;
  }

  @include FR_HOVER() {
    opacity: 0.5;
  }
}
</style>
