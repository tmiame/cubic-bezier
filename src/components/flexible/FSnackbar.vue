<script>
import eventemitter from '@/plugins/eventemitter'

export default {
  name: 'FSnackbar',
  model: {
    prop: 'active'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'normal',
          'success',
          'error',
          'warning'
        ].includes(value)
      }
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
        const inner = this.$createElement('span', {
          staticClass: 's-snackbar_inner'
        }, [
          this.$slots.default
        ])

        return this.$createElement('div', {
          staticClass: 's-snackbar',
          props: {
            id: this._uid
          },
          class: [
            `--${this.theme}`
          ]
        }, [
          inner
        ])
      }
    },
    onClick () {
      this.isActive = !this.isActive
    }
  },
  render (h) {
    return h('div')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/import.scss';

.s-snackbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--zindex-popover);
  overflow: hidden;
  text-align: center;
  pointer-events: none;
  padding: var(--size-20);
}

.s-snackbar_inner {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  padding: var(--size-10) var(--size-30);
  border-radius: 50px;
  background-color: var(--c-primary);
  color: var(--text-primary-inverse);

  &::v-deep .s-icon {
    margin-right: var(--space-2);
    font-size: 1.25rem;
  }
}
</style>
