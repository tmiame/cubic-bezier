<template>
  <div class="s-card">
    <figure>
      <DotSnapshot class="s-card_snapshot" :value="cubicBezier" />
      <BezierLine class="s-card_bezierLine" :value="cubicBezier" />
      <figcaption class="s-card_title" v-text="cubicBezier" />
    </figure>

    <div class="s-card_actions">
      <Button class="s-card_action u-mr-1" type="button" @click.native="onOpenDialog">
        <template #beforeIcon>
          <CarbonIcon name="copy" />
        </template>
        Copy
      </Button>
      <Button class="s-card_action u-ml-1" type="router" :to="{ name: 'home', hash: cubicBezierToString }">
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
import { createComponent, computed, ref } from '@vue/composition-api'

import FDialog from '@/components/flexible/FDialog.vue'
import CopyDialog from '@/components/generator/CopyDialog.vue'
import BezierLine from '@/components/HelloWorld.vue'
import DotSnapshot from '@/components/DotSnapshot.vue'
import Button from '@/components/base/Button.vue'
import CarbonIcon from '@/components/base/CarbonIcon.vue'

export default createComponent({
  name: 'ExploreCard',
  components: {
    FDialog,
    CopyDialog,
    BezierLine,
    DotSnapshot,
    Button,
    CarbonIcon
  },
  props: {
    cubicBezier: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)

    const cubicBezierToString = computed(() => {
      return `#${props.cubicBezier.join(',')}`
    })

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
      onCopyDialogClose
    }
  }
})
</script>

<style lang="scss" scoped>
.s-card {
  padding-top: var(--size-40);
  padding-left: var(--size-25);
  padding-right: var(--size-25);
  padding-top: var(--size-40);
  padding-bottom: var(--size-30);
  position: relative;
  text-align: center;
  background-color: var(--general-background-a);
}

.s-card figure {
  position: relative;
  margin-bottom: var(--size-30);
}

.s-card_bezierLine {
  width: 100%;
  margin-top: -5%;
  margin-bottom: -10%;
}

.s-card_snapshot {
  width: ((100% / 6 * 4) + (100% * 0.2));
  margin: 0 auto;
  height: 2rem;
}

.s-card_title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-black);
  letter-spacing: -0.05em;
}

.s-card_actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.s-card_action {
  width: (100% / 2);
  text-align: center;
}
</style>
