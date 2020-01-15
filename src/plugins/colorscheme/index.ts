import {
  ref,
  Ref as RefType
} from '@vue/composition-api'

import {
  THEMES
} from '@/constants'

export default function useColorScheme () {
  const colorscheme:RefType<string> = ref(THEMES.light)

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkModeMediaQuery.matches) {
    colorscheme.value = THEMES.dark
  }
  darkModeMediaQuery.addListener((e) => {
    const darkModeOn = e.matches
    colorscheme.value = darkModeOn ? THEMES.dark : THEMES.light
  })

  const onToggleColorscheme = () :void => {
    colorscheme.value = colorscheme.value === THEMES.dark ? THEMES.light : THEMES.dark
    updateMode()
  }

  const updateMode = () :void => {
    if (colorscheme.value === THEMES.dark) {
      document.documentElement.setAttribute('dark', '')
    } else {
      document.documentElement.removeAttribute('dark')
    }
  }

  updateMode()

  return {
    colorscheme,
    onToggleColorscheme
  }
}
