<template>
  <div class="s-card">
    <div
      v-if="title"
      class="s-card_title"
      v-text="title"
    />

    <figure>
      <DotSnapshot class="s-card_snapshot" :value="cubicBezier" :repeat="false" />
      <EaseLine class="s-card_easeline" :value="cubicBezier" />
      <figcaption class="s-card_value" v-text="cubicBezierToString" />
    </figure>

    <div class="s-card_actions">
      <Button small class="s-card_action u-mr-1" type="button" @click.native="onOpenDialog">
        <template #beforeIcon>
          <CarbonIcon name="copy" />
        </template>
        Copy
      </Button>
      <Button small class="s-card_action u-ml-1" type="router" :to="{ name: 'home', hash: `#${cubicBezierToString}` }" @click.native="onEdit">
        <template #beforeIcon>
          <CarbonIcon name="launch" />
        </template>
        Edit
      </Button>
    </div>

    <FDialog v-model="dialog">
      <CopyDialog @close="onCopyDialogClose" />
    </FDialog>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, PropType } from '@vue/composition-api'

import FDialog from '@/components/flexible/FDialog.vue'
import CopyDialog from '@/components/generator/CopyDialog.vue'
import EaseLine from '@/components/HelloWorld.vue'
import DotSnapshot from '@/components/DotSnapshot.vue'
import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'
import useSnackbar from '@/plugins/snackbar'
import { ESnackbarType } from '@/types'

export default createComponent({
  name: 'ExploreCard',
  components: {
    FDialog,
    CopyDialog,
    EaseLine,
    DotSnapshot,
    Button,
    CarbonIcon
  },
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    cubicBezier: {
      type: Array as PropType<number[]>,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)

    const cubicBezierToString = computed(() => {
      return `${props.cubicBezier.join(',')}`
    })

    const { addSnackbar } = useSnackbar()

    const onEdit = () => {
      addSnackbar({
        text: `Edit [${props.cubicBezier}]`,
        type: ESnackbarType.success,
        timeout: 1500
      })
    }

    const onOpenDialog = () => {
      dialog.value = true
    }
    const onCopyDialogClose = () => {
      dialog.value = false
    }

    return {
      dialog,
      cubicBezierToString,
      onOpenDialog,
      onCopyDialogClose,
      onEdit
    }
  }
})
</script>

<style lang="scss" scoped>
.s-card {
  padding-top: var(--size-30);
  padding-bottom: var(--size-30);
  position: relative;
  text-align: center;
  background-color: var(--general-background-a);
}

.s-card_title {
  margin-bottom: var(--size-20);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
  line-height: 0.9;
}

.s-card figure {
  position: relative;
  margin-bottom: var(--size-20);
}

.s-card_easeline {
  width: 100%;
  margin-top: -(100% / 6);
  margin-bottom: -(100% / 6);
}

.s-card_snapshot {
  width: ((100% / 6 * 4) + (100% * 0.2));
  margin: 0 auto;
  height: 1.5rem;
  margin-bottom: var(--size-20);
}

.s-card_value {
  margin-top: var(--size-20);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-bold);
  line-height: 0.9;
}

.s-card_actions {
  padding-left: var(--size-25);
  padding-right: var(--size-25);
  display: flex;
  align-items: center;
}

.s-card_action {
  width: (100% / 2);
}
</style>
