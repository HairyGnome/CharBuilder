<template>
  <q-card class="row q-gutter-x-lg q-pr-lg q-py-sm justify-center col-auto">
    <div class="column items-center" v-for="(stat, idx) in stats" :key="idx">
      <div class="row justify-center">
        <q-img v-if="stat.icon" :src="stat.icon" />
        <span>{{ stat.name }}</span>
      </div>
      <div>{{ stat.value }}</div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Stat } from '../types.js';

export default defineComponent({
  name: 'AbilityScoreCard',

  props: {
    stats: {
      type: Array<Stat>,
      required: true,
    },
  },
});
</script>
