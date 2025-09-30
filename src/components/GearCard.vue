<template>
  <q-card class="column">
    <q-tabs v-model="tab" dense align="justify">
      <q-tab name="weapons" label="Weapons" />
      <q-tab name="defense" label="Defense" />
      <q-tab name="gear" label="Gear" />
      <q-tab name="spells" label="Spells" />
      <q-tab name="details" label="Details" />
      <q-tab name="feats" label="Feats" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated swipeable class="col-grow">
      <q-tab-panel name="weapons">
        <weapons-page style="height: 100%" />
      </q-tab-panel>
      <q-tab-panel name="defense">
        <gear-page-not-implemented />
      </q-tab-panel>
      <q-tab-panel name="gear">
        <gear-page-not-implemented />
      </q-tab-panel>
      <q-tab-panel name="spells">
        <gear-page-not-implemented />
      </q-tab-panel>
      <q-tab-panel name="details">
        <gear-page-not-implemented />
      </q-tab-panel>
      <q-tab-panel name="feats">
        <features-page />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GearPageNotImplemented from './gear-pages/GearPageNotImplemented.vue';
import WeaponsPage from './gear-pages/weapons-page/WeaponsPage.vue';
import FeaturesPage from './gear-pages/features-page/FeaturesPage.vue';

export default defineComponent({
  name: 'GearCard',

  components: { GearPageNotImplemented, WeaponsPage, FeaturesPage },

  data() {
    return {
      tab: 'weapons',
    };
  },
});
</script>
