import {
  toRefs,
  computed,
  reactive
} from '@vue/composition-api'

type TCubicBezier = number[];

type TState = {
  cubicBezier: TCubicBezier,
  compareCubicBezier: TCubicBezier,
}

const store = () => {
  const state:TState = reactive({
    cubicBezier: [1, 0, 0, 0.8],
    compareCubicBezier: [0, 0, 1, 1]
  })

  const stateAsRefs = toRefs(state)

  const getters = {
    cubicBezier: computed(():TCubicBezier => stateAsRefs.cubicBezier.value),
    compareCubicBezier: computed(():TCubicBezier => stateAsRefs.compareCubicBezier.value)
  }

  const mutations = {
    SET_CUBIC_BEZIER (value: TCubicBezier): void {
      let [p1, p2, p3, p4] = value

      p1 = Math.min(1, Math.max(p1, 0))
      p3 = Math.min(1, Math.max(p3, 0))

      p2 = Math.min(2, Math.max(p2, -2))
      p4 = Math.min(2, Math.max(p4, -2))

      // console.log('SET_CUBIC_BEZIER', [p1, p2, p3, p4])
      stateAsRefs.cubicBezier.value = [p1, p2, p3, p4]
    },

    SET_COMPARE_CUBIC_BEZIER (value: TCubicBezier): void {
      let [p1, p2, p3, p4] = value

      p1 = Math.min(1, Math.max(p1, 0))
      p3 = Math.min(1, Math.max(p3, 0))

      p2 = Math.min(2, Math.max(p2, -2))
      p4 = Math.min(2, Math.max(p4, -2))

      // console.log('SET_COMPARE_CUBIC_BEZIER', [p1, p2, p3, p4])
      stateAsRefs.compareCubicBezier.value = [p1, p2, p3, p4]
    }
  }

  const actions = {
    updateCubicBezier (value: TCubicBezier): void {
      // console.log('updateCubicBezier', value)
      mutations.SET_CUBIC_BEZIER(value)
    },
    updateCompareCubicBezier (value: TCubicBezier): void {
      // console.log('updateCompareCubicBezier', value)
      mutations.SET_COMPARE_CUBIC_BEZIER(value)
    }
  }

  return {
    ...stateAsRefs,
    getters,
    actions
  }
}

export default store
