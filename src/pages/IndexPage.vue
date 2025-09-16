<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-pa-sm q-ml-lg">
      <q-scroll-area style="height: 80vh; width: 300px">
        <q-input class="col" v-for="i in 100" :key="i" v-model="model" />
      </q-scroll-area>
    </q-card>
    <div class="column col q-px-xl">
      <div class="row items-center q-gutter-x-lg">
        <level-card />
        <ability-score-card
          class="col"
          :stats="[
            {
              name: 'SIZE',
              value: 'Medium',
            },
            {
              name: 'SPEED',
              value: '35ft.',
            },
            {
              name: 'STR',
              value: '+3',
            },
            {
              name: 'DEX',
              value: '+1',
            },
            {
              name: 'CON',
              value: '+1',
            },
            {
              name: 'INT',
              value: '+0',
            },
            {
              name: 'WIS',
              value: '+0',
            },
            {
              name: 'CHA',
              value: '+0',
            },
          ]"
        />
        <hp-card />
      </div>
      <gear-card class="q-mt-lg" />
    </div>
  </q-page>
</template>

<script lang="ts">
import AbilityScoreCard from 'src/components/AbilityScoreCard.vue';
import GearCard from 'src/components/GearCard.vue';
import HpCard from 'src/components/HpCard.vue';
import LevelCard from 'src/components/LevelCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',

  components: { AbilityScoreCard, HpCard, GearCard, LevelCard },

  data() {
    return {
      model: 'hello',
    };
  },
});
</script>
