<template>
  <FApp id="app">
    <Header @toggle-colorscheme="onToggleColorscheme" />
    <RouterView />
  </FApp>
</template>

<script>
import { createComponent, ref, provide } from '@vue/composition-api'
import { THEME_SYMBOL } from '@/constants'
import useColorScheme from '@/plugins/colorscheme'
import FApp from '@/components/flexible/FApp.vue'
import Header from '@/components/base/Header.vue'

export default createComponent({
  components: {
    FApp,
    Header
  },
  setup () {
    const { colorscheme, onToggleColorscheme } = useColorScheme()

    provide(THEME_SYMBOL, colorscheme)

    return {
      colorscheme,
      onToggleColorscheme
    }
  }
})
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
