<script>
import eventemitter from '@/plugins/eventemitter'

export default {
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
      this.vnodeFragments,
      this.$slots.default
    ])
  }
}
</script>
