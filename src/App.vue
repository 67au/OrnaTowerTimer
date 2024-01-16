<template>
  <div class="layout">
    <AppHeader title="Tower of Olympia" />
    <var-space justify="space-around" size="large">
      <var-card v-for="tower, index in towerFloors" :key="tower.kind" layout="row" elevation="3" class="card" ripple
        @click="towerFloating[index] = true">
        <template #image>
          <var-image :round="false" :src="'https://playorna.com/static/img/bosses/titan_' + tower.kind + '.png'"
            width="100px" height="100px" fit="contain" class="superboss" />
        </template>
        <template #title>
          <div class="card-title">
            {{ tower.kind.charAt(0).toUpperCase() + tower.kind.slice(1) }}
          </div>
        </template>
        <template #subtitle>
          <div class="card-subtitle">
            {{ names[index] }}
          </div>
        </template>
        <template #description>
          <var-divider />
          <div class="card-description">
            <var-progress :type="tower.floor >= 45 ? 'danger' : 'success'" :line-width="8"
              :value="towerProgress[index]" label label-class="progress-label">
              {{ tower.floor }}
            </var-progress>
          </div>
        </template>
      </var-card>
    </var-space>
  </div>
  <div>
    <template v-for="tower, index in towerFloors" :key="tower.kind">
      <var-overlay v-model:show="towerFloating[index]" :lock-scroll="true">
        <div class="popup-content">
          <div style="font-size: 20px; padding-bottom: 3px;">
            {{ tower.kind.charAt(0).toUpperCase() + tower.kind.slice(1) }}
          </div>
          <var-table :elevation="3">
            <thead>
              <tr>
                <th>Time</th>
                <th>Floors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{{ displayTime }}</th>
                <th>{{ tower.floor }}</th>
              </tr>
              <tr v-for="towerDay in towerFloorsInNextDays">
                <template
                  v-if="!(towerDay['floors'][index]['kind'] != 'prometheus' && towerDay['time'].getUTCHours() == 0)">
                  <th>{{ towerDay['time'].toLocaleString() }}</th>
                  <th>{{ towerDay['floors'][index]['floor'] }}</th>
                </template>
              </tr>
            </tbody>
          </var-table>
        </div>
      </var-overlay>
    </template>
  </div>
</template>

<script setup>
const names = ['塞勒涅', '厄俄斯', '俄刻阿诺斯', '忒弥斯', '普罗米修斯'];
</script>

<script>
import { getTowerFloors, getTowerFloorsInNextDays } from './plugins/tower-timer.js';

export default {
  mounted: function () {
    this.towerFloors = getTowerFloors(this.time);
    this.towerFloating = new Array(this.towerFloors.length).fill(false);
    this.towerFloorsInNextDays = getTowerFloorsInNextDays(this.time, this.towerDays);
  },
  data() {
    return {
      time: new Date(),
      towerDays: 7,
      towerFloors: [],
      towerFloating: [],
      towerFloorsInNextDays: [],
    }
  },
  computed: {
    displayTime() {
      return this.time.toLocaleString();
    },
    towerProgress() {
      return this.towerFloors.map((tower) => {
        return Math.floor((tower.floor - 15 + 1) * 100 / 36);
      });
    },
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

.card {
  height: 100px;
  width: 262px;
  --card-footer-bottom: 50px;
  --card-footer-right: 9px;
}

.card-title {
  color: var(--card-title-color);
  font-size: var(--card-title-font-size);
  padding: var(--card-title-padding);
}

.card-subtitle {
  color: var(--card-subtitle-color);
  font-size: var(--card-subtitle-font-size);
  padding: var(--card-subtitle-padding);
}

.card-description {
  color: var(--card-description-color);
  font-size: var(--card-description-font-size);
  padding: var(--card-description-padding);
  margin: -3px 0;
}

.progress-label {
  font-size: 20px;
}

.popup-content {
  padding: 16px 16px;
  width: 310px;
  height: min-content;
  max-height: 90%;
  overflow-y: auto;
  background: var(--button-default-color);
}

.superboss {
  background: transparent url("https://playorna.com/static/img/fx/superboss.png") 50% 50% no-repeat;
  background-size: 130%;
  padding: 2px 2px 2px 2px;
  image-rendering: pixelated;
  background-color: #a0a0a0a0;
}
</style>