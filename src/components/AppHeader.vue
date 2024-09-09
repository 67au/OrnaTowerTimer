<script setup lang="ts"></script>

<template>
  <header>
    <var-app-bar elevation fixed safe-area-top z-index="500">
      <var-link to="/" text-color="#fff" underline="none" text-size="16">
        {{ title }}
      </var-link>
      <template #right>
        <var-space justify="flex-end" size="mini">
          <slot name="right" />
        </var-space>
      </template>
    </var-app-bar>
  </header>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>
