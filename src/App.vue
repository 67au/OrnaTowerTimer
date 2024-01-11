<template>
  <div class="layout">
    <AppHeader title="Tower of Olympia" />
    <var-space justify="space-around" size="large">
      <var-card v-for="tower, index in towerFloors" :key="tower.kind" layout="row" elevation="3" class="card" ripple
        @click="towerFloating[index] = true">
        <template #image>
          <var-image :round="false" :src="'https://playorna.com/static/img/bosses/titan_' + tower.kind + '.png'"
            width="96px" height="96px" fit="contain" class="superboss" />
        </template>
        <template #title>
          <div class="card-title">
            <var-space justify="space-between">
              {{ tower.kind.charAt(0).toUpperCase() + tower.kind.slice(1) }}
              <var-chip :round="false" type="danger" v-if="tower.floor >= 45">
                {{ tower.floor }}
              </var-chip>
              <var-chip :round="false" type="default" v-if="tower.floor < 45">
                {{ tower.floor }}
              </var-chip>
            </var-space>
          </div>
        </template>
        <template #description>
          <div class="card-description">
            <var-divider />
          </div>
        </template>
        <template #extra>
          <div style="font-size: 13px;">{{ displayTime }}</div>
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
                <template v-if="!(towerDay['floors'][index]['kind'] != 'prometheus' && towerDay['time'].getUTCHours() == 0)">
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

<script>
import { getTowerFloors, getTowerFloorsInNextDays } from './plugins/tower-timer.js'


export default {
  mounted: function () {
    this.towerFloors = getTowerFloors(this.time);
    this.towerFloating = new Array(this.towerFloors.length).fill(false);
    this.towerFloorsInNextDays = getTowerFloorsInNextDays(this.time);
  },
  data() {
    return {
      time: new Date(),
      towerFloors: [],
      towerFloating: [],
      towerFloorsInNextDays: [],
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

.card {
  height: 96px;
  width: 310px;
  --card-footer-bottom: 50px;
  --card-footer-right: 9px;
}

.card-title {
  color: var(--card-title-color);
  font-size: 20px;
  padding: var(--card-title-padding);
  margin: 6px 0;
}

.card-description {
  color: var(--card-description-color);
  font-size: var(--card-description-font-size);
  padding: var(--card-description-padding);
  margin: 27px 0 0 0;
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
  background-size: 140%;
  image-rendering: pixelated;
  background-color: #a0a0a0a0;
}
</style>