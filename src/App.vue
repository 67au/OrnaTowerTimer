<script setup lang="ts">
import MainLayout from '@/pages/MainLayout.vue';
import { useDark } from '@/styles'

useDark()
</script>

<template>
  <AppHeader :title="$t('title')">
    <template #right>
      <TowerAlarm />
      <AppLocaleSwitch />
      <AppThemeSwitch />
      <AppGithub link="https://github.com/67au/OrnaTowerTimer" />
    </template>
  </AppHeader>

  <MainLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </MainLayout>
</template>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  transition:
    background-color 0.25s,
    color 0.25s;
  color: var(--color-text);
  background-color: var(--color-body);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  margin-left: calc(100vw - 100%);
}
</style>
