<template>
  <div class="s-actions">
    <Button type="button" class="u-mx-2" @click.native="onOpenDialog">
      <template #beforeIcon>
        <CarbonIcon name="copy" />
      </template>
      Copy
    </Button>

    <Button type="button" class="u-ml-auto" @click.native="onCompareEdit">
      <template #beforeIcon>
        <CarbonIcon name="compare" />
      </template>
      Compare
    </Button>

    <FDialog v-model="dialog">
      <CopyDialog @close="onCopyDialogClose" />
    </FDialog>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref
} from '@vue/composition-api'

import FDialog from '@/components/flexible/FDialog.vue'
import CopyDialog from '@/components/generator/CopyDialog.vue'
import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'
import { DEFAULT_CUBIC } from '@/constants'
import { TCubic } from '@/types'

type TProps = {
  cubicBezier: TCubic
}

export default createComponent<TProps>({
  name: 'GeneratorActions',
  props: {
    cubicBezier: {
      type: Array,
      required: true,
      default () {
        return DEFAULT_CUBIC
      }
    }
  },
  components: {
    FDialog,
    CopyDialog,
    Button,
    CarbonIcon
  },
  setup (props, { emit }) {
    const dialog = ref(false)

    const onOpenDialog = () => {
      dialog.value = true
    }

    const onCopyDialogClose = () => {
      dialog.value = false
    }

    const onCompareEdit = () => {
      emit('compare-edit')
    }

    return {
      dialog,
      onOpenDialog,
      onCopyDialogClose,
      onCompareEdit
    }
  }
})
</script>

<style lang="scss" scoped>
.s-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
