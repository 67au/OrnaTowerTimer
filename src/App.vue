<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppLocaleSwitch from '@/components/AppLocaleSwitch.vue';
import AppThemeSwitch from '@/components/AppThemeSwitch.vue';
import AppGithub from '@/components/AppGithub.vue';
import { useDark } from '@/styles';

useDark();
</script>

<template>
  <div class="layout" id="main">
    <AppHeader :title="$t('title')">
      <template #right>
        <AppLocaleSwitch />
        <AppThemeSwitch />
        <AppGithub link="https://github.com/67au/OrnaTowerTimer" />
      </template>
    </AppHeader>
    <component :is="'HomeView'" />
  </div>
</template>

<script lang="ts">
export default {
  components: {
    HomeView: defineAsyncComponent(() => import('@/components/HomeView.vue')),
  },
}
</script>
  
<style>
* {
  box-sizing: border-box;
}

body {
  transition: background-color 0.25s, color 0.25s;
  color: var(--color-text);
  background-color: var(--color-body);
  overflow: hidden;
  margin: 0;
}

.layout {
  padding: 70px 3px;
  overflow-y: auto;
  height: 100vh;
}
</style>