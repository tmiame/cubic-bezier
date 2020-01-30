import { provide, inject, SetupContext } from '@vue/composition-api'
import { TStoreModule } from '@/types'

const key = Symbol('store')

export function provideStore (context: SetupContext) {
  provide(key, context)
}

export default function useStore (moduleKey?:TStoreModule) {
  const context = inject<SetupContext>(key)

  if (!context) {
    throw new Error('Store not provided.')
  }

  if (moduleKey && context.root.$store[moduleKey]) {
    return context.root.$store[moduleKey]
  }

  return context.root.$store
}
