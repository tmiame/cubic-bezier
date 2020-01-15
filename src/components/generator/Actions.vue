<template>
  <div class="s-actions">
    <Button type="button" class="u-mx-2" @click.native="onOpenDialog">
      <template #beforeIcon>
        <CarbonIcon name="copy" />
      </template>
      Copy
    </Button>

    <!-- <Button type="button" fab class="u-ml-auto u-mr-0">
      <CarbonIcon name="settings-adjust" />
    </Button> -->

    <FDialog v-model="dialog">
      <CopyDialog @close="onCopyDialogClose" />
    </FDialog>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  watch,
  Ref as RefType,
  SetupContext
} from '@vue/composition-api'

import FDialog from '@/components/flexible/FDialog.vue'
import CopyDialog from '@/components/generator/CopyDialog.vue'
import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'

export default createComponent({
  name: 'GeneratorActions',
  components: {
    FDialog,
    CopyDialog,
    Button,
    CarbonIcon
  },
  setup (props, { root: { $store } }:SetupContext) {
    const store = $store.generatorStore
    const cubicBezier = store.getters.cubicBezier
    const dialog = ref(false)

    const onOpenDialog = () => {
      dialog.value = true
    }

    const onCopyDialogClose = () => {
      dialog.value = false
    }

    return {
      dialog,
      onOpenDialog,
      onCopyDialogClose,
      cubicBezier
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
