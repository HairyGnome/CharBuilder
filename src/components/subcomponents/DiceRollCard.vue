<template>
  <q-card flat class="row text-h6">
    <div v-for="(diceRoll, idx) in roll.rolls" :key="idx">
      <span>{{ diceRoll }}</span>
      <span v-if="idx < roll.rolls.length - 1"> {{ '&nbsp;+&nbsp;' }} </span>
    </div>
    <span> {{ roll.modifier >= 0 ? '&nbsp;+&nbsp;' : '&nbsp;-&nbsp;' }} </span>
    <span>{{ Math.abs(roll.modifier) }}</span>
    <span>{{ '&nbsp;=&nbsp;' }}</span>
    <span>{{ roll.sum }}</span>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Roll } from 'src/models/types';

export default defineComponent({
  name: 'DiceRollCard',

  props: {
    roll: {
      type: Object as () => Roll,
      required: true,
    },
  },
});
</script>
