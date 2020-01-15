<script>
import eventemitter from '@/plugins/eventemitter'

export default {
  name: 'FDialog',
  model: {
    prop: 'active'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: !!this.active
    }
  },
  watch: {
    active (val) {
      this.isActive = val
    },
    isActive (val) {
      if (val) {
        eventemitter.emit('add-root-vnoce', this.genRootContent())
      } else {
        eventemitter.emit('remove-root-vnode', this._uid)
      }
    }
  },
  mounted () {
    eventemitter.emit('add-root-vnoce', this.genRootContent())
  },
  beforeDestroy () {
    eventemitter.emit('remove-root-vnode', this._uid)
  },
  methods: {
    genRootContent () {
      if (this.isActive) {
        return this.$createElement('div', {
          staticClass: 's-dialog',
          props: {
            id: this._uid
          }
        }, [
          this.$slots.default
        ])
      }
    },
    genActivator () {
      if (!this.$scopedSlots.activator) {
        return null
      }

      const listeners = {
        click: this.onClick
      }

      const activator = this.$scopedSlots.activator({ on: listeners })

      return activator
    },
    onClick () {
      this.isActive = !this.isActive
    }
  },
  render (h) {
    const data = {
      staticClass: 's-dialogActivator',
      class: {
        's-dialogActivator--active': this.isActive
      }
    }

    if (!this.genActivator()) {
      return
    }

    return h('div', data, [
      this.genActivator()
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.s-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(10,10,10,0.9);
  z-index: var(--zindex-modal);
}
</style>
