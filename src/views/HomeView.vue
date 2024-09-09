<script setup lang="ts">
import {
  getTowerFloors,
  getTowerFloorsInNextDays,
  type Floors,
  type Floor,
  type CheckPointFloors
} from '@/plugins/tower-timer'
import { defineComponent } from 'vue'
import { i18n } from '@/i18n'
import { store } from '@/stores'
</script>

<template>
  <var-card
    class="card"
    v-for="(tower, index) in towerFloors"
    :key="tower.kind"
    layout="row"
    elevation="3"
    ripple
    @click="towerFloating[index] = true"
  >
    <template #image>
      <var-image class="titan" :width="100" :height="100" :src="getOrnaTitanIconUrl(tower.kind)" />
    </template>
    <template #title>
      <var-space justify="space-between" size="0">
        <div class="titan-card-title">
          {{ $t(tower.kind) }}
        </div>
        <var-space justify="flex-end" class="pt-0.5 pr-1.5 relative">
          <var-chip size="mini">
            <var-icon name="calendar-month-outline" size="16" />
          </var-chip>
        </var-space>
      </var-space>
    </template>
    <template #subtitle>
      <div class="titan-card-subtitle">
        <template v-if="isEn">
          <br />
        </template>
        <template v-else>
          {{ firstUpperCase(tower.kind) }}
        </template>
      </div>
    </template>
    <template #description>
      <var-divider />
      <div class="titan-card-description">
        <var-progress
          :type="tower.floor >= 45 ? 'danger' : 'success'"
          :line-width="8"
          :value="towerProgress[index]"
          label
          label-class="progress-label"
        >
          <div class="text-size-lg">
            {{ tower.floor }}
          </div>
        </var-progress>
      </div>
    </template>
  </var-card>
  <template v-for="(tower, index) in towerFloors" :key="tower.kind">
    <var-popup :default-style="false" v-model:show="towerFloating[index]" :lock-scroll="true">
      <var-paper class="p-3" radius="12px">
        <var-space class="pb-2 w-80vw max-w-sm" justify="space-between" align="center">
          <var-chip type="primary" elevation="3">
            <template #left>
              <var-icon name="calendar-month-outline" />
            </template>
            {{ $t(tower.kind) }}
          </var-chip>
          <var-space justify="flex-end" size="small">
            <var-link :href="getTitanYAOCUrl(tower.kind)" target="_blank" underline="none">
              <var-button type="info" size="mini" round>
                <var-icon name="information-outline" size="16" />
              </var-button>
            </var-link>
            <var-button type="danger" size="mini" round @click="towerFloating[index] = false">
              <var-icon name="window-close" size="16" />
            </var-button>
          </var-space>
        </var-space>
        <var-table :elevation="3" scroller-height="70vh">
          <thead>
            <tr class="top-0 sticky">
              <th>Local Time</th>
              <th>Floors</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: var(--color-disabled)">
              <th>{{ currentTime.toLocaleString() }}</th>
              <th>{{ tower.floor }}</th>
            </tr>
            <tr v-for="(towerDay, day) in towerFloorsInNextDays" :key="day">
              <template
                v-if="
                  !(
                    towerDay['floors'][index]['kind'] != 'prometheus' &&
                    towerDay['time'].getUTCHours() == 0
                  )
                "
              >
                <th>{{ towerDay['time'].toLocaleString() }}</th>
                <th>{{ towerDay['floors'][index]['floor'] }}</th>
              </template>
            </tr>
          </tbody>
        </var-table>
      </var-paper>
    </var-popup>
  </template>
</template>

<script lang="ts">
const ornaUrl = 'https://playorna.com'

export default defineComponent({
  props: {
    timestamp: {
      type: Number
    }
  },
  mounted() {
    watch(
      () => this.timestamp,
      () => {
        if (typeof this.timestamp === 'number') {
          if (Number.isNaN(this.timestamp)) {
            store.flag = 0
            this.$router.replace({name: 'home'})
          } else {
            store.setTime(this.timestamp)
          }
        } else {
          store.flag = 1
        }
      },
      { immediate: true }
    )
    this.towerFloors = getTowerFloors(this.currentTime)
    this.towerFloating = new Array(this.towerFloors.length).fill(false)
    this.towerFloorsInNextDays = getTowerFloorsInNextDays(this.currentTime, this.towerDays)
  },
  data() {
    return {
      towerDays: 7,
      towerFloors: [] as Floors,
      towerFloating: [] as Array<boolean>,
      towerFloorsInNextDays: [] as Array<CheckPointFloors>
    }
  },
  computed: {
    currentTime() {
      return store.time
    },
    towerProgress() {
      return this.towerFloors.map((tower: Floor) => {
        return Math.floor(((tower.floor - 15 + 1) * 100) / 36)
      })
    },
    isEn() {
      return i18n.global.locale.value === 'en'
    }
  },
  methods: {
    getTitanYAOCUrl(titan: string) {
      return `https://codex.fqegg.top/#/codex/bosses/titan-${titan}/`
    },
    getOrnaTitanIconUrl(titan: string) {
      return `${ornaUrl}/static/img/bosses/titan_${titan}.png`
    },
    firstUpperCase(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
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
  font-size: 18px;
  padding: var(--card-title-padding);
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

.titan {
  background: transparent url('https://playorna.com/static/img/fx/superboss.png') 50% 50% no-repeat;
  background-size: 130%;
  padding: 2px 2px 2px 2px;
  image-rendering: pixelated;
  background-color: #a0a0a0a0;
}
</style>
