<template>
  <q-card flat class="q-mt-xl">
    <q-card-section class="col q-col-gutter-y-sm justify-center">
      <q-input
        :model-value="amount"
        @update:model-value="setAmount"
        type="number"
        label="Amount"
        :rules="[rules.min(minAmount), rules.max(maxAmount)]"
        outlined
        dense
        class="col"
      />
      <q-select v-model="dice" :options="diceOptions" label="Dice" outlined dense class="col" />
      <q-input
        v-model="modifier"
        label="Modifier"
        type="number"
        outlined
        dense
        class="col q-mt-md"
      />
    </q-card-section>
    <q-card-section class="column">
      <q-card flat bordered>
        <q-scroll-area
          v-if="prevRolls.length > 0"
          style="width: 100%; height: 200px"
          class="column q-gutter-y-sm q-pa-sm"
        >
          <transition-group name="enter-right" tag="div" class="column" appear>
            <div v-for="(roll, idx) in prevRolls" :key="roll.id" class="dice-roll-entry">
              <dice-roll-card :roll="roll" />
              <q-separator v-if="idx < prevRolls.length - 1" class="col" />
            </div>
          </transition-group>
        </q-scroll-area>
        <q-card-section v-else style="width: 100%; height: 200px" class="text-h5 text-center"
          >No rolls here yet...</q-card-section
        >
      </q-card>
      <q-btn label="Clear" color="primary" class="q-mt-sm self-end" @click="clearRolls" />
    </q-card-section>
    <q-card-section class="col justify-center text-center">
      <div class="text-h5">Result</div>
      <div class="text-h3">{{ prevRolls.at(-1)?.sum || '-' }}</div>
    </q-card-section>
    <q-card-section class="row justify-evenly">
      <q-btn label="Roll" @click="roll" color="primary" />
      <q-btn label="Close" color="primary" @click="close" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { rules } from '../utils';
import DiceRollCard from './subcomponents/DiceRollCard.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDiceRollStore } from 'src/stores/dice-roll-store';
import { useUiStore } from 'src/stores/ui-store';

export default defineComponent({
  name: 'DiceRoller',

  components: { DiceRollCard },

  data() {
    return {
      prevRolls: [] as Array<{
        id: string;
        rolls: number[];
        modifier: number;
        sum: number;
      }>,
      diceOptions: [2, 4, 6, 8, 10, 12, 20, 100],
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ['diceRollerShow']),
    ...mapWritableState(useDiceRollStore, ['dice', 'modifier']),
    ...mapState(useDiceRollStore, ['amount', 'minAmount', 'maxAmount']),

    rules() {
      return rules;
    },
  },

  methods: {
    ...mapActions(useDiceRollStore, ['rollDice', 'setAmount']),

    roll() {
      const { rolls, modifier, sum } = this.rollDice();
      // create a compact unique id using timestamp + random suffix
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      this.prevRolls.push({
        id,
        rolls: rolls,
        modifier: modifier,
        sum,
      });
    },

    clearRolls() {
      this.prevRolls = [];
    },

    close() {
      this.diceRollerShow = false;
    },
  },
});
</script>

<style scoped>
.dice-roll-entry {
  /* ensure entries are positioned for transform animations */
  will-change: transform, opacity;
}

/* transition-group classes for enter-from-right */
.enter-right-enter-active {
  transition:
    transform 1400ms cubic-bezier(0.22, 0.9, 0.33, 1),
    opacity 1400ms ease;
}
.enter-right-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.enter-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* also animate when items appear (first item) */
.enter-right-appear-active {
  transition:
    transform 1400ms cubic-bezier(0.22, 0.9, 0.33, 1),
    opacity 1400ms ease;
}
.enter-right-appear-from {
  transform: translateX(40px);
  opacity: 0;
}
.enter-right-appear-to {
  transform: translateX(0);
  opacity: 1;
}
</style>
