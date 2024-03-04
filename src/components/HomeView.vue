<script setup lang="ts">
import { getTowerFloors, getTowerFloorsInNextDays } from '@/plugins/tower-timer';
import { defineComponent } from 'vue';
import { i18n } from '@/i18n';
</script>

<template>
  <main>
    <div class="container">
      <var-card class="card" v-for="tower, index in towerFloors" :key="tower.kind" layout="row" elevation="3" ripple
        @click="towerFloating[index] = true">
        <template #image>
          <var-image class="titan" :width="100" :height="100" :src="getOrnaTitanIconUrl(tower.kind)" />
        </template>
        <template #title>
          <div class="titan-card-title">
            <var-space justify="space-between">
              <span>
                {{ $t(tower.kind) }}
              </span>
            </var-space>
          </div>
        </template>
        <template #subtitle>
          <div class="titan-card-subtitle">
            <template v-if="isEn">
              <br>
            </template>
            <template v-else>
              {{ tower.kind.charAt(0).toUpperCase() + tower.kind.slice(1) }}
            </template>
          </div>
        </template>
        <template #description>
          <var-divider />
          <div class="titan-card-description">
            <var-progress :type="tower.floor >= 45 ? 'danger' : 'success'" :line-width="8" :value="towerProgress[index]"
              label label-class="progress-label">
              <span style="font-size: 18px;">
                {{ tower.floor }}
              </span>
            </var-progress>
          </div>
        </template>
      </var-card>
      <template v-for="tower, index in towerFloors" :key="tower.kind">
        <var-overlay v-model:show="towerFloating[index]" :lock-scroll="true">
          <var-paper class="popup-content">
            <var-space style="padding-bottom: 4px;" justify="space-between" align="center">
              <div style="font-size: 18px; ">
                {{ $t(tower.kind) }}
              </div>
                <var-link :href="getTitanYAOCUrl(tower.kind)" target="_blank" underline="none">
                <var-button size="small" type="primary">
                  {{ $t('yaco') }}
                </var-button>
                </var-link>
            </var-space>
            <var-table :elevation="3" class="timer-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Floors</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: var(--color-disabled);">
                  <th>{{ displayTime }}</th>
                  <th>{{ tower.floor }}</th>
                </tr>
                <tr v-for="towerDay, day in towerFloorsInNextDays" :key="day">
                  <template
                    v-if="!(towerDay['floors'][index]['kind'] != 'prometheus' && towerDay['time'].getUTCHours() == 0)">
                    <th>{{ towerDay['time'].toLocaleString() }}</th>
                    <th>{{ towerDay['floors'][index]['floor'] }}</th>
                  </template>
                </tr>
              </tbody>
            </var-table>
          </var-paper>
        </var-overlay>
      </template>
    </div>
  </main>
</template>

<script lang="ts">
const ornaUrl = 'https://playorna.com';

export default defineComponent({
  mounted: function () {
    this.towerFloors = getTowerFloors(this.time);
    this.towerFloating = new Array(this.towerFloors.length).fill(false);
    this.towerFloorsInNextDays = getTowerFloorsInNextDays(this.time, this.towerDays);
  },
  data() {
    return {
      time: new Date(),
      towerDays: 7,
      towerFloors: [] as Array<any>,
      towerFloating: [] as Array<boolean>,
      towerFloorsInNextDays: [] as Array<any>,
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
    isEn() {
      return i18n.global.locale.value === 'en';
    }
  },
  methods: {
    getTitanYAOCUrl(titan: string) {
      return `https://codex.fqegg.top/#/codex/bosses/titan-${titan}/`
    },
    getOrnaTitanIconUrl(titan: string) {
      return `${ornaUrl}/static/img/bosses/titan_${titan}.png`
    },
  }
})
</script>

<style>
:root {
  --card-max-width: 320px;
  --card-min-width: 280px;
}

/* card */
.card {
  height: 100px;
  max-width: var(--card-max-width);
  min-width: var(--card-min-width);
  margin-bottom: 4px;
}

.titan-card-title {
  color: var(--card-title-color);
  /* font-size: var(--card-title-font-size); */
  font-size: 18px;
  padding: var(--card-title-padding);
  /* margin: var(--card-title-margin); */
  margin: 8px 0 0 0;
}

.titan-card-subtitle {
  color: var(--card-subtitle-color);
  font-size: var(--card-subtitle-font-size);
  padding: var(--card-subtitle-padding);
  margin: 0 0 0 0;
}

.titan-card-description {
  color: var(--card-description-color);
  font-size: var(--card-description-font-size);
  padding: var(--card-description-padding);
  margin: -4px 0 0 0;
}

@media screen and (max-width: 636px) {

  /* 针对手机设备的样式 */
  .container {
    display: table;
    margin: 0 auto;
  }

  /* Card Layout */
  .container>.var-card {
    break-inside: avoid;
    margin: 0 auto;
    margin-bottom: 4px;
    min-width: var(--card-min-width);
    width: 75vw;
    max-width: var(--card-max-width);
  }
}

@media screen and (min-width: 636px) {

  /* 针对平板设备的样式 */
  .container {
    margin: 0 auto;
    min-width: 79vw;
    max-width: 90vw;
    column-count: 2;
    column-width: 40vw;
    column-gap: 4px;
    column-fill: balance-all;
  }

  .container>.var-card {
    break-inside: avoid;
    margin: 0 auto;
    margin-bottom: 4px;
    min-width: var(--card-min-width);
    width: vw;
    max-width: var(--card-max-width);
  }
}

@media screen and (min-width: 768px) {

  /* 针对桌面设备的样式 */
  .container {
    margin: 0 auto;
    min-width: 660px;
    max-width: 700px;
    column-count: 2;
    column-width: 40px;
    column-gap: 2px;
    column-fill: balance-all;
  }
}

.titan {
  background: transparent url("https://playorna.com/static/img/fx/superboss.png") 50% 50% no-repeat;
  background-size: 130%;
  padding: 2px 2px 2px 2px;
  image-rendering: pixelated;
  background-color: #a0a0a0a0;
}

.timer-table {
  overflow-y: auto;
  max-height: 75vh;
  white-space: nowrap;
}

.popup-content {
  max-height: 90vh;
  padding: 12px;
  width: 85vw;
  max-width: 375px;
  border-radius: 10px;
}
</style>