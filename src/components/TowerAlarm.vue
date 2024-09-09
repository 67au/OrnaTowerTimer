<script lang="ts" setup>
import { store } from '@/stores'
import { Snackbar, Button } from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
</script>

<template>
  <var-button
    v-if="store.flag > 1"
    class="app-switch"
    text-color="crimson"
    text
    round
    @click="createWarningSnackbar"
  >
    <var-icon class="app-switch-icon" name="alert-outline" />
  </var-button>
</template>

<script lang="ts">
export default {
  mounted() {
    watch(
      () => store.flag,
      (newValue, oldValue) => {
        if (newValue === 0) {
          this.createDangerSnackbar()
        }
        if (newValue > 1) {
          this.createWarningSnackbar()
        }
      },
      { immediate: true }
    )
  },
  methods: {
    createWarningSnackbar() {
      Snackbar({
        content: `Time: ${store.time.toLocaleString()}`,
        type: 'warning',
        duration: 3000
      })
    },
    createDangerSnackbar() {
      Snackbar({
        content: 'Unix Timestamp Error',
        type: 'error',
        duration: 3000
      })
    }
  }
}
</script>

<style scoped>
.app-time {
  :is(-icon) {
    font-size: var(--font-size-lg);
  }
}
</style>
