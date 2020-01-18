<script>
import eventemitter from '@/plugins/eventemitter'
import Snackbars from '@/components/Snackbars.vue'

export default {
  components: {
    Snackbars
  },
  data () {
    return {
      fragments: []
    }
  },
  computed: {
    vnodeFragments () {
      return this.fragments.map((vnode) => {
        return vnode
      })
    }
  },
  created () {
    eventemitter.on('add-root-vnoce', this.addFragment)
    eventemitter.on('remove-root-vnode', this.removeFragment)
  },
  methods: {
    addFragment (vnode = null) {
      if (vnode) {
        this.fragments.push(vnode)
      }
    },
    removeFragment (uid = null) {
      if (uid) {
        this.fragments = this.fragments.filter((vnode) => {
          const props = vnode.data.props || false
          return props && props.id !== uid
        })
      }
    }
  },
  render (h) {
    return h('div', [
      h('Snackbars'),
      this.vnodeFragments,
      this.$slots.default
    ])
  }
}
</script>
