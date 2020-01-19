<template>
  <component
    :is="tagName"
    :to="isRouterLink ? to : ''"
    :type="isButton ? 'button' : ''"
    :class="[
      {
        '--disabled': disabled,
        '--light': light,
        '--fab': fab,
        '--block': block,
      },
      `--${theme}`,
      `--${type}`
    ]"
    class="s-button"
  >
    <template v-if="fab">
      <span class="s-button_fabIcon" aria-hidden="true">
        <slot name="default" />
      </span>
    </template>
    <template v-else-if="type ==='select'">
      <span v-if="$slots.beforeIcon" class="s-button_beforeIcon -icon" aria-hidden="true">
        <slot name="beforeIcon" />
      </span>
      <slot name="default" />
    </template>
    <template v-else>
      <span v-if="$slots.beforeIcon" class="s-button_beforeIcon -icon" aria-hidden="true">
        <slot name="beforeIcon" />
      </span>
      <div class="s-button_title">
        <slot name="default" />
      </div>
    </template>
  </component>
</template>

<script>
export default {
  props: {
    fab: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'router',
      validator: value => [
        'router',
        'link',
        'button',
        'select'
      ].indexOf(value) !== -1
    },
    theme: {
      type: String,
      default: 'base',
      validator: value => [
        'base',
        'primary',
        'secondary',
        'info',
        'warning',
        'danger'
      ].indexOf(value) !== -1
    },
    to: {
      type: [String, Object],
      default: '/'
    }
  },

  computed: {
    /**
     * @return {string}
     */
    tagName () {
      return (this.type === 'router') ? 'router-link'
        : (this.type === 'select') ? 'span'
          : (this.type === 'link') ? 'a'
            : 'button'
    },
    /**
     * @return {string}
     */
    isRouterLink () {
      return this.type === 'router'
    },
    /**
     * @return {string}
     */
    isButton () {
      return this.type === 'button'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.s-button {
  // <button> reset
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
  border-radius: var(--radius-base);

  // base style
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
  font-size: var(--btn-font-size);
  font-weight: var(--font-weight-base);
  height: var(--btn-height);
  padding: 0 1.5rem;

  &:any-link {
    color: currentColor;
    text-decoration: none;
  }

  svg {
    color: currentColor;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 0;
  }
}

// Disabled button
.s-button.--disabled {
  background-color: rgba(#000000, 0.025);
  color: rgba(#000000, 0.25);
  pointer-events: none;
  box-shadow: none;
  cursor: default;
}

// Select button hack
.s-button select {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  outline: 0;
  appearance: none;
  border: 0 solid transparent;
  box-shadow: none;
  -moz-appearance: textfield;
  cursor: pointer;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.s-button {
  &:focus {
    outline: 0;
    border-color: #0070c9;
    box-shadow: 0 0 0 3px rgba(131,192,253,0.5);
  }
}

.s-button_title {
  max-width: 20em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// ===========================================
// button > before icon
// ===========================================
.s-button_beforeIcon {
  margin-right: var(--space-2);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: -0.25rem;
  font-size: 1.25rem;

  &::v-deep svg,
  svg {
    font-size: 1.25rem;
    stroke-width: 0.5;
  }
}

// ===========================================
// button > fab icon
// ===========================================
.s-button_fabIcon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

// ===========================================
// style
// ===========================================
.s-button:not(.--light):not(.--disabled) {
  box-shadow: 0 1px 3px 0 rgba(14, 30, 37, 0.05);
}

.s-button:not(.--disabled).--base {
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

.s-button:not(.--disabled).--primary {
  color: var(--text-primary-inverse);
  background-color: var(--c-secondary);
  border: 1px solid rgba(0,0,0,0.1);

  html[dark] & {
    color: var(--text-primary);
  }

  @include FR_HOVER {
    background-color: var(--c-secondary-active);
  }

  &:focus {
    border-color: #0070c9;
    box-shadow: 0 0 0 3px rgba(131,192,253,0.5);
  }
}
</style>
