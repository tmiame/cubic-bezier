<script>
// activator参考
// https://jp.vuejs.org/v2/guide/render-function.html
// https://github.com/vuetifyjs/vuetify/blob/1b4dbae58cbfdeda4edbc14104a53ce9c0a36f62/packages/vuetify/src/components/VMenu/mixins/menu-generators.js#L22
// https://stackoverflow.com/questions/55188478/meaning-of-v-slotactivator-on/55194478
// https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt.js
// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VMenu/VMenu.ts
// https://teratail.com/questions/196228
// https://qiita.com/kazupon/items/2cc9a3427f468866d6dd
export default {
  name: 'FMenu',
  data() {
    return {
      isActive: false
    }
  },
  // mounted() {
  //   this.$eventEmitter.emit('add-root-vnoce', this.getRootContent())
  // },
  beforeDestroy() {
    this.$eventEmitter.emit('remove-root-vnode', this._uid)
  },
  methods: {
    getRootContent() {
      if (this.isActive) {
        return this.$createElement('div', {
          props: {
            root: true,
            id: this._uid,
          }
        },[
          this.$slots.default
        ])
      }
    },
    genActivator() {
      const listeners = {
        click: this.onClick
      }

      const activator = this.$scopedSlots.activator({ on: listeners })

      return activator
    },
    onClick() {
      this.isActive = !this.isActive

      if (this.isActive) {
        this.$eventEmitter.emit('add-root-vnoce', this.getRootContent())
      } else {
        this.$eventEmitter.emit('remove-root-vnode', this._uid)
      }
    }
  },
  render(h) {
    const data = {
      staticClass: 's-menu',
      class: {
        's-menu--active': this.isActive
      },
    }

    return h('div', data, [
      this.genActivator()
    ])
  },
}
</script>
