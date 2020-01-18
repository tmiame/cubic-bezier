<template>
  <component
    class="s-icon"
    :is="icon"
  />
</template>

<script>
// https://www.ibm.com/design/language/elements/icon-library/
// https://www.npmjs.com/package/@carbon/icons-vue
import IconHome from '@carbon/icons-vue/es/home/32'
import IconSettingsAdjust from '@carbon/icons-vue/es/settings--adjust/32'
import IconCopy from '@carbon/icons-vue/es/copy/32'
import IconDownload from '@carbon/icons-vue/es/download/32'
import IconRepeat from '@carbon/icons-vue/es/repeat/32'
import IconRenew from '@carbon/icons-vue/es/renew/32'
import IconTimer from '@carbon/icons-vue/es/time/32'
import IconAsleepFilled from '@carbon/icons-vue/es/asleep--filled/32'
import IconLightFilled from '@carbon/icons-vue/es/light--filled/32'
import IconCheckmarkFilled from '@carbon/icons-vue/es/checkmark--filled/32'
import IconWarningAltFilled from '@carbon/icons-vue/es/warning--alt--filled/32'
import IconUnknownFilled from '@carbon/icons-vue/es/unknown--filled/32'
import IconErrorFilled from '@carbon/icons-vue/es/error--filled/32'
import IconDraw from '@carbon/icons-vue/es/draw/32'
import IconLaunch from '@carbon/icons-vue/es/launch/32'
import IconCompare from '@carbon/icons-vue/es/compare/32'
import IconClose from '@carbon/icons-vue/es/close/32'

const icons = {
  'home': IconHome,
  'settings-adjust': IconSettingsAdjust,
  'copy': IconCopy,
  'download': IconDownload,
  'repeat': IconRepeat,
  'timer': IconTimer,
  'darkmode': IconAsleepFilled,
  'lightmode': IconLightFilled,
  'renew': IconRenew,
  'status-checkmark': IconCheckmarkFilled,
  'status-warning': IconWarningAltFilled,
  'status-unknown': IconUnknownFilled,
  'draw': IconDraw,
  'launch': IconLaunch,
  'compare': IconCompare,
  'close': IconClose
}

export default {
  props: {
    name: {
      type: String,
      required: true,
      validator (value) {
        return Object.keys(icons).includes(value)
      }
    },
    size: {
      type: Number,
      default: 16
    },
    strokeWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    icon () {
      return icons[this.name]
    },
    sizeUnit () {
      return this.size + 'px'
    }
  }
}
</script>

<style scoped>
.s-icon {
  display: inline-block;
  font-weight: normal;
  font-style: normal;
  font-size: inherit;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 0;
  flex-shrink: 0;
  color: inherit;
  vertical-align: -0.125em;
  width: inherit;
  height: inherit;
  width: 1em;
  height: 1em;
}
</style>
