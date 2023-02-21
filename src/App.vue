<template>
  <div class="layout">
    <AppHeader title="Tower of Olympia" />
    <var-card layout="row">
      <template #title>
        <var-cell>
          <var-row justify="space-between" align="center">
            <var-col span="12" style="font-size: 18px;">
              Tower
            </var-col>
            <var-col span="12" justify="flex-end">
              <var-chip size="small">
                {{ displayTime }}
              </var-chip>
            </var-col>
          </var-row>
        </var-cell>
      </template>
      <template #description>
        <var-cell v-for="tower in towerFloors" border>
          <template #icon>
            <var-avatar :round="false" color="#00000000"
              :src="'https://playorna.com/static/img/bosses/titan_' + tower.kind + '.png'" style="image-rendering: pixelated;"
              :size="48" />
          </template>
          <template #default>
            <var-row justify="space-between" align="center">
              <var-col :span="10" offset="2">
                {{ tower.kind.charAt(0).toUpperCase() + tower.kind.slice(1) }}
              </var-col>
              <var-col :span="12" style="justify-content: center; display: flex;">
                <var-chip :round="false" type="danger" v-if="tower.floor==50">
                  {{ tower.floor }}
                </var-chip>
                <var-chip plain :round="false" type="primary" v-if="tower.floor!=50">
                  {{ tower.floor }}
                </var-chip>
              </var-col>
            </var-row>
          </template>
          <!-- <template #extra>
            <var-icon name="information-outline" :size="20"/>
          </template> -->
        </var-cell>
      </template>
    </var-card>
  </div>
</template>

<script>
import { getTowerFloors } from './plugins/tower-timer.js'

export default {
  mounted: function() {
    this.towerFloors = getTowerFloors(this.time)
  },
  data() {
    return {
      time: new Date(),
      towerFloors: [],
    }
  },
  computed: {
    displayTime() {
      return this.time.toLocaleString()
    }
  }
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
  padding: 70px 16px;
  overflow-y: auto;
  height: 100vh;
}
</style>